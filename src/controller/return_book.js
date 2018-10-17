import Request from 'request-promise';

export default {
	// 用户还书操作
	async detect (ctx) {
		const storeId = ''; // 商店id可读取配置
		const openId = '?' // 此id获取途径未知？

		// 此处需发送一条请求，告知数据库，哪个用户在哪家店进行了还书操作
		const sendInfo = await Request({
			method: 'post',
			body: {
				storeId,
				openId
			},
			json: true,
			uri: 'http://localhost:3000/api/v1/test/sendInfo'
		});

		// 处理返回结果
		sendInfo.success && IO.emit('check book', { success: true });
		ctx.body = { success: sendInfo.success };
	},
	// 发送rfid
	async sendRFID (ctx) {
		const { rfid } = ctx.request.body;
		// rfid此处仅非空验证，有效性验证暂无
		if( !(rfid instanceof Array)  ){ ctx.body = { success: false, err_msg: '参数有误！' }; return; }

		// 通过Request发送RFID和storeId至数据库交换数据
		const storeId = ''; // 读取商店id
		const sendRFID = await Request({
			method: 'post',
			body: {
				storeId,
				rfid
			},
			json: true,
			uri: 'http://localhost:3000/api/v1/test/sendRFID'
		})
		const { code } = sendRFID; // 0 = 失败, 1 = 成功 , 2 = 逾期成功

		code > 0 && IO.emit('send rfid', { success: true, code });
		ctx.body = { success: Boolean(code), code };
	}
}