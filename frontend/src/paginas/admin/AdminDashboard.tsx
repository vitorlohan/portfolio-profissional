// ============================================
// Dashboard Admin
// ============================================
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiEye, FiStar, FiPlusCircle } from 'react-icons/fi';
import { projetoServico } from '../../servicos/projetoServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Projeto } from '../../tipos';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await projetoServico.listarTodos(1);
        setProjetos(resp.projetos);
      } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  const totalPublicados = projetos.filter((p) => p.publicado).length;
  const totalRascunhos = projetos.filter((p) => !p.publicado).length;
  const totalDestaques = projetos.filter((p) => p.destaque).length;
  const totalVisualizacoes = projetos.reduce(
    (acc, p) => acc + (p.visualizacoes || 0),
    0
  );

  const { t } = useIdioma();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h1 className="secao__titulo" style={{ marginBottom: 0 }}>
          {t('dashboard.titulo')}
        </h1>
        <Link to="/admin/projetos/novo" className="btn btn--primario">
          <FiPlusCircle /> {t('admin.novoProjeto')}
        </Link>
      </div>

      {/* Cards de estatísticas */}
      <div className={styles.dashboard__cards}>
        <div className={styles.dashboard__card}>
          <div className={styles['dashboard__card-icone']}>
            <FiFolder />
          </div>
          <div className={styles['dashboard__card-texto']}>
            <h3>{totalPublicados}</h3>
            <p>{t('dashboard.publicados')}</p>
          </div>
        </div>

        <div className={styles.dashboard__card}>
          <div className={styles['dashboard__card-icone']}>
            <FiFolder />
          </div>
          <div className={styles['dashboard__card-texto']}>
            <h3>{totalRascunhos}</h3>
            <p>{t('dashboard.rascunhos')}</p>
          </div>
        </div>

        <div className={styles.dashboard__card}>
          <div className={styles['dashboard__card-icone']}>
            <FiStar />
          </div>
          <div className={styles['dashboard__card-texto']}>
            <h3>{totalDestaques}</h3>
            <p>{t('dashboard.emDestaque')}</p>
          </div>
        </div>

        <div className={styles.dashboard__card}>
          <div className={styles['dashboard__card-icone']}>
            <FiEye />
          </div>
          <div className={styles['dashboard__card-texto']}>
            <h3>{totalVisualizacoes}</h3>
            <p>{t('dashboard.visualizacoes')}</p>
          </div>
        </div>
      </div>

      {/* Projetos recentes */}
      <div className={styles.dashboard__recentes}>
        <h2>{t('dashboard.recentes')}</h2>

        {carregando ? (
          <div className="loader">
            <div className="loader__spinner" />
          </div>
        ) : projetos.length === 0 ? (
          <p style={{ color: 'var(--cor-texto-secundario)', padding: '1rem 0' }}>
            {t('dashboard.nenhumProjeto')}
          </p>
        ) : (
          <table className={styles.dashboard__tabela}>
            <thead>
              <tr>
                <th>{t('dashboard.nome')}</th>
                <th>{t('dashboard.categoria')}</th>
                <th>{t('dashboard.status')}</th>
                <th>{t('dashboard.views')}</th>
              </tr>
            </thead>
            <tbody>
              {projetos.slice(0, 10).map((projeto) => (
                <tr key={projeto._id}>
                  <td>
                    <Link
                      to={`/admin/projetos/editar/${projeto._id}`}
                      style={{ color: 'var(--cor-primaria)', fontWeight: 600 }}
                    >
                      {projeto.nome}
                    </Link>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    {projeto.categoria}
                  </td>
                  <td>
                    <span
                      className={`${styles.dashboard__status} ${
                        projeto.publicado
                          ? styles['dashboard__status--publicado']
                          : styles['dashboard__status--rascunho']
                      }`}
                    >
                      {projeto.publicado ? t('dashboard.publicado') : t('dashboard.rascunho')}
                    </span>
                  </td>
                  <td>{projeto.visualizacoes || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
