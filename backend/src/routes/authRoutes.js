// ============================================
// Rotas de Autenticação
// ============================================
const express = require('express');
const router = express.Router();
const { login, logout, verificarToken } = require('../controllers/authController');
const { autenticar } = require('../middlewares/authMiddleware');
const { validarLogin } = require('../middlewares/validacao');

// POST /api/auth/login - Login do admin
router.post('/login', validarLogin, login);

// POST /api/auth/logout - Logout (limpar cookie)
router.post('/logout', logout);

// GET /api/auth/verificar - Verificar token válido
router.get('/verificar', autenticar, verificarToken);

module.exports = router;
