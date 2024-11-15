import mongoose, { Schema, Document } from 'mongoose';

interface IQuoteItem {
    name: string;
    price: number;
    quantity: number;
}

export interface IQuote extends Document {
    clientName: string;
    clientPhone: string;
    items: IQuoteItem[];
    total: number;
    messages: string[];
    status: 'pending' | 'sent' | 'accepted' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const QuoteSchema = new Schema({
    clientName: {
        type: String,
        required: [true, 'Nome do cliente é obrigatório'],
        trim: true
    },
    clientPhone: {
        type: String,
        required: [true, 'Telefone do cliente é obrigatório'],
        trim: true
    },
    items: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Preço não pode ser negativo']
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantidade mínima é 1'],
            default: 1
        }
    }],
    total: {
        type: Number,
        required: true,
        min: 0
    },
    messages: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['pending', 'sent', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

QuoteSchema.pre('save', function (next) {
    this.total = this.items.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0);
    next();
});

const Quote = mongoose.model<IQuote>('Quote', QuoteSchema);
export default Quote;