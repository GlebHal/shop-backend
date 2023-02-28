import express from 'express';
import mongoose from 'mongoose';

import controllers from './controllers/index.js';
import validation from './validation/index.js';
import isAuth from './isAuth.js';
import config from './config.js';

mongoose.set('strictQuery', false);
mongoose
	.connect(config.mongodbUri)
	.then(() => {
		console.log('Database has been connected');
	})
	.catch((err) => {
		console.log('Database connection error:', err);
	});

const app = express();

app.use(express.json());

app.post('/login', validation.loginValidator, validation.checkErrors, controllers.auth.login);
app.post('/register', validation.registerValidator, validation.checkErrors, controllers.auth.register);

app.get('/', controllers.user.getAll);
app.get('/:id', controllers.user.getOne);
app.post('/cart/:userId', isAuth, controllers.user.makeOrder);
app.patch('/cart/:userId', isAuth, controllers.user.updateOrder);
app.delete('/cart/:userId', isAuth, controllers.user.removeOrder);

app.listen(config.serverPort, () => {
	console.log('Server has been started');
});
