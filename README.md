# Portfólio Profissional

Sistema completo de portfólio profissional moderno, responsivo e performático para apresentação de projetos de desenvolvimento de software.

## Tecnologias

### Frontend
- **React** + **Vite** + **TypeScript**
- **React Router DOM** — rotas e navegação
- **React Icons** — ícones
- **Axios** — requisições HTTP (com cookies httpOnly)
- **React Hot Toast** — notificações
- **CSS Modules** — estilos componentizados
- Tema claro/escuro
- Internacionalização (pt-BR, en-US, es-ES, zh-CN)

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** via **cookies httpOnly** — autenticação segura
- **Multer** — upload de imagens
- **Helmet** + **CORS** + **Rate Limit** — segurança
- **CSRF Protection** — proteção contra Cross-Site Request Forgery
- **Express Validator** — validação de dados
- **Cookie Parser** — gerenciamento de cookies

## Estrutura do Projeto

```
portfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações e conexão com banco
│   │   ├── controllers/     # Lógica de negócio
│   │   ├── middlewares/      # Auth, upload, validação, erros
│   │   ├── models/           # Modelos MongoDB (Projeto, Perfil, Usuário)
│   │   ├── routes/           # Definição de rotas da API
│   │   ├── seeds/            # Seed do admin
│   │   └── server.js         # Servidor principal
│   ├── uploads/              # Imagens enviadas
│   ├── .env                  # Variáveis de ambiente
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── componentes/      # Componentes reutilizáveis
│   │   │   ├── auth/         # Rota protegida
│   │   │   ├── layout/       # Cabeçalho, Rodapé, Layout
│   │   │   ├── projetos/     # Card de projeto
│   │   │   └── secoes/       # Seções da home (Hero, Habilidades, etc.)
│   │   ├── contextos/        # AuthContexto, TemaContexto
│   │   ├── estilos/          # CSS global
│   │   ├── paginas/
│   │   │   ├── publico/      # Páginas públicas
│   │   │   └── admin/        # Painel administrativo
│   │   ├── servicos/         # Comunicação com a API
│   │   ├── tipos/            # TypeScript interfaces
│   │   ├── App.tsx           # Rotas da aplicação
│   │   └── main.tsx          # Ponto de entrada
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Como Rodar

### Pré-requisitos
- Node.js 18+
- MongoDB rodando localmente ou Atlas

### 1. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/` com as seguintes variáveis:
```env
# Servidor
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=sua_uri_do_mongodb

# JWT (gere uma chave aleatória de 64+ caracteres)
JWT_SECRET=sua_chave_secreta_forte_aqui
JWT_EXPIRES_IN=24h

# Admin padrão (usado no seed — use senha forte)
ADMIN_EMAIL=seu_email@exemplo.com
ADMIN_SENHA=sua_senha_forte_aqui

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# CSRF (gere uma chave aleatória de 64+ caracteres)
CSRF_SECRET=sua_chave_csrf_forte_aqui
```

> **⚠️ NUNCA compartilhe o arquivo `.env`. Ele já está no `.gitignore`.**

Criar admin padrão:
```bash
npm run seed
```

Iniciar servidor de desenvolvimento:
```bash
npm run dev
```

O backend roda em: `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend roda em: `http://localhost:5173`

## Rotas da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/login` | Login do admin | Não |
| POST | `/api/auth/logout` | Logout (limpar cookie) | Não |
| GET | `/api/auth/verificar` | Verificar token | Sim |
| GET | `/api/projetos` | Listar projetos publicados | Não |
| GET | `/api/projetos/:id` | Buscar projeto por ID | Não |
| GET | `/api/projetos/slug/:slug` | Buscar por slug | Não |
| GET | `/api/projetos/categoria/:cat` | Filtrar por categoria | Não |
| GET | `/api/projetos/admin/todos` | Listar todos (admin) | Sim |
| POST | `/api/projetos` | Criar projeto | Sim |
| PUT | `/api/projetos/:id` | Atualizar projeto | Sim |
| DELETE | `/api/projetos/:id` | Remover projeto | Sim |
| GET | `/api/perfil` | Obter perfil | Não |
| PUT | `/api/perfil` | Atualizar perfil | Sim |

> Todas as rotas que modificam dados (POST/PUT/DELETE) exigem token CSRF no header `X-CSRF-Token`.

## Funcionalidades

### Público
- Página inicial com apresentação, habilidades, projetos destaque e contato
- Listagem de projetos com filtros por categoria
- Busca de projetos
- Página de detalhe completa do projeto
- Paginação
- Tema claro e escuro
- Lazy loading de imagens
- Design responsivo

### Admin
- Login seguro com JWT via cookies httpOnly (token invisível ao JavaScript)
- Proteção CSRF (Double Submit Cookie)
- Rate limiting rigoroso no login (5 tentativas / 15 min)
- Dashboard com estatísticas
- CRUD completo de projetos
- Upload de imagens (principal + galeria)
- Definir categoria, destaque e status (publicado/rascunho)
- Edição de perfil profissional
- Gerenciamento de habilidades e contatos

### Rotas de Filtro por Categoria
- `/projetos/pacotes`
- `/projetos/scripts`
- `/projetos/sistemas`
- `/projetos/websites`
- `/projetos/aplicativos`

## Segurança

- **JWT em cookies httpOnly** — tokens invisíveis ao JavaScript e DevTools
- **CSRF Protection** — double submit cookie com HMAC assinado
- **Helmet** — headers de segurança HTTP
- **Rate Limiting** — 100 req/15min geral, 5 tentativas/15min no login
- **CORS restrito** — aceita apenas o domínio do frontend
- **Bcrypt (salt 12)** — hash de senhas
- **Sanitização de input** — proteção contra NoSQL injection e ReDoS
- **Variáveis de ambiente** — segredos isolados no `.env` (não versionado)

> Em produção, use **HTTPS** para que os cookies `secure: true` funcionem.

## Credenciais

As credenciais de admin são definidas no `.env` e aplicadas via `npm run seed`.

> **Não há credenciais padrão no código.** Configure suas próprias no `.env`.

## Licença

MIT
