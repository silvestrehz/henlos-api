import { IQuote } from '../models/Quote';

export class WhatsAppService {
    static formatMessage(quote: IQuote): string {

        let message = `*Orçamento para ${quote.clientName}*\n\n`;


        message += "*Itens:*\n";
        quote.items.forEach(item => {
            message += `• ${item.name}\n`;
            message += `  Quantidade: ${item.quantity}\n`;
            message += `  Valor unitário: R$ ${item.price.toFixed(2)}\n`;
            message += `  Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
        });


        message += `*Total: R$ ${quote.total.toFixed(2)}*\n\n`;


        if (quote.messages && quote.messages.length > 0) {
            message += "*Observações:*\n";
            quote.messages.forEach(msg => {
                message += `✓ ${msg}\n`;
            });
        }

        return message;
    }

    static generateWhatsAppLink(phone: string, message: string): string {

        const cleanPhone = phone.replace(/\D/g, '');


        const fullPhone = cleanPhone.length === 11 ? `55${cleanPhone}` : cleanPhone;


        const encodedMessage = encodeURIComponent(message);

        return `https://wa.me/${fullPhone}?text=${encodedMessage}`;
    }
}