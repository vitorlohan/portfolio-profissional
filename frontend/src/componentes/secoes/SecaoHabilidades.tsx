// ============================================
// Seção de Habilidades
// ============================================
import { useEffect, useRef, useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Habilidade } from '../../tipos';
import styles from './SecaoHabilidades.module.css';

interface Props {
  habilidades: Habilidade[];
}

const SecaoHabilidades = ({ habilidades }: Props) => {
  const [visivel, setVisivel] = useState(false);
  const secaoRef = useRef<HTMLDivElement>(null);

  // Animar barras quando a seção entrar na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (secaoRef.current) {
      observer.observe(secaoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!habilidades?.length) return null;

  const { t } = useIdioma();

  return (
    <section className={styles.habilidades} ref={secaoRef}>
      <div className={styles.habilidades__container}>
        <h2 className="secao__titulo">{t('habilidades.titulo')}</h2>
        <p className="secao__subtitulo">{t('habilidades.subtitulo')}</p>

        <div className={styles.habilidades__grid}>
          {habilidades.map((hab) => (
            <div key={hab.nome} className={styles.habilidade}>
              <div className={styles.habilidade__header}>
                <span className={styles.habilidade__nome}>{hab.nome}</span>
                <span className={styles.habilidade__porcentagem}>
                  {hab.porcentagem}%
                </span>
              </div>
              <div className={styles.habilidade__barra}>
                <div
                  className={styles.habilidade__progresso}
                  style={{
                    width: visivel ? `${hab.porcentagem}%` : '0%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecaoHabilidades;
