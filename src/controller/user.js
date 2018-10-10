import nanoid from 'nanoid';
import User from '../mongo/model/user';

export default {
	async add (ctx) {
		const { nickName = `user_${nanoid(10)}`, email, pwd } = ctx.request.body;
		// 类型检测
		if( !email || !pwd ){ 
			ctx.body = { success: false, err_msg: '参数有误！'  }; 
			return; 
		}
		// 检测用户是否存在
		const checkEmail = await new User().getEmail(email);
		if( checkEmail ){
			ctx.body = { success: false, err_msg: '邮箱已存在' };
			return;
		}
		// 新增用户
		const data = { nickName, email, pwd, createAt: new Date() };
		const result = await new User().add(data);
		ctx.body = result;
	},
	async get (ctx) {
		const { _id } = ctx.query;
		try {
			const result = await new User().getUser(_id);
			ctx.body = result ? result : { success: false, err_msg: '用户不存在' };
		}
		catch (err) {
			ctx.body = { success: false, err_msg: '用户不存在' };
		}
	}
}