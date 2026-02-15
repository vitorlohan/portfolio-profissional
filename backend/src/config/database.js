// ============================================
// Conexão com o MongoDB
// ============================================
const mongoose = require('mongoose');
const config = require('./index');

const conectarBanco = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('✅ MongoDB conectado com sucesso');
  } catch (erro) {
    console.error('❌ Erro ao conectar ao MongoDB:', erro.message);
    process.exit(1);
  }
};

module.exports = conectarBanco;
