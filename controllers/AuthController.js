import bcrypt from 'bcrypt';
import getToken from '../getToken.js';

import modelsObj from '../models/index.js';

export const login = async (req, res) => {
	try {
		const user = await modelsObj.user.findOne({ email: req.body.email }).exec();

		if (!user) {
			return res.status(404).json({ error: "This user wasn't found" });
		}

		const isCorrectPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isCorrectPassword) {
			return res.status(403).json({ error: 'Wrong password or email' });
		}

		return res.status(200).json({ message: 'Logged in' });
	} catch (err) {
		res.status(500).json({ error: 'Log In was failed' });
	}
};

export const register = async (req, res) => {
	try {
		const saltRounds = 10;

		const salt = await bcrypt.genSalt(saltRounds);
		const passwordHash = await bcrypt.hash(req.body.password, salt);

		const newUser = new modelsObj.user({
			login: req.body.login,
			email: req.body.email,
			passwordHash,
		});

		newUser.save();

		const token = await getToken(newUser);

		res.status(200).json({ message: 'Registered', token });
	} catch (err) {
		res.status(500).json({ error: 'Registration was failed' });
	}
};
