// ============================================
// Rotas de Projetos
// ============================================
const express = require('express');
const router = express.Router();
const {
  listarProjetos,
  listarProjetosAdmin,
  buscarProjeto,
  buscarProjetoPorSlug,
  filtrarPorCategoria,
  criarProjeto,
  atualizarProjeto,
  removerProjeto,
} = require('../controllers/projetoController');
const { autenticar } = require('../middlewares/authMiddleware');
const { validarProjeto, validarId, validarCategoria } = require('../middlewares/validacao');
const upload = require('../middlewares/uploadMiddleware');

// Upload fields para projetos
const uploadProjeto = upload.fields([
  { name: 'imagemPrincipal', maxCount: 1 },
  { name: 'galeria', maxCount: 10 },
]);

// ---- Rotas públicas ----

// GET /api/projetos - Listar projetos publicados
router.get('/', listarProjetos);

// GET /api/projetos/slug/:slug - Buscar por slug
router.get('/slug/:slug', buscarProjetoPorSlug);

// GET /api/projetos/categoria/:categoria - Filtrar por categoria
router.get('/categoria/:categoria', validarCategoria, filtrarPorCategoria);

// GET /api/projetos/:id - Buscar por ID
router.get('/:id', validarId, buscarProjeto);

// ---- Rotas protegidas (admin) ----

// GET /api/projetos/admin/todos - Listar todos (incluindo rascunhos)
router.get('/admin/todos', autenticar, listarProjetosAdmin);

// POST /api/projetos - Criar projeto
router.post('/', autenticar, uploadProjeto, validarProjeto, criarProjeto);

// PUT /api/projetos/:id - Atualizar projeto
router.put('/:id', autenticar, uploadProjeto, atualizarProjeto);

// DELETE /api/projetos/:id - Remover projeto
router.delete('/:id', autenticar, validarId, removerProjeto);

module.exports = router;
