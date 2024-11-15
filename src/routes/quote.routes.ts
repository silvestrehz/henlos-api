import { Router } from 'express';
import { QuoteController } from '../controllers/QuoteController';

const router = Router();
const quoteController = new QuoteController();


router.post('/quotes', quoteController.create);
router.get('/quotes', quoteController.getAll);
router.get('/quotes/:id', quoteController.getById);
router.put('/quotes/:id', quoteController.update);
router.delete('/quotes/:id', quoteController.delete);

export default router;