// ============================================
// Middleware de autenticação JWT (via httpOnly cookie)
// ============================================
const jwt = require('jsonwebtoken');
const config = require('../config');
const Usuario = require('../models/Usuario');

const autenticar = async (req, res, next) => {
  try {
    // Ler token do cookie httpOnly (não mais do header Authorization)
    const token = req.cookies?.portfolio_jwt;

    if (!token) {
      res.status(401);
      throw new Error('Acesso não autorizado. Token não fornecido.');
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Buscar usuário pelo ID do token
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      res.status(401);
      throw new Error('Usuário não encontrado.');
    }

    // Adicionar usuário à requisição
    req.usuario = usuario;
    next();
  } catch (erro) {
    if (erro.name === 'JsonWebTokenError') {
      res.status(401);
      return next(new Error('Token inválido.'));
    }
    if (erro.name === 'TokenExpiredError') {
      // Limpar cookie expirado
      res.cookie('portfolio_jwt', '', {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
        expires: new Date(0),
        path: '/',
      });
      res.status(401);
      return next(new Error('Token expirado.'));
    }
    next(erro);
  }
};

module.exports = { autenticar };
