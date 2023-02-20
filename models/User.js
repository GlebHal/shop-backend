import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	login: {
		type: String,
		required: true,
	},
	avatarSrc: {
		type: String,
		default: '',
	},
	passwordHash: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

export default mongoose.model('User', UserSchema);
