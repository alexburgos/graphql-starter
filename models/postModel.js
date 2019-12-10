import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}
});

const post = mongoose.model('post', postSchema);

export default post;
