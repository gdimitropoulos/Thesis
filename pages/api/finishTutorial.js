import {getAppCookies} from '../../Lib/utils';
import jwt from 'jsonwebtoken';
import { inserTutorialTaken, getUserByEmail } from '../../Lib/dao';


const KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
	try {

		let time = req.body.time;
		let tutorialName = req.body.tutorialName;
		let backspaces = req.body.backspaces;
        let answer = req.body.answer;

		res.setHeader('Content-Type', 'application/json');
		let cookies = getAppCookies(req);
		let token = cookies.token;
		if (!token) {
			res.statusCode = 404;
			return res.json({
				status: 'error',
				error: 'authentication failed'
			});
		}
		token = token.replace('Bearer ', '');
		token = jwt.verify(token, KEY);
        console.log(token);
		if (!token) {
			res.statusCode = 401;
			return res.json({
				status: 'error',
				error: 'authentication failed'
			});
		}		
        const userId=  await getUserByEmail(token.email)
        console.log(userId[0].user_id);
        const  rows =  await inserTutorialTaken(tutorialName, userId[0].user_id,   time, answer, backspaces);
		if (rows) {
			res.statusCode = 200;
			res.json(rows);
		}
		else {
			res.statusCode = 500;
			res.json([]);
		}
	}
	catch (e) {
		console.trace(e);
		res.statusCode = 500;
		res.json({
			error: JSON.stringify(e)
		});
	}
}
