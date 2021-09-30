import pool from './dbconfig';
import moment from 'moment';



export async function inserTutorialTaken(tutorialName,userId,time,answerShown,backspaces) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
            insert into tutorial_taken(
                tutorial_name,
                user_id,
                time,
                anwser_shown,
                backspaces)
            values ($1,
                    $2,
                    $3,
                    $4,
                    $5)
            returning *
            `,
			[tutorialName,userId,time,answerShown,backspaces]
		);
		
		rows = result.rows;
	}
	catch (e) {
		console.trace(e);
	}
	finally {
		if (client) {
			client.release();
		}
	}
	return rows;
}


export async function getUserByEmail(email) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
            select e.user_id from users e where e.email=$1
            `,
			[email]
		);
		
		rows = result.rows;
	}
	catch (e) {
		console.trace(e);
	}
	finally {
		if (client) {
			client.release();
		}
	}
	return rows;
}