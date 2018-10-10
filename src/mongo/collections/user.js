import Mongoose, { Schema } from 'mongoose';

export default new Schema({
	nickName: {
		type: String,
		label: '用户昵称'
	},
	email: {
		type: String,
		required: true,
		label: '邮箱'
	},
	pwd: {
		type: String,
		required: true,
		label: '密码'
	},
	createAt: {
		type: Date,
		label: '创建时间'
	},
	lastAt: {
		type: Date,
		label:'最后一次登录时间'
	}
})