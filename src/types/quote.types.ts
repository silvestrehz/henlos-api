export interface CreateQuoteDTO {
    clientName: string;
    clientPhone: string;
    items: {
        name: string;
        price: number;
        quantity: number;
    }[];
    messages?: string[];
}

export interface UpdateQuoteDTO {
    clientName?: string;
    clientPhone?: string;
    items?: {
        name: string;
        price: number;
        quantity: number;
    }[];
    messages?: string[];
    status?: 'pending' | 'sent' | 'accepted' | 'rejected';
}

export interface QuoteResponse {
    id: string;
    clientName: string;
    clientPhone: string;
    items: {
        name: string;
        price: number;
        quantity: number;
    }[];
    total: number;
    messages: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}