import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import schemas from './schemas';
import resolvers from './resolvers';
import bookModel from './models/bookModel.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	context: async () => {
		return {
			models: {
				bookModel
			}
		};
	}
});

server.applyMiddleware({ app, path: '/graphql' });

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	mongoose.connect('mongodb://localhost:27017/graphql', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});