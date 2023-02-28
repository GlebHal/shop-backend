import modelsObj from '../models/index.js';

export const getAll = async (req, res) => {
	try {
		const products = await modelsObj.product.find();

		if (!products) {
			return res.status(404).json({ error: 'There are no products' });
		}

		res.status(202).json(products);
	} catch (err) {
		res.status(500).json({ error: 'Getting all was failed' });
	}
};

export const getOne = async (req, res) => {
	try {
		const product = await modelsObj.product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ error: 'There is no product with this id' });
		}

		res.status(202).json(product);
	} catch (err) {
		res.status(500).json({ error: 'Getting one was failed' });
	}
};

// client must post in this format: { products: [ {id, count}, {id, count}... ], totalPrice }
export const makeOrder = async (req, res) => {
	try {
		const order = new modelsObj.order({
			products: req.body.products,
			totalPrice: req.body.totalPrice,
			user: req.params.userId,
		});

		await order.save();

		res.status(201).json({ message: 'Ordered', order });
	} catch (err) {
		if (err.code === 11000) {
			return res.status(403).json({ error: 'You have already ordered' });
		}

		res.status(500).json({ error: 'Making order was failed' });
	}
};

export const updateOrder = async (req, res) => {
	try {
		const doc = await modelsObj.order.findOneAndUpdate(
			{
				user: req.params.userId,
			},
			{
				products: req.body.products,
				totalPrice: req.body.totalPrice,
			},
		);

		if (!doc) {
			return res.status(404).json({ message: 'There is no order' });
		}

		res.status(200).json({ message: 'Updated' });
	} catch (err) {
		res.status(500).json({ error: 'Updating order was failed' });
	}
};

export const removeOrders = async (req, res) => {
	try {
		const doc = await modelsObj.order.deleteMany({ user: req.params.userId });

		if (!doc.deletedCount) {
			return res.status(404).json({ message: 'There is no order' });
		}

		res.status(200).json({ message: 'Deleted' });
	} catch (err) {
		res.status(500).json({ error: 'Removing order was failed' });
	}
};
