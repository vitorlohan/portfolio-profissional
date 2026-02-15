// ============================================
// Modelo de Perfil Profissional
// ============================================
const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      default: 'Seu Nome',
    },
    titulo: {
      type: String,
      default: 'Desenvolvedor Full Stack',
    },
    descricaoCurta: {
      type: String,
      default: '',
    },
    descricaoCompleta: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    habilidades: [
      {
        nome: { type: String, required: true },
        porcentagem: { type: Number, min: 0, max: 100, default: 50 },
        categoria: { type: String, default: 'geral' },
      },
    ],
    contato: {
      email: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' },
      outros: [
        {
          nome: String,
          url: String,
          icone: String,
        },
      ],
    },
    tecnologiasDominadas: [
      {
        type: String,
        trim: true,
      },
    ],
    publicacoes: [
      {
        titulo: { type: String, required: true },
        descricao: { type: String, default: '' },
        url: { type: String, default: '' },
        tipo: {
          type: String,
          enum: ['pacote', 'artigo', 'video', 'outro'],
          default: 'outro',
        },
        dataPublicacao: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Perfil', perfilSchema);
