// ============================================
// Contexto de Idioma (Internacionalização)
// ============================================
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { traducoes, type Idioma } from '../i18n/traducoes';

interface IdiomaContextoTipo {
  idioma: Idioma;
  mudarIdioma: (novoIdioma: Idioma) => void;
  t: (chave: string) => string;
}

const IdiomaContexto = createContext<IdiomaContextoTipo | null>(null);

export const IdiomaProvider = ({ children }: { children: ReactNode }) => {
  const [idioma, setIdioma] = useState<Idioma>(() => {
    const salvo = localStorage.getItem('idioma') as Idioma | null;
    if (salvo && traducoes[salvo]) return salvo;
    return 'pt-BR';
  });

  const mudarIdioma = useCallback((novoIdioma: Idioma) => {
    setIdioma(novoIdioma);
    localStorage.setItem('idioma', novoIdioma);
    document.documentElement.lang = novoIdioma;
  }, []);

  const t = useCallback(
    (chave: string): string => {
      return traducoes[idioma]?.[chave] || traducoes['pt-BR']?.[chave] || chave;
    },
    [idioma]
  );

  return (
    <IdiomaContexto.Provider value={{ idioma, mudarIdioma, t }}>
      {children}
    </IdiomaContexto.Provider>
  );
};

export const useIdioma = (): IdiomaContextoTipo => {
  const contexto = useContext(IdiomaContexto);
  if (!contexto) {
    throw new Error('useIdioma deve ser usado dentro de IdiomaProvider');
  }
  return contexto;
};
