import pool from '../../../Lib/dbconfig';
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
	let client;
	try {
		let {email, password} = req.body;
		console.log(email,password);
		client = await pool.connect();
		res.setHeader('Content-Type', 'application/json');
		const result = await client.query(`
            select first_name, last_name, email 
            from users 
            where  email = $1 and pwd = $2`,[email, password]);
		const row = result.rows[0];
		console.log(row);
		if (row){
			const payload = {
				firstName: row.first_name,
				lastName: row.last_name,
				email: row.email
			};
			let token = jwt.sign(payload, KEY, {expiresIn: 365*24*60});
			res.statusCode = 200;
			res.json({
				success: true,
				token: 'Bearer ' + token,
				user: payload
			});
		}
		else{
			res.statusCode = 404;
			res.json({
				status: 'error',
				error: 'Password incorrect'
			});
		}
		client.release();
	}
	catch (e) {
		console.trace(e);
		if (client) {
			client.release();
		}
		res.statusCode = 500;
		res.json({
			status: 'error',
			error: 'Please contact the administrator'
		});
	}
	

}
