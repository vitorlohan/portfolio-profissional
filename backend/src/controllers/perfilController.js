// ============================================
// Controller de Perfil Profissional
// ============================================
const Perfil = require('../models/Perfil');

// @desc    Obter perfil público
// @route   GET /api/perfil
const obterPerfil = async (req, res, next) => {
  try {
    let perfil = await Perfil.findOne().lean();

    // Se não existir, criar perfil padrão
    if (!perfil) {
      perfil = await Perfil.create({
        nome: 'Seu Nome',
        titulo: 'Desenvolvedor Full Stack',
        descricaoCurta: 'Desenvolvedor apaixonado por criar soluções inovadoras.',
        habilidades: [
          { nome: 'JavaScript', porcentagem: 90, categoria: 'frontend' },
          { nome: 'Node.js', porcentagem: 85, categoria: 'backend' },
          { nome: 'React', porcentagem: 80, categoria: 'frontend' },
          { nome: 'TypeScript', porcentagem: 80, categoria: 'frontend' },
          { nome: 'MongoDB', porcentagem: 75, categoria: 'banco' },
          { nome: 'PostgreSQL', porcentagem: 75, categoria: 'banco' },
        ],
        tecnologiasDominadas: [
          'JavaScript', 'TypeScript', 'React', 'Node.js',
          'Express', 'MongoDB', 'PostgreSQL', 'Git',
        ],
      });
    }

    res.json(perfil);
  } catch (erro) {
    next(erro);
  }
};

// @desc    Atualizar perfil (admin)
// @route   PUT /api/perfil
const atualizarPerfil = async (req, res, next) => {
  try {
    const dados = req.body;

    // Tratar campos string → array
    if (typeof dados.tecnologiasDominadas === 'string') {
      dados.tecnologiasDominadas = dados.tecnologiasDominadas
        .split(',')
        .map((t) => t.trim());
    }
    if (typeof dados.habilidades === 'string') {
      dados.habilidades = JSON.parse(dados.habilidades);
    }
    if (typeof dados.contato === 'string') {
      dados.contato = JSON.parse(dados.contato);
    }
    if (typeof dados.publicacoes === 'string') {
      dados.publicacoes = JSON.parse(dados.publicacoes);
    }

    // Tratar upload de avatar (Cloudinary retorna URL completa em file.path)
    if (req.file) {
      dados.avatar = req.file.path;
    }

    let perfil = await Perfil.findOne();

    if (perfil) {
      perfil = await Perfil.findByIdAndUpdate(perfil._id, dados, {
        new: true,
        runValidators: true,
      });
    } else {
      perfil = await Perfil.create(dados);
    }

    res.json(perfil);
  } catch (erro) {
    next(erro);
  }
};

module.exports = { obterPerfil, atualizarPerfil };
