// ============================================
// Utilitários de validação
// ============================================
const { body, param, query } = require('express-validator');

// Validações para criação/edição de projeto
const validarProjeto = [
  body('nome')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ max: 200 })
    .withMessage('Nome deve ter no máximo 200 caracteres'),
  body('categoria')
    .trim()
    .notEmpty()
    .withMessage('Categoria é obrigatória')
    .isIn(['pacotes', 'scripts', 'sistemas', 'websites', 'aplicativos'])
    .withMessage('Categoria inválida'),
  body('resumo')
    .trim()
    .notEmpty()
    .withMessage('Resumo é obrigatório')
    .isLength({ max: 500 })
    .withMessage('Resumo deve ter no máximo 500 caracteres'),
  body('descricao')
    .trim()
    .notEmpty()
    .withMessage('Descrição é obrigatória'),
];

// Validação de login
const validarLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido'),
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
];

// Validar ID do MongoDB
const validarId = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),
];

// Validar categoria na URL
const validarCategoria = [
  param('categoria')
    .isIn(['pacotes', 'scripts', 'sistemas', 'websites', 'aplicativos'])
    .withMessage('Categoria inválida'),
];

module.exports = {
  validarProjeto,
  validarLogin,
  validarId,
  validarCategoria,
};
