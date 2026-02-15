// ============================================
// Modal de Imagem (Lightbox) para Galeria
// ============================================
import { useEffect, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useIdioma } from '../../contextos/IdiomaContexto';
import styles from './ModalImagem.module.css';

interface Props {
  imagens: string[];
  indiceAtual: number;
  altBase: string;
  aberto: boolean;
  onFechar: () => void;
  onMudarIndice: (novoIndice: number) => void;
}

const ModalImagem = ({
  imagens,
  indiceAtual,
  altBase,
  aberto,
  onFechar,
  onMudarIndice,
}: Props) => {
  const { t } = useIdioma();

  const irAnterior = useCallback(() => {
    onMudarIndice(indiceAtual > 0 ? indiceAtual - 1 : imagens.length - 1);
  }, [indiceAtual, imagens.length, onMudarIndice]);

  const irProxima = useCallback(() => {
    onMudarIndice(indiceAtual < imagens.length - 1 ? indiceAtual + 1 : 0);
  }, [indiceAtual, imagens.length, onMudarIndice]);

  // Keyboard navigation
  useEffect(() => {
    if (!aberto) return;

    const handleTecla = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onFechar();
          break;
        case 'ArrowLeft':
          irAnterior();
          break;
        case 'ArrowRight':
          irProxima();
          break;
      }
    };

    document.addEventListener('keydown', handleTecla);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleTecla);
      document.body.style.overflow = '';
    };
  }, [aberto, onFechar, irAnterior, irProxima]);

  if (!aberto) return null;

  return (
    <div className={styles.modal} onClick={onFechar}>
      <div className={styles.modal__conteudo} onClick={(e) => e.stopPropagation()}>
        {/* Botão fechar */}
        <button
          className={styles.modal__fechar}
          onClick={onFechar}
          aria-label={t('modal.fechar')}
        >
          <FiX />
        </button>

        {/* Navegação anterior */}
        {imagens.length > 1 && (
          <button
            className={`${styles.modal__nav} ${styles['modal__nav--esquerda']}`}
            onClick={irAnterior}
            aria-label={t('modal.anterior')}
          >
            <FiChevronLeft />
          </button>
        )}

        {/* Imagem */}
        <div className={styles.modal__imagemWrapper}>
          <img
            src={imagens[indiceAtual]}
            alt={`${altBase} - ${indiceAtual + 1}`}
            className={styles.modal__imagem}
          />
        </div>

        {/* Navegação próxima */}
        {imagens.length > 1 && (
          <button
            className={`${styles.modal__nav} ${styles['modal__nav--direita']}`}
            onClick={irProxima}
            aria-label={t('modal.proxima')}
          >
            <FiChevronRight />
          </button>
        )}

        {/* Contador */}
        {imagens.length > 1 && (
          <div className={styles.modal__contador}>
            {indiceAtual + 1} {t('modal.de')} {imagens.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalImagem;
