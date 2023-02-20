import { body } from 'express-validator';

export const registerValidator = [
	body('email').isEmail().withMessage('Invalid email'),
	body('password').isLength({ min: 8 }).withMessage('Password must consist at least 8 symbols'),
	body('login').isLength({ min: 3 }).withMessage('Login must consist at least 3 symbols'),
];

export const loginValidator = [
	body('email').isEmail().withMessage('Invalid email'),
	body('password').isLength({ min: 8 }).withMessage('Password must consist at least 8 symbols'),
];
