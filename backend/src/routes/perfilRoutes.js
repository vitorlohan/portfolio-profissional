// ============================================
// Rotas de Perfil
// ============================================
const express = require('express');
const router = express.Router();
const { obterPerfil, atualizarPerfil } = require('../controllers/perfilController');
const { autenticar } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// GET /api/perfil - Obter perfil público
router.get('/', obterPerfil);

// PUT /api/perfil - Atualizar perfil (admin)
router.put('/', autenticar, upload.single('avatar'), atualizarPerfil);

module.exports = router;
