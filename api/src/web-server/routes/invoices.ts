/* istanbul ignore file */
import * as express from 'express';
import * as multer from 'multer';
import * as http from 'http-status-codes';
import Invoice from '../../entities/Invoice';
import { unlink } from 'fs';
import { logger } from '../../initialization/winston';
import { InvoiceImporter } from '../../services/invoice-importer';
import * as R from 'ramda';

const DEFAULT_ITEMS_PER_PAGE = 10;
const router = express.Router();
const allowedMimeTypes = ['text/xml', 'application/xml'];
const uploadOptions = multer({
  limits: {
    files: 1
  },
  fileFilter: (_, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    return cb(null, true);
  },
  dest: 'uploads/'
});

const upload = uploadOptions.single('file');
router.post('/file', (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(http.BAD_REQUEST).json({ error: err.message });
    if (!req.file) return res.status(http.BAD_REQUEST).json({ error: 'No file provided' });

    try {
      const recordsImported = await InvoiceImporter.fromFile(req.file.path);
      res.json({ recordsImported });
    } catch (error) {
      res.status(http.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } finally {
      await unlink(req.file.path, (err) => {
        if (err) console.warn(`Couldn't remove file: ${req.file.path}`);
      });
    }
  });
});

router.get('/', async (req, res) => {
  try {
    const page = Number(R.propOr(1, 'page', req.query));
    const itemsPerPage = Number(R.propOr(DEFAULT_ITEMS_PER_PAGE, 'itemsPerPage', req.query));

    const totalInvoices = await Invoice.count();
    const totalPages = Math.ceil(totalInvoices/itemsPerPage);
    const invoices = await Invoice.find({
      relations: ['emitter', 'receiver', 'details'],
      skip: ((page - 1) * itemsPerPage),
      take: itemsPerPage
    });
    res.json({
      invoices,
      total_invoices: totalInvoices,
      pages: totalPages,
      current_page: page
    });
  } catch (error) {
    logger.error(error);
    res.status(http.INTERNAL_SERVER_ERROR).json({ errors: [error.message] });
  }
});

export default router;
