import { Router } from 'express';

import appRoute from './app.route.js';

const router = Router();

appRoute(router);

export default router;
