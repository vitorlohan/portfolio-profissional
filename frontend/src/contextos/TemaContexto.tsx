// ============================================
// Contexto de Tema (Claro / Escuro)
// ============================================
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Tema } from '../tipos';

interface TemaContexto {
  tema: Tema;
  alternarTema: () => void;
  ehEscuro: boolean;
}

const TemaContext = createContext<TemaContexto | undefined>(undefined);

export const TemaProvider = ({ children }: { children: ReactNode }) => {
  const [tema, setTema] = useState<Tema>(() => {
    const salvo = localStorage.getItem('portfolio_tema') as Tema;
    if (salvo) return salvo;

    // Detectar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'escuro'
      : 'claro';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_tema', tema);
    document.documentElement.setAttribute('data-tema', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema, ehEscuro: tema === 'escuro' }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error('useTema deve ser usado dentro de TemaProvider');
  }
  return contexto;
};
