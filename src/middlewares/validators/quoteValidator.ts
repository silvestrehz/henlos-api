import { body, ValidationChain } from 'express-validator';

export const createQuoteValidator: ValidationChain[] = [

    body('clientName')
        .trim()
        .notEmpty()
        .withMessage('Nome do cliente é obrigatório')
        .isLength({ min: 3 })
        .withMessage('Nome deve ter no mínimo 3 caracteres'),

    body('clientPhone')
        .trim()
        .notEmpty()
        .withMessage('Telefone é obrigatório')
        .matches(/^\d{10,11}$/)
        .withMessage('Telefone inválido - deve ter 10 ou 11 dígitos'),


    body('items')
        .isArray({ min: 1 })
        .withMessage('Pelo menos um item é obrigatório'),


    body('items.*.name')
        .trim()
        .notEmpty()
        .withMessage('Nome do item é obrigatório'),

    body('items.*.price')
        .isFloat({ min: 0.01 })
        .withMessage('Preço deve ser maior que zero'),

    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantidade deve ser maior que zero')
];

export const updateQuoteValidator: ValidationChain[] = [
    body('clientName')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Nome deve ter no mínimo 3 caracteres'),

    body('clientPhone')
        .optional()
        .trim()
        .matches(/^\d{10,11}$/)
        .withMessage('Telefone inválido'),

    body('status')
        .optional()
        .isIn(['pending', 'sent', 'accepted', 'rejected'])
        .withMessage('Status inválido')
];