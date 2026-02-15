// ============================================
// Seed do administrador padrão
// ============================================
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const config = require('../config');
const Usuario = require('../models/Usuario');

const criarAdmin = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('✅ Conectado ao MongoDB');

    // Verificar se já existe admin
    const adminExistente = await Usuario.findOne({ email: config.adminEmail });

    if (adminExistente) {
      // Atualizar senha e nome do admin existente
      adminExistente.senha = config.adminSenha;
      adminExistente.nome = 'Administrador';
      await adminExistente.save(); // dispara o pre('save') que faz o bcrypt hash
      console.log('✅ Admin atualizado com a nova senha!');
      console.log(`   Email: ${config.adminEmail}`);
    } else {
      await Usuario.create({
        nome: 'Administrador',
        email: config.adminEmail,
        senha: config.adminSenha,
        papel: 'admin',
      });
      console.log('✅ Admin criado com sucesso!');
      console.log(`   Email: ${config.adminEmail}`);
      console.log(`   Senha: ${config.adminSenha}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (erro) {
    console.error('❌ Erro ao criar admin:', erro.message);
    process.exit(1);
  }
};

criarAdmin();
