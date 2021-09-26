import pool from '../../../Lib/dbconfig'

const HOSTNAME = process.env.SYSTEM_URL;


export default async function handler(req, res) {
    let client;
    try {
        let user = req.body;
        client = await pool.connect();
        res.setHeader('Content-Type', 'application/json');

        const result = await client.query(`
            INSERT INTO users
                (
                    first_name, last_name, email, pwd
                )
            values
                ($1, $2, $3, $4)
            returning *
            `, [
            user.name, user.lastname, user.email, user.password
        ]
        );
        console.log(result.rows[0]);
        if (result.rows[0]) {
            res.statusCode = 200;
            res.json(result.rows[0]);
        }
        else {
            res.statusCode = 404;
            res.json({});
        }
    }
    catch (e) {
        console.trace(e);
        res.statusCode = 500;
        res.json({
            error: JSON.stringify(e)
        });
    }
    finally {
        if (client) {
            client.release();
        }
    }
}
