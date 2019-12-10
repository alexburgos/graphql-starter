import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import schemas from './schemas';
import resolvers from './resolvers';
import userModel from './models/userModel';
import postModel from './models/postModel';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const getUser = async req => {
	const token = req.headers['token'];

	if (token) {
		try {
			return await jwt.verify(token, 'riddlemethis');
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again.');
		}
	}
};

const server = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	context: async ({ req }) => {
		if (req) {
			const me = await getUser(req);

			return {
				me,
				models: {
					userModel,
					postModel
				}
			};
		}
	}
});

server.applyMiddleware({ app, path: '/graphql' });

app.get(`/api/product`, async (req, res) => {
	let products = await Product.find();
	return res.status(200).send(products);
});

app.post(`/api/product`, async (req, res) => {
	let product = await Product.create(req.body);
	return res.status(201).send({
		error: false,
		product
	});
});

app.put(`/api/product/:id`, async (req, res) => {
	const { id } = req.params;

	let product = await Product.findByIdAndUpdate(id, req.body);

	return res.status(202).send({
		error: false,
		product
	});
});

app.delete(`/api/product/:id`, async (req, res) => {
	const { id } = req.params;

	let product = await Product.findByIdAndDelete(id);

	return res.status(202).send({
		error: false,
		product
	});
});


// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));

// 	const path = require('path');
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// 	});
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	mongoose.connect('mongodb://localhost:27017/graphql', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});