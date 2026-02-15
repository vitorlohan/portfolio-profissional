// ============================================
// Tipos e interfaces do sistema
// ============================================

// Categorias de projeto disponíveis
export type Categoria = 'pacotes' | 'scripts' | 'sistemas' | 'websites' | 'aplicativos';

// Link externo genérico
export interface LinkExterno {
  titulo: string;
  url: string;
}

// Links externos do projeto
export interface LinksExternos {
  github: string;
  site: string;
  aplicativo: string;
  outros: LinkExterno[];
}

// Projeto completo
export interface Projeto {
  _id: string;
  nome: string;
  slug: string;
  categoria: Categoria;
  resumo: string;
  descricao: string;
  imagemPrincipal: string;
  galeriaImagens: string[];
  tecnologias: string[];
  tags: string[];
  funcionalidades: string[];
  desafios: string;
  solucoes: string;
  linksExternos: LinksExternos;
  destaque: boolean;
  publicado: boolean;
  visualizacoes: number;
  dataPublicacao: string;
  createdAt: string;
  updatedAt: string;
}

// Resposta paginada de projetos
export interface RespostaProjetos {
  projetos: Projeto[];
  paginacao: Paginacao;
  categoria?: string;
}

// Paginação
export interface Paginacao {
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  itensPorPagina: number;
}

// Habilidade
export interface Habilidade {
  nome: string;
  porcentagem: number;
  categoria: string;
}

// Contato
export interface Contato {
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  outros: { nome: string; url: string; icone: string }[];
}

// Publicação
export interface Publicacao {
  titulo: string;
  descricao: string;
  url: string;
  tipo: 'pacote' | 'artigo' | 'video' | 'outro';
  dataPublicacao: string;
}

// Perfil profissional
export interface Perfil {
  _id: string;
  nome: string;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  avatar: string;
  habilidades: Habilidade[];
  contato: Contato;
  tecnologiasDominadas: string[];
  publicacoes: Publicacao[];
}

// Dados de login
export interface DadosLogin {
  email: string;
  senha: string;
}

// Resposta de login (token não é mais retornado — está no cookie httpOnly)
export interface RespostaLogin {
  usuario: {
    id: string;
    nome: string;
    papel: string;
  };
}

// Usuário autenticado (dados mínimos — sem email exposto)
export interface Usuario {
  id: string;
  nome: string;
  papel: string;
}

// Tema
export type Tema = 'claro' | 'escuro';
