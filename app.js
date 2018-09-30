import Koa from 'koa';
import views from 'koa-views';
import path from 'path';
import mongoose from 'mongoose';
const app = new Koa()

mongoose.connect('mongodb://localhost:27017/nobita', { useNewUrlParser: true }, (err)=>{
	const txt = err ? '数据库连接失败' : '数据库连接成功';
	console.log(txt);
});


// 加载模板引擎
app.use(views(path.join(__dirname, './public/static/'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa23'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000,()=>{
	console.log('listen in localhost:3000');
})