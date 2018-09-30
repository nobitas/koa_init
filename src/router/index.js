import Router from 'koa-router';
import Api_v1 from './api_v1';

const router = new Router();

router.use('/api/v1', Api_v1.routes(), Api_v1.allowedMethods() );

export default router;