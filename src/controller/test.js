export default {
	/*
	*	测试接口
	*/
	async sendInfo (ctx) {
		ctx.body = { success: true };
	},
	async sendRFID (ctx) {
		const tem = Math.ceil(Math.random()*10)%3;
		ctx.body = { success: true, code: tem };
	}
}