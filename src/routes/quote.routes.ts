import { Router } from 'express';
import { QuoteController } from '../controllers/QuoteController';
import { createQuoteValidator, updateQuoteValidator } from '../middlewares/validators/quoteValidator';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();
const quoteController = new QuoteController();


router.post('/quotes', createQuoteValidator, validate, quoteController.create);
router.get('/quotes', quoteController.getAll);
router.get('/quotes/:id', quoteController.getById);
router.get('/quotes/:id/send', quoteController.sendToWhatsApp);
router.put('/quotes/:id', updateQuoteValidator, validate, quoteController.update);
router.delete('/quotes/:id', quoteController.delete);

export default router;