import Router from 'koa-router';
import Request from 'request-promise';
import cheerio from 'cheerio';

import user from '../controller/user';

const router = new Router();

const Url = 'https://free.gyteng.com/';


// 爬虫测试，抓取免费ss账号
router.get('/getSSURL', async ctx => {
	const result = await Request({
		url: Url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
		}
	});
	const $ = cheerio.load(result);
	ctx.body = $('div.address').text().trim();
	IO.emit('hello', 'world 3');
})

router.post('/user/create', user.add);
router.get('/user/get', user.get);

export default router;