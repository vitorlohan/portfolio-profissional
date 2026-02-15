// ============================================
// Serviço de Perfil
// ============================================
import api from './api';
import type { Perfil } from '../tipos';

export const perfilServico = {
  // Obter perfil público
  obter: async (): Promise<Perfil> => {
    const { data } = await api.get('/perfil');
    return data;
  },

  // Atualizar perfil (admin)
  atualizar: async (formData: FormData): Promise<Perfil> => {
    const { data } = await api.put('/perfil', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
