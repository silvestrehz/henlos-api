import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import quoteRoutes from './routes/quote.routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api', quoteRoutes);

connectDatabase()
    .then(() => {
        app.get('/', (req: Request, res: Response) => {
            res.json({ message: 'API de Orçamentos WhatsApp - Funcionando!' });
        });

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error: string) => {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    });