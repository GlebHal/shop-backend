import jwt from 'jsonwebtoken';
import config from './config.js';

export default (req, res, next) => {
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];

		if (!token) {
			return res.status(401).json({ error: "You aren't authorized" });
		}

		token = token.replace(/^Bearer\s+/, '');

		jwt.verify(token, config.jwtSecret, (err) => {
			if (err) {
				return res.status(401).json({ error: 'Token is wrong' });
			}

			next();
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({ error: 'Auth checking was failed' });
	}
};
