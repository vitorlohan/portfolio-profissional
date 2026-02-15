// ============================================
// Seção Hero (Apresentação Principal)
// ============================================
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Perfil } from '../../tipos';
import styles from './SecaoHero.module.css';

interface Props {
  perfil: Perfil | null;
}

const SecaoHero = ({ perfil }: Props) => {
  const { t } = useIdioma();
  if (!perfil) return null;

  const iniciais = perfil.nome
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__conteudo}>
          <p className={styles.hero__saudacao}>{t('hero.saudacao')}</p>
          <h1 className={styles.hero__nome}>{perfil.nome}</h1>
          <p className={styles.hero__titulo}>{perfil.titulo}</p>
          <p className={styles.hero__descricao}>{perfil.descricaoCurta}</p>

          <div className={styles.hero__tecnologias}>
            {perfil.tecnologiasDominadas?.slice(0, 8).map((tec) => (
              <span key={tec} className="tag">
                {tec}
              </span>
            ))}
          </div>

          <div className={styles.hero__acoes}>
            <Link to="/projetos" className="btn btn--primario">
              {t('hero.verProjetos')} <FiArrowRight />
            </Link>
            <Link to="/contato" className="btn btn--secundario">
              {t('hero.contato')} <FiDownload />
            </Link>
          </div>
        </div>

        <div className={styles['hero__avatar-wrapper']}>
          {perfil.avatar ? (
            <img
              src={perfil.avatar}
              alt={perfil.nome}
              className={styles.hero__avatar}
            />
          ) : (
            <div className={styles['hero__avatar-placeholder']}>
              {iniciais}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SecaoHero;
