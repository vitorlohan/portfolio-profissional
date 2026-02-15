// ============================================
// Seletor de Idioma
// ============================================
import { useState, useRef, useEffect } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';
import { idiomasDisponiveis } from '../../i18n/traducoes';
import styles from './SeletorIdioma.module.css';

const SeletorIdioma = () => {
  const { idioma, mudarIdioma } = useIdioma();
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const idiomaAtual = idiomasDisponiveis.find((i) => i.codigo === idioma);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickFora = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  return (
    <div className={styles.seletor} ref={ref}>
      <button
        className={styles.seletor__btn}
        onClick={() => setAberto(!aberto)}
        aria-label="Selecionar idioma"
        aria-expanded={aberto}
      >
        <span className={styles.seletor__bandeira}>{idiomaAtual?.bandeira}</span>
        <span className={styles.seletor__codigo}>
          {idioma.split('-')[0].toUpperCase()}
        </span>
        <span className={`${styles.seletor__seta} ${aberto ? styles['seletor__seta--aberto'] : ''}`}>
          ▾
        </span>
      </button>

      {aberto && (
        <div className={styles.seletor__dropdown}>
          {idiomasDisponiveis.map((item) => (
            <button
              key={item.codigo}
              className={`${styles.seletor__opcao} ${
                idioma === item.codigo ? styles['seletor__opcao--ativo'] : ''
              }`}
              onClick={() => {
                mudarIdioma(item.codigo);
                setAberto(false);
              }}
            >
              <span className={styles.seletor__bandeira}>{item.bandeira}</span>
              <span className={styles.seletor__nome}>{item.nome}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeletorIdioma;
