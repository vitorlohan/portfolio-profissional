// ============================================
// Modelo de Projeto
// ============================================
const mongoose = require('mongoose');

const projetoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome do projeto é obrigatório'],
      trim: true,
      maxlength: [200, 'Nome deve ter no máximo 200 caracteres'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, 'Categoria é obrigatória'],
      enum: {
        values: ['pacotes', 'scripts', 'sistemas', 'websites', 'aplicativos'],
        message: 'Categoria inválida: {VALUE}',
      },
    },
    resumo: {
      type: String,
      required: [true, 'Resumo é obrigatório'],
      maxlength: [500, 'Resumo deve ter no máximo 500 caracteres'],
    },
    descricao: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
    },
    imagemPrincipal: {
      type: String,
      default: '',
    },
    galeriaImagens: [
      {
        type: String,
      },
    ],
    tecnologias: [
      {
        type: String,
        trim: true,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    funcionalidades: [
      {
        type: String,
      },
    ],
    desafios: {
      type: String,
      default: '',
    },
    solucoes: {
      type: String,
      default: '',
    },
    linksExternos: {
      github: { type: String, default: '' },
      site: { type: String, default: '' },
      aplicativo: { type: String, default: '' },
      outros: [
        {
          titulo: String,
          url: String,
        },
      ],
    },
    destaque: {
      type: Boolean,
      default: false,
    },
    publicado: {
      type: Boolean,
      default: false,
    },
    visualizacoes: {
      type: Number,
      default: 0,
    },
    dataPublicacao: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt e updatedAt automáticos
  }
);

// Gerar slug automaticamente a partir do nome
projetoSchema.pre('save', function (next) {
  if (this.isModified('nome') || !this.slug) {
    this.slug = this.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Índices para busca e filtros
projetoSchema.index({ categoria: 1 });
projetoSchema.index({ publicado: 1 });
projetoSchema.index({ destaque: 1 });
projetoSchema.index({ nome: 'text', resumo: 'text', tags: 'text' });

module.exports = mongoose.model('Projeto', projetoSchema);
