import { Request, Response } from 'express';
import Quote from '../models/Quote';
import { CreateQuoteDTO, UpdateQuoteDTO } from '../types/quote.types';
import { WhatsAppService } from '../services/WhatsappService'

export class QuoteController {
    async create(req: Request<{}, {}, CreateQuoteDTO>, res: Response) {
        try {
            const { clientName, clientPhone, items, messages } = req.body;
            console.log('Body recebido:', req.body);

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    error: 'Itens inválidos',
                    details: 'É necessário incluir pelo menos um item'
                });
            }

            const quote = await Quote.create({
                clientName,
                clientPhone,
                items,
                messages,
                total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            });


            const formattedMessage = WhatsAppService.formatMessage(quote);
            const whatsappLink = WhatsAppService.generateWhatsAppLink(
                quote.clientPhone,
                formattedMessage
            );

            console.log('Quote criado:', quote);
            return res.status(201).json({
                quote,
                whatsappLink,
                formattedMessage
            });
        } catch (error) {
            console.error('Erro detalhado:', error);
            return res.status(400).json({
                error: 'Erro ao criar orçamento',
                details: error instanceof Error ? error.message : String(error)
            });
        }
    }

    async sendToWhatsApp(req: Request, res: Response) {
        try {
            const quote = await Quote.findById(req.params.id);
            if (!quote) {
                return res.status(404).json({ error: 'Orçamento não encontrado' });
            }

            const message = WhatsAppService.formatMessage(quote);
            const whatsappLink = WhatsAppService.generateWhatsAppLink(
                quote.clientPhone,
                message
            );

            return res.redirect(whatsappLink);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao redirecionar para WhatsApp' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const quotes = await Quote.find().sort({ createdAt: -1 });
            return res.json(quotes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar orçamentos' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const quote = await Quote.findById(req.params.id);
            if (!quote) {
                return res.status(404).json({ error: 'Orçamento não encontrado' });
            }
            return res.json(quote);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar orçamento' });
        }
    }

    async update(req: Request<{ id: string }, {}, UpdateQuoteDTO>, res: Response) {
        try {
            const quote = await Quote.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!quote) {
                return res.status(404).json({ error: 'Orçamento não encontrado' });
            }
            return res.json(quote);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar orçamento' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const quote = await Quote.findByIdAndDelete(req.params.id);
            if (!quote) {
                return res.status(404).json({ error: 'Orçamento não encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar orçamento' });
        }
    }
}