import { getAppCookies } from '../../Lib/utils';
import jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { updateFinishForm, } from '../../Lib/dao';


const KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
	try {


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

		const update = await updateFinishForm(token.email)
		

		if (update) {
			res.statusCode = 200;
			res.json(update);
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
