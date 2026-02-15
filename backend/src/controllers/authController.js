// ============================================
// Controller de Autenticação
// ============================================
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const config = require('../config');

// Gerar token JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

// Opções do cookie httpOnly
const opcoesCookie = () => ({
  httpOnly: true, // Inacessível via JavaScript (protege contra XSS)
  secure: config.nodeEnv === 'production', // HTTPS apenas em produção
  sameSite: config.nodeEnv === 'production' ? 'strict' : 'lax', // Protege contra CSRF
  maxAge: 24 * 60 * 60 * 1000, // 24 horas (em ms)
  path: '/',
});

// @desc    Login do administrador
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    // Validar campos
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      res.status(400);
      throw new Error(erros.array()[0].msg);
    }

    const { email, senha } = req.body;

    // Buscar usuário pelo email (incluindo senha)
    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario) {
      res.status(401);
      throw new Error('Email ou senha incorretos.');
    }

    // Comparar senhas
    const senhaCorreta = await usuario.compararSenha(senha);

    if (!senhaCorreta) {
      res.status(401);
      throw new Error('Email ou senha incorretos.');
    }

    // Gerar token e definir como cookie httpOnly
    const token = gerarToken(usuario._id);

    res.cookie('portfolio_jwt', token, opcoesCookie());

    // Retornar apenas dados não sensíveis (sem token no body)
    res.json({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        papel: usuario.papel,
      },
    });
  } catch (erro) {
    next(erro);
  }
};

// @desc    Logout - limpar cookie
// @route   POST /api/auth/logout
const logout = (req, res) => {
  res.cookie('portfolio_jwt', '', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: config.nodeEnv === 'production' ? 'strict' : 'lax',
    expires: new Date(0), // Expirar imediatamente
    path: '/',
  });
  res.json({ mensagem: 'Logout realizado com sucesso.' });
};

// @desc    Verificar token e retornar dados do usuário
// @route   GET /api/auth/verificar
const verificarToken = async (req, res) => {
  res.json({
    usuario: {
      id: req.usuario._id,
      nome: req.usuario.nome,
      papel: req.usuario.papel,
    },
  });
};

module.exports = { login, logout, verificarToken };
