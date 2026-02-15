// ============================================
// Middleware de upload de imagens (Cloudinary)
// ============================================
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const config = require('../config');

// Armazenamento no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const pasta = req.baseUrl.includes('perfil') ? 'portfolio/perfil' : 'portfolio/projetos';
    return {
      folder: pasta,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    };
  },
});

// Filtro de tipos de arquivo permitidos
const fileFilter = (req, file, cb) => {
  if (config.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Use: JPEG, PNG, WebP ou GIF.'), false);
  }
};

// Instância do multer com Cloudinary
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
  },
});

module.exports = upload;
