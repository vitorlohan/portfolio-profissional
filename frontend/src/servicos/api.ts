// ============================================
// Configuração do Axios (cliente HTTP)
// ============================================
import axios from 'axios';

// Em dev: vazio (proxy do Vite), em prod: URL completa do Render
const API_URL = `${import.meta.env.VITE_API_URL || ''}/api`;

// Armazena o token CSRF recebido do backend via response header
// (em cross-origin, não é possível ler cookies de outro domínio)
let csrfToken: string | null = null;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Envia cookies httpOnly automaticamente
});

// Interceptor: enviar token CSRF no header de toda requisição
api.interceptors.request.use(
  (config) => {
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
  },
  (erro) => Promise.reject(erro)
);

// Interceptor de resposta: capturar token CSRF do header + tratar 401
api.interceptors.response.use(
  (resposta) => {
    // Captura o CSRF token enviado pelo backend no header
    const novoToken = resposta.headers['x-csrf-token'];
    if (novoToken) {
      csrfToken = novoToken;
    }
    return resposta;
  },
  (erro) => {
    // Captura CSRF token mesmo em respostas de erro
    const novoToken = erro.response?.headers?.['x-csrf-token'];
    if (novoToken) {
      csrfToken = novoToken;
    }

    if (erro.response?.status === 401) {
      // Redirecionar para login se estiver no admin (mas NÃO se já está na página de login)
      const path = window.location.pathname;
      if (path.includes('/admin') && !path.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(erro);
  }
);

export default api;
