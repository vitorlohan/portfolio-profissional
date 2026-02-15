// ============================================
// Configurações centralizadas da aplicação
// ============================================
require('dotenv').config();

module.exports = {
  // Servidor
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Banco de dados
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'chave_padrao_dev',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',

  // Admin padrão
  adminEmail: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
  adminSenha: process.env.ADMIN_SENHA || 'admin123',

  // CORS (remove barra final para evitar mismatch com o origin do browser)
  frontendUrl: (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, ''),

  // CSRF
  csrfSecret: process.env.CSRF_SECRET || 'csrf_segredo_padrao_dev',

  // Cloudinary (armazenamento de imagens na nuvem)
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  // Upload
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};
