import pool from './dbconfig';
import moment from 'moment';



export async function insertLessonTaken(lessonName,userId,time,timeWriting,answerShown,backspaces,total_chars) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
            insert into lesson_taken(
                lesson_name,
                user_id,
                time,
				time_writing,
                anwser_shown,
                backspaces,
				total_chars)
            values ($1,
                    $2,
                    $3,
                    $4,
                    $5,
					$6,
					$7)
            returning *
            `,
			[lessonName,userId,time,timeWriting,answerShown,backspaces,total_chars]
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



export async function insertLessonTry(lessonID,time,backspaces,total_chars) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
            insert into tries(
                lesson_taken_id,
                time,
                backspaces,
				total_chars)
            values ($1,
                    $2,
                    $3,
                    $4)
            returning *
            `,
			[lessonID,time,backspaces,total_chars]
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