// ============================================
// Servidor principal da aplicação
// ============================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const config = require('./config');
const conectarBanco = require('./config/database');
const projetoRoutes = require('./routes/projetoRoutes');
const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const { tratarErro, rotaNaoEncontrada } = require('./middlewares/erroMiddleware');
const { definirCsrfCookie, validarCsrf } = require('./middlewares/csrfMiddleware');

const app = express();

// ---- Segurança ----
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ---- Cookies ----
app.use(cookieParser());

// ---- CORS ----
// Em produção: frontend no GitHub Pages, backend no Render (cross-origin)
// exposedHeaders permite o frontend ler o header X-CSRF-Token na resposta
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
  exposedHeaders: ['X-CSRF-Token'],
}));

// ---- Rate Limiting (geral) ----
const limitador = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { erro: 'Muitas requisições. Tente novamente mais tarde.' },
});
app.use('/api/', limitador);

// ---- Rate Limiting (login - mais rigoroso) ----
const limitadorLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas de login
  message: { erro: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', limitadorLogin);

// ---- Body Parser ----
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ---- Proteção CSRF ----
// Define cookie CSRF em toda resposta (frontend lê e envia no header)
app.use('/api/', definirCsrfCookie);
// Valida CSRF em requisições que modificam dados (POST, PUT, DELETE)
app.use('/api/', validarCsrf);

// ---- Rotas ----
app.use('/api/auth', authRoutes);
app.use('/api/projetos', projetoRoutes);
app.use('/api/perfil', perfilRoutes);

// ---- Rota raiz (health check do Render) ----
app.get('/', (req, res) => {
  res.json({ status: 'ok', servico: 'Portfolio API', timestamp: new Date().toISOString() });
});

// ---- Rota de saúde da API ----
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Tratamento de erros ----
app.use(rotaNaoEncontrada);
app.use(tratarErro);

// ---- Iniciar servidor ----
const iniciar = async () => {
  await conectarBanco();

  app.listen(config.port, () => {
    console.log(`🚀 Servidor rodando na porta ${config.port}`);
    console.log(`📍 Ambiente: ${config.nodeEnv}`);
  });
};

iniciar();

module.exports = app;
