// ============================================
// Configuração do Axios (cliente HTTP)
// ============================================
import axios from 'axios';

const API_URL = '/api';

// Ler cookie por nome (para enviar CSRF token)
const lerCookie = (nome: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + nome + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

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
    const csrfToken = lerCookie('portfolio_csrf');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
  },
  (erro) => Promise.reject(erro)
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401) {
      // Redirecionar para login se estiver no admin
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(erro);
  }
);

export default api;
