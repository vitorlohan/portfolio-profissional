// ============================================
// Middleware de tratamento de erros
// ============================================

// Rota não encontrada
const rotaNaoEncontrada = (req, res, next) => {
  const erro = new Error(`Rota não encontrada: ${req.originalUrl}`);
  res.status(404);
  next(erro);
};

// Tratamento global de erros
const tratarErro = (erro, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`❌ Erro: ${erro.message}`);

  res.status(statusCode).json({
    erro: erro.message,
    ...(process.env.NODE_ENV === 'development' && { stack: erro.stack }),
  });
};

module.exports = { rotaNaoEncontrada, tratarErro };
