import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	productType: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: true,
	},
	imageSrc: {
		type: String,
		default: '',
	},
});

export default mongoose.model('Product', ProductSchema);
