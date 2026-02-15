// ============================================
// Seção de Publicações e Pacotes
// ============================================
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Publicacao } from '../../tipos';
import styles from './SecaoPublicacoes.module.css';

interface Props {
  publicacoes: Publicacao[];
}

const SecaoPublicacoes = ({ publicacoes }: Props) => {
  const { t } = useIdioma();

  const tipoLabel: Record<string, string> = {
    pacote: t('publicacoes.pacote'),
    artigo: t('publicacoes.artigo'),
    video: t('publicacoes.video'),
    outro: t('publicacoes.outro'),
  };

  if (!publicacoes?.length) return null;

  return (
    <section className={styles.publicacoes}>
      <div className={styles.publicacoes__container}>
        <h2 className="secao__titulo">{t('publicacoes.titulo')}</h2>
        <p className="secao__subtitulo">
          {t('publicacoes.subtitulo')}
        </p>

        <div className={styles.publicacoes__grid}>
          {publicacoes.map((pub, idx) => (
            <a
              key={idx}
              href={pub.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.publicacao}
            >
              <span className={styles.publicacao__tipo}>
                {tipoLabel[pub.tipo] || pub.tipo}
              </span>
              <h3 className={styles.publicacao__titulo}>{pub.titulo}</h3>
              {pub.descricao && (
                <p className={styles.publicacao__descricao}>{pub.descricao}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecaoPublicacoes;
