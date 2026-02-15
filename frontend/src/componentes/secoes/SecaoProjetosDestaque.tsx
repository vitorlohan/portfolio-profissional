// ============================================
// Seção de Projetos em Destaque
// ============================================
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { projetoServico } from '../../servicos/projetoServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import CardProjeto from '../projetos/CardProjeto';
import type { Projeto } from '../../tipos';
import styles from './SecaoProjetosDestaque.module.css';

const SecaoProjetosDestaque = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await projetoServico.listar(1, undefined, true);
        setProjetos(resp.projetos.slice(0, 6));
      } catch {
        // Silenciar erro - seção opcional
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  if (carregando) {
    return (
      <div className="loader">
        <div className="loader__spinner" />
      </div>
    );
  }

  if (!projetos.length) return null;

  const { t } = useIdioma();

  return (
    <section className={styles.projetos}>
      <div className={styles.projetos__container}>
        <h2 className="secao__titulo">{t('destaque.titulo')}</h2>
        <p className="secao__subtitulo">
          {t('destaque.subtitulo')}
        </p>

        <div className={styles.projetos__grid}>
          {projetos.map((projeto) => (
            <CardProjeto key={projeto._id} projeto={projeto} />
          ))}
        </div>

        <div className={styles['projetos__ver-todos']}>
          <Link to="/projetos" className="btn btn--primario">
            {t('destaque.verTodos')} <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SecaoProjetosDestaque;
