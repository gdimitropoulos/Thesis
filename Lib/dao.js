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


export async function validityCheck(lessonName,email) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
			select * from users  u where u.email=$1 
            `,
			[email]
		);
		if(result.rows.length > 0 ){
			let secondResult = await client.query(
				`
				select * from lesson_taken  lt where lt.user_id=$1 and lt.lesson_name=$2
				`,
				[result.rows[0].user_id,lessonName]
			);
			if(secondResult.rows.length > 0){
				return true
			}else{
				return false 

			}

		}else{
			return false
		}
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


export async function checkTutorialFinished(tutorialName,email) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
			select * from users  u where u.email=$1 
            `,
			[email]
		);
		if(result.rows.length > 0){
			console.log(result.rows)
			let secondResult = await client.query(
				`
				select  distinct lt.lesson_name from lesson_taken  lt 
						inner join lesson l  on 
						lt.lesson_name =l.lesson_name where l.tutorial_name = $1 and lt.user_id = $2
				`,
				[tutorialName,result.rows[0].user_id]
			);

			if(secondResult.rows.length == 7){
				return true
			}else{
				return false 
			}
		}else{
			return false
		}
		
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



export async function checkIntroForm(email) {
	let client;
	let rows ;

	try {
		client = await pool.connect();
		let result = await client.query(
			`
            select e.intro_form from users e where e.email=$1
            `,
			[email]
		);
		
		rows = result.rows[0].intro_form;
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


export async function checkFinishForm(email) {
	let client;
	let rows ;

	try {
		client = await pool.connect();
		let result = await client.query(
			`
            select e.finish_form from users e where e.email=$1
            `,
			[email]
		);
		
		rows = result.rows[0].finish_form;
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


export async function updateFinishForm(email) {
	let client;
	let rows ;

	try {
		client = await pool.connect();
		let result = await client.query(
			`
			update users
			set finish_form = true
			where email = $1
			returning *
      	`,
			[email]
		);
		rows = result.rows[0];
		
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


export async function updateIntroForm(email) {
	let client;
	let rows ;

	try {
		client = await pool.connect();
		let result = await client.query(
			`
			update users
			set intro_form = true
			where email = $1
			returning *
      	`,
			[email]
		);
		rows = result.rows[0];
		
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

export async function checkLessonTaken(email,lessonName) {
	let client;
	let rows = [];

	try {
		client = await pool.connect();
		let result = await client.query(
			`
			select * from users  u where u.email=$1 
            `,
			[email]
		);
		if(result.rows.length > 0){
			console.log(result.rows)
			let secondResult = await client.query(
				`
				select  distinct lt.lesson_name from lesson_taken  lt 
						inner join lesson l  on 
						lt.lesson_name =l.lesson_name where l.lesson_name = $1 and lt.user_id = $2
				`,
				[lessonName,result.rows[0].user_id]
			);

			if(secondResult.rows.length >= 1){
				return true
			}else{
				return false 
			}
		}else{
			return false
		}
		
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