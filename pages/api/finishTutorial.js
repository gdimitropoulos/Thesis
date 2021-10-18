import { getAppCookies } from '../../Lib/utils';
import jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { insertLessonTaken, getUserByEmail, insertLessonTry } from '../../Lib/dao';


const KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
	try {

		console.log(req.body);
		let time = req.body.time;
		let tutorialName = req.body.tutorialName;
		let lessonName = req.body.lessonName;
		let backspaces = req.body.backspaces;
		let answer = req.body.answer;
		let totalTries = req.body.totalTries;
		let totaltCharsPerTry = req.body.totaltCharsPerTry;
		let backspacesPerTry = req.body.backspacesPerTry;
		let timeFinishingTest = req.body.timeFinishingTest;
		let timeStartingWriting = req.body.timeStartingWriting;
		console.log(moment(timeFinishingTest[0]).format('YYYY-MM-DD'))
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
		const userId = await getUserByEmail(token.email)
		const rows = await insertLessonTaken(
			lessonName,
			userId[0].user_id,
			moment(timeFinishingTest[timeFinishingTest.length - 1]).diff(moment(time), 'seconds'),
			moment(timeFinishingTest[timeFinishingTest.length - 1]).diff(moment(timeStartingWriting[0]), 'seconds'),
			answer,
			backspaces,
			totaltCharsPerTry[totaltCharsPerTry.length - 1]);

		console.log(rows);

		const tryrows = await insertLessonTry(
			rows[0].id,
			moment(timeFinishingTest[0]).diff(moment(timeStartingWriting[0]), 'seconds'),
			backspacesPerTry[0],
			totaltCharsPerTry[0])

		if (totalTries > 1) {
			for (let i = 1; i < totalTries; i++) {
				const tryrows = await insertLessonTry(
					rows[0].id,
					moment(timeFinishingTest[i]).diff(moment(timeStartingWriting[i]), 'seconds'),
					backspacesPerTry[i] - backspacesPerTry[i - 1],
					totaltCharsPerTry[i] - totaltCharsPerTry[i - 1])
			}
		}
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
