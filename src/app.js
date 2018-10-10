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
global.IO = new Socket(server);

// 初始化mongodb
new MongoDB({ uri: MongoDbUrl }).init();

// post请求中间件
app.use(BodyParser());

// 路由配置
app.use(Router.routes());

// websocket
IO.of('/test').on('connection', (client) => {
	client.broadcast.emit('user connected');
	client.on('loginIn', data => {
		console.log(data);
		client.emit('hello', data.user);
	})
});

server.listen(3000,()=>{
	console.log('listen in localhost:3000');
})
