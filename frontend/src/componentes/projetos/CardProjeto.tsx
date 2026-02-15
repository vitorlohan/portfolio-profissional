// ============================================
// Card de Projeto
// ============================================
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEye, FiFolder } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Projeto } from '../../tipos';
import styles from './CardProjeto.module.css';

interface Props {
  projeto: Projeto;
}

const CardProjeto = ({ projeto }: Props) => {
  const { t } = useIdioma();
  return (
    <article className={styles.card}>
      <div className={styles['card__imagem-wrapper']}>
        {projeto.imagemPrincipal ? (
          <LazyLoadImage
            src={projeto.imagemPrincipal}
            alt={projeto.nome}
            className={styles.card__imagem}
            effect="opacity"
          />
        ) : (
          <div className={styles.card__placeholder}>
            <FiFolder />
          </div>
        )}
        <span className={styles.card__badge}>{projeto.categoria}</span>
        {projeto.destaque && (
          <span className={styles.card__destaque}>{t('card.destaque')}</span>
        )}
      </div>

      <div className={styles.card__conteudo}>
        <h3 className={styles.card__nome}>{projeto.nome}</h3>
        <p className={styles.card__resumo}>{projeto.resumo}</p>

        <div className={styles.card__tecnologias}>
          {projeto.tecnologias?.slice(0, 4).map((tec) => (
            <span key={tec} className="tag">
              {tec}
            </span>
          ))}
          {projeto.tecnologias?.length > 4 && (
            <span className="tag">+{projeto.tecnologias.length - 4}</span>
          )}
        </div>

        <div className={styles.card__footer}>
          <span className={styles.card__visualizacoes}>
            <FiEye /> {projeto.visualizacoes || 0}
          </span>
          <Link
            to={`/projeto/${projeto.slug}`}
            className={styles.card__link}
          >
            {t('card.verProjeto')} <FiArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CardProjeto;
