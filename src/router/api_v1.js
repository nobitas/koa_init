import Router from 'koa-router';
import Request from 'request-promise';
import cheerio from 'cheerio';

import user from '../controller/user';
import ReturnBook from '../controller/return_book';
import Test from '../controller/test';

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
})

router.post('/user/create', user.add);
router.get('/user/get', user.get);

// 硬件接口
router.post('/start_detect', ReturnBook.detect);
router.post('/sendRFID', ReturnBook.sendRFID);

// 测试返回接口
router.post('/test/sendInfo', Test.sendInfo);
router.post('/test/sendRFID', Test.sendRFID);

export default router;