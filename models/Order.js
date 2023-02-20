import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
	products: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			count: {
				type: Number,
				required: true,
			},
		},
	],
	totalPrice: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true,
	},
});

export default mongoose.model('Order', OrderSchema);
