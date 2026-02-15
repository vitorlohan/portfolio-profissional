// ============================================
// Middleware de upload de imagens
// ============================================
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Garantir que o diretório de uploads existe
const criarDiretorio = (dir) => {
  const caminho = path.join(__dirname, '..', '..', config.uploadDir, dir);
  if (!fs.existsSync(caminho)) {
    fs.mkdirSync(caminho, { recursive: true });
  }
  return caminho;
};

// Criar pasta de uploads principal
criarDiretorio('');
criarDiretorio('projetos');
criarDiretorio('perfil');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tipo = req.baseUrl.includes('perfil') ? 'perfil' : 'projetos';
    const destino = path.join(__dirname, '..', '..', config.uploadDir, tipo);
    cb(null, destino);
  },
  filename: (req, file, cb) => {
    const nomeUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extensao = path.extname(file.originalname);
    cb(null, `${nomeUnico}${extensao}`);
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

// Instância do multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
  },
});

module.exports = upload;
