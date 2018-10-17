import Koa from 'koa';
import Router from './router';
import MongoDB from './mongo';
import { MongoDbUrl } from './config/db.js';
import BodyParser from 'koa-bodyparser';
import Cors from 'koa2-cors';
import Socket from 'socket.io';
import Http from 'http';
const app = new Koa();
const server = Http.createServer(app.callback());
global.IO = new Socket(server).of('/test');

// 初始化mongodb
// new MongoDB({ uri: MongoDbUrl }).init();

// post请求中间件
app.use(BodyParser());

// 路由配置
app.use(Router.routes());

// 验证链接的有效性
IO.use((socket, next) => {
	const { token } = socket.handshake.query;
	if( token ) return next();
	return next(new Error('authentication error'));
})

// websocket
IO.on('connection', (client) => {
	console.log('\x1b[36m%s\x1b[0m', 'websocket start!');
	// client.broadcast.emit('user connected');
});

server.listen(3000,() => console.log('listen in localhost:3000'))
