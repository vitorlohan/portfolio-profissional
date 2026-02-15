// ============================================
// Contexto de Autenticação
// Dados de sessão mantidos apenas em memória (React state).
// Token JWT é gerenciado via cookie httpOnly (invisível ao JS).
// ============================================
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authServico } from '../servicos/authServico';
import type { Usuario, DadosLogin } from '../tipos';

interface AuthContexto {
  usuario: Usuario | null;
  carregando: boolean;
  login: (dados: DadosLogin) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContexto | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Verificar autenticação ao montar (cookie é enviado automaticamente)
  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const { usuario: usr } = await authServico.verificar();
        setUsuario(usr);
      } catch {
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    };
    verificarAuth();
  }, []);

  const login = async (dados: DadosLogin) => {
    const resposta = await authServico.login(dados);
    setUsuario(resposta.usuario);
  };

  const logout = async () => {
    await authServico.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        login,
        logout,
        estaAutenticado: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return contexto;
};
