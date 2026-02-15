// ============================================
// Controller de Projetos
// ============================================
const { validationResult } = require('express-validator');
const Projeto = require('../models/Projeto');

// Escapar caracteres especiais de regex para prevenir ReDoS
const escaparRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc    Listar todos os projetos (público)
// @route   GET /api/projetos
const listarProjetos = async (req, res, next) => {
  try {
    const {
      pagina = 1,
      limite = 12,
      busca,
      destaque,
      ordenar = '-dataPublicacao',
    } = req.query;

    const filtro = { publicado: true };

    // Busca por texto
    if (busca) {
      filtro.$text = { $search: busca };
    }

    // Filtro de destaque
    if (destaque === 'true') {
      filtro.destaque = true;
    }

    const skip = (parseInt(pagina) - 1) * parseInt(limite);

    const [projetos, total] = await Promise.all([
      Projeto.find(filtro)
        .select('-descricao -funcionalidades -desafios -solucoes')
        .sort(ordenar)
        .skip(skip)
        .limit(parseInt(limite))
        .lean(),
      Projeto.countDocuments(filtro),
    ]);

    res.json({
      projetos,
      paginacao: {
        paginaAtual: parseInt(pagina),
        totalPaginas: Math.ceil(total / parseInt(limite)),
        totalItens: total,
        itensPorPagina: parseInt(limite),
      },
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Listar todos os projetos (admin - inclui rascunhos)
// @route   GET /api/projetos/admin/todos
const listarProjetosAdmin = async (req, res, next) => {
  try {
    const { pagina = 1, limite = 20, busca } = req.query;
    const filtro = {};

    if (busca) {
      const buscaSanitizada = escaparRegex(String(busca));
      filtro.$or = [
        { nome: { $regex: buscaSanitizada, $options: 'i' } },
        { resumo: { $regex: buscaSanitizada, $options: 'i' } },
      ];
    }

    const skip = (parseInt(pagina) - 1) * parseInt(limite);

    const [projetos, total] = await Promise.all([
      Projeto.find(filtro)
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limite))
        .lean(),
      Projeto.countDocuments(filtro),
    ]);

    res.json({
      projetos,
      paginacao: {
        paginaAtual: parseInt(pagina),
        totalPaginas: Math.ceil(total / parseInt(limite)),
        totalItens: total,
        itensPorPagina: parseInt(limite),
      },
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Buscar projeto por ID
// @route   GET /api/projetos/:id
const buscarProjeto = async (req, res, next) => {
  try {
    const projeto = await Projeto.findById(req.params.id).lean();

    if (!projeto) {
      res.status(404);
      throw new Error('Projeto não encontrado.');
    }

    // Incrementar visualizações
    await Projeto.findByIdAndUpdate(req.params.id, {
      $inc: { visualizacoes: 1 },
    });

    res.json(projeto);
  } catch (erro) {
    next(erro);
  }
};

// @desc    Buscar projeto por slug
// @route   GET /api/projetos/slug/:slug
const buscarProjetoPorSlug = async (req, res, next) => {
  try {
    const projeto = await Projeto.findOne({
      slug: req.params.slug,
      publicado: true,
    }).lean();

    if (!projeto) {
      res.status(404);
      throw new Error('Projeto não encontrado.');
    }

    // Incrementar visualizações
    await Projeto.findByIdAndUpdate(projeto._id, {
      $inc: { visualizacoes: 1 },
    });

    res.json(projeto);
  } catch (erro) {
    next(erro);
  }
};

// @desc    Filtrar projetos por categoria
// @route   GET /api/projetos/categoria/:categoria
const filtrarPorCategoria = async (req, res, next) => {
  try {
    const { pagina = 1, limite = 12 } = req.query;
    const filtro = {
      categoria: req.params.categoria,
      publicado: true,
    };

    const skip = (parseInt(pagina) - 1) * parseInt(limite);

    const [projetos, total] = await Promise.all([
      Projeto.find(filtro)
        .select('-descricao -funcionalidades -desafios -solucoes')
        .sort('-dataPublicacao')
        .skip(skip)
        .limit(parseInt(limite))
        .lean(),
      Projeto.countDocuments(filtro),
    ]);

    res.json({
      projetos,
      categoria: req.params.categoria,
      paginacao: {
        paginaAtual: parseInt(pagina),
        totalPaginas: Math.ceil(total / parseInt(limite)),
        totalItens: total,
        itensPorPagina: parseInt(limite),
      },
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Criar novo projeto
// @route   POST /api/projetos
const criarProjeto = async (req, res, next) => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(400);
      throw new Error(erros.array()[0].msg);
    }

    const dados = req.body;

    // Tratar campos que podem vir como string (do form-data)
    if (typeof dados.tecnologias === 'string') {
      dados.tecnologias = dados.tecnologias.split(',').map((t) => t.trim());
    }
    if (typeof dados.tags === 'string') {
      dados.tags = dados.tags.split(',').map((t) => t.trim());
    }
    if (typeof dados.funcionalidades === 'string') {
      dados.funcionalidades = dados.funcionalidades.split(',').map((f) => f.trim());
    }
    if (typeof dados.linksExternos === 'string') {
      dados.linksExternos = JSON.parse(dados.linksExternos);
    }

    // Tratar upload de imagem principal
    if (req.files && req.files.imagemPrincipal) {
      dados.imagemPrincipal = `/uploads/projetos/${req.files.imagemPrincipal[0].filename}`;
    }

    // Tratar upload de galeria
    if (req.files && req.files.galeria) {
      dados.galeriaImagens = req.files.galeria.map(
        (f) => `/uploads/projetos/${f.filename}`
      );
    }

    const projeto = await Projeto.create(dados);
    res.status(201).json(projeto);
  } catch (erro) {
    next(erro);
  }
};

// @desc    Atualizar projeto
// @route   PUT /api/projetos/:id
const atualizarProjeto = async (req, res, next) => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(400);
      throw new Error(erros.array()[0].msg);
    }

    const projeto = await Projeto.findById(req.params.id);

    if (!projeto) {
      res.status(404);
      throw new Error('Projeto não encontrado.');
    }

    const dados = req.body;

    // Tratar campos que podem vir como string
    if (typeof dados.tecnologias === 'string') {
      dados.tecnologias = dados.tecnologias.split(',').map((t) => t.trim());
    }
    if (typeof dados.tags === 'string') {
      dados.tags = dados.tags.split(',').map((t) => t.trim());
    }
    if (typeof dados.funcionalidades === 'string') {
      dados.funcionalidades = dados.funcionalidades.split(',').map((f) => f.trim());
    }
    if (typeof dados.linksExternos === 'string') {
      dados.linksExternos = JSON.parse(dados.linksExternos);
    }

    // Tratar upload de imagem principal
    if (req.files && req.files.imagemPrincipal) {
      dados.imagemPrincipal = `/uploads/projetos/${req.files.imagemPrincipal[0].filename}`;
    }

    // Tratar upload de galeria (adicionar às existentes)
    if (req.files && req.files.galeria) {
      const novasImagens = req.files.galeria.map(
        (f) => `/uploads/projetos/${f.filename}`
      );
      dados.galeriaImagens = [
        ...(projeto.galeriaImagens || []),
        ...novasImagens,
      ];
    }

    const projetoAtualizado = await Projeto.findByIdAndUpdate(
      req.params.id,
      dados,
      { new: true, runValidators: true }
    );

    res.json(projetoAtualizado);
  } catch (erro) {
    next(erro);
  }
};

// @desc    Remover projeto
// @route   DELETE /api/projetos/:id
const removerProjeto = async (req, res, next) => {
  try {
    const projeto = await Projeto.findById(req.params.id);

    if (!projeto) {
      res.status(404);
      throw new Error('Projeto não encontrado.');
    }

    await Projeto.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Projeto removido com sucesso.' });
  } catch (erro) {
    next(erro);
  }
};

module.exports = {
  listarProjetos,
  listarProjetosAdmin,
  buscarProjeto,
  buscarProjetoPorSlug,
  filtrarPorCategoria,
  criarProjeto,
  atualizarProjeto,
  removerProjeto,
};
