// ============================================
// Serviço de Autenticação
// Tokens são gerenciados via cookies httpOnly
// (invisíveis ao JavaScript e DevTools)
// ============================================
import api from './api';
import type { DadosLogin, RespostaLogin, Usuario } from '../tipos';

export const authServico = {
  // Login — cookie httpOnly será definido automaticamente pelo servidor
  login: async (dados: DadosLogin): Promise<RespostaLogin> => {
    const { data } = await api.post('/auth/login', dados);
    return data;
  },

  // Logout — limpa o cookie httpOnly no servidor
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignorar erro de rede no logout
    }
  },

  // Verificar autenticação — cookie é enviado automaticamente
  verificar: async (): Promise<{ usuario: Usuario }> => {
    const { data } = await api.get('/auth/verificar');
    return data;
  },
};
