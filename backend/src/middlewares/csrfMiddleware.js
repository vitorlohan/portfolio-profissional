// ============================================
// Middleware de proteção CSRF (Double Submit Cookie)
// ============================================
// Usa o padrão "double submit cookie":
// 1. O servidor gera um token CSRF e envia como cookie NÃO-httpOnly
// 2. O frontend lê esse cookie e envia no header X-CSRF-Token
// 3. O servidor compara: cookie === header → requisição legítima
//
// Isso funciona porque um site atacante pode enviar cookies,
// mas NÃO pode ler cookies de outro domínio para colocar no header.
// ============================================
const crypto = require('crypto');
const config = require('../config');

const CSRF_COOKIE_NAME = 'portfolio_csrf';
const CSRF_HEADER_NAME = 'x-csrf-token';

// Gerar token CSRF com HMAC (assinado com secret)
const gerarTokenCsrf = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const assinatura = crypto
    .createHmac('sha256', config.csrfSecret)
    .update(token)
    .digest('hex');
  return `${token}.${assinatura}`;
};

// Validar token CSRF (verificar assinatura)
const validarTokenCsrf = (tokenCompleto) => {
  if (!tokenCompleto || !tokenCompleto.includes('.')) return false;

  const [token, assinatura] = tokenCompleto.split('.');
  const assinaturaEsperada = crypto
    .createHmac('sha256', config.csrfSecret)
    .update(token)
    .digest('hex');

  // Comparação segura contra timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(assinatura, 'hex'),
    Buffer.from(assinaturaEsperada, 'hex')
  );
};

// Middleware: definir cookie CSRF em toda resposta (para o frontend ler)
const definirCsrfCookie = (req, res, next) => {
  // Só gera novo token se não houver um válido
  if (!req.cookies[CSRF_COOKIE_NAME] || !validarTokenCsrf(req.cookies[CSRF_COOKIE_NAME])) {
    const token = gerarTokenCsrf();
    res.cookie(CSRF_COOKIE_NAME, token, {
      httpOnly: false, // Frontend PRECISA ler este cookie
      secure: config.nodeEnv === 'production',
      sameSite: config.nodeEnv === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      path: '/',
    });
  }
  next();
};

// Middleware: validar CSRF em requisições que modificam dados
const validarCsrf = (req, res, next) => {
  // Métodos seguros (GET, HEAD, OPTIONS) não precisam de CSRF
  const metodosSeguros = ['GET', 'HEAD', 'OPTIONS'];
  if (metodosSeguros.includes(req.method)) {
    return next();
  }

  const tokenDoCookie = req.cookies[CSRF_COOKIE_NAME];
  const tokenDoHeader = req.headers[CSRF_HEADER_NAME];

  // Ambos devem existir
  if (!tokenDoCookie || !tokenDoHeader) {
    res.status(403);
    return next(new Error('Token CSRF ausente. Recarregue a página e tente novamente.'));
  }

  // Devem ser iguais
  if (tokenDoCookie !== tokenDoHeader) {
    res.status(403);
    return next(new Error('Token CSRF inválido. Recarregue a página e tente novamente.'));
  }

  // Verificar assinatura do token
  if (!validarTokenCsrf(tokenDoCookie)) {
    res.status(403);
    return next(new Error('Token CSRF corrompido. Recarregue a página e tente novamente.'));
  }

  next();
};

module.exports = { definirCsrfCookie, validarCsrf };
