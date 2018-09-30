import Koa from 'koa';
import Router from './router';
import MongoDB from './mongo';
import { MongoDbUrl } from './config/db.js';
const app = new Koa();

new MongoDB({ uri: MongoDbUrl }).init();
app.use(Router.routes());

app.listen(3000,()=>{
	console.log('listen in localhost:3000');
})
