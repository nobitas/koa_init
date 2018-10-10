import Mongoose from 'mongoose';

export default class User {
	constructor () {
		this.db = Mongoose.model('user');
	}
	add (data) {
		return this.db.create(data);
	}
	getEmail (email) {
		return this.db.findOne({ email });
	}
	getUser (_id) {
		return this.db.findOne({ _id });
	}
}