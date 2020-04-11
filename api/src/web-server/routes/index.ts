/* istanbul ignore file */
import * as express from 'express';
import * as healthcheck from 'express-healthcheck';
import test from './test';
import invoices from './invoices';

const router = express.Router();

router.use('/test', test);
router.use('/invoices', invoices);
router.use('/healthcheck', healthcheck());

export default router;
