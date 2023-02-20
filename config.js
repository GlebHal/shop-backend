import dotenv from 'dotenv';

dotenv.config();

export default {
	serverPort: process.env.SERVER_PORT,
	mongodbUri: process.env.MONGODB_URI,
	jwtSecret: process.env.JWT_SECRET,
};
