// ============================================
// Serviço de Projetos
// ============================================
import api from './api';
import type { Projeto, RespostaProjetos, Categoria } from '../tipos';

export const projetoServico = {
  // Listar projetos publicados
  listar: async (pagina = 1, busca?: string, destaque?: boolean): Promise<RespostaProjetos> => {
    const params: Record<string, string | number | boolean> = { pagina };
    if (busca) params.busca = busca;
    if (destaque) params.destaque = true;

    const { data } = await api.get('/projetos', { params });
    return data;
  },

  // Buscar por ID
  buscarPorId: async (id: string): Promise<Projeto> => {
    const { data } = await api.get(`/projetos/${id}`);
    return data;
  },

  // Buscar por slug
  buscarPorSlug: async (slug: string): Promise<Projeto> => {
    const { data } = await api.get(`/projetos/slug/${slug}`);
    return data;
  },

  // Filtrar por categoria
  filtrarPorCategoria: async (categoria: Categoria, pagina = 1): Promise<RespostaProjetos> => {
    const { data } = await api.get(`/projetos/categoria/${categoria}`, {
      params: { pagina },
    });
    return data;
  },

  // ---- Admin ----

  // Listar todos (admin)
  listarTodos: async (pagina = 1, busca?: string): Promise<RespostaProjetos> => {
    const params: Record<string, string | number> = { pagina };
    if (busca) params.busca = busca;

    const { data } = await api.get('/projetos/admin/todos', { params });
    return data;
  },

  // Criar projeto
  criar: async (formData: FormData): Promise<Projeto> => {
    const { data } = await api.post('/projetos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // Atualizar projeto
  atualizar: async (id: string, formData: FormData): Promise<Projeto> => {
    const { data } = await api.put(`/projetos/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  // Remover projeto
  remover: async (id: string): Promise<void> => {
    await api.delete(`/projetos/${id}`);
  },
};
