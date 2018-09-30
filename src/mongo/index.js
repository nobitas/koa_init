import Mongoose from 'mongoose';
import UserSchema from './collections/user';

export default class MongoDB {
	constructor (options) {
		this.MongoDBUrl = options.uri;
		// 数据库参数，详细地址：https://mongoosejs.com/docs/connections.html
		this.options = {
			autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      useNewUrlParser: true
		}
	}
	init () {
		const  { MongoDBUrl, options } = this;
		Mongoose.connect(MongoDBUrl, options);
		const DB = Mongoose.connection;
		DB.on('error', console.error.bind(console, 'mongodb connection error:'));
		DB.once('open',() => {
			console.log('mongodb connection success!');
			const db = Mongoose.model('User');
			db.find({},(err, res) => {
				console.log(res);
			})
		})

		Mongoose.model('User', UserSchema, 'User');
	}
} 