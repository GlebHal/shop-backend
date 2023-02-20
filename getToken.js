import jwt from 'jsonwebtoken';

import config from './config.js';

export default async (user) => {
	const token = await jwt.sign(
		{
			id: user._id,
		},
		config.jwtSecret,
		{
			expiresIn: '30d',
		},
	);

	return token;
};
