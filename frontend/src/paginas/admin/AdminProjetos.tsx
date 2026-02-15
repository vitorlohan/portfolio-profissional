// ============================================
// Página Admin - Lista de Projetos
// ============================================
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlusCircle, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { projetoServico } from '../../servicos/projetoServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Projeto, Paginacao } from '../../tipos';
import styles from './AdminProjetos.module.css';

const AdminProjetos = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [paginacao, setPaginacao] = useState<Paginacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();
  const { t } = useIdioma();

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const resp = await projetoServico.listarTodos(pagina, busca || undefined);
      setProjetos(resp.projetos);
      setPaginacao(resp.paginacao);
    } catch (erro) {
      toast.error(t('adminProjetos.erroCarregar'));
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }, [pagina, busca]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const remover = async (id: string, nome: string) => {
    if (!window.confirm(`${t('adminProjetos.confirmarRemover')} "${nome}"?`)) return;

    try {
      await projetoServico.remover(id);
      toast.success(t('adminProjetos.removido'));
      carregar();
    } catch {
      toast.error(t('adminProjetos.erroRemover'));
    }
  };

  return (
    <div>
      <div className={styles['admin-projetos__header']}>
        <h1 className="secao__titulo" style={{ marginBottom: 0 }}>
          Projetos
        </h1>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className={styles['admin-projetos__busca']}>
            <input
              type="text"
              placeholder={t('adminProjetos.buscar')}
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
              className={styles['admin-projetos__input']}
            />
            <button className="btn btn--primario btn--pequeno" onClick={carregar}>
              <FiSearch />
            </button>
          </div>

          <Link to="/admin/projetos/novo" className="btn btn--primario">
            <FiPlusCircle /> {t('adminProjetos.novo')}
          </Link>
        </div>
      </div>

      {carregando ? (
        <div className="loader">
          <div className="loader__spinner" />
        </div>
      ) : (
        <div className={styles['admin-projetos__lista']}>
          {projetos.length === 0 ? (
            <div className={styles['admin-projetos__vazio']}>
              <p>{t('adminProjetos.nenhum')}</p>
            </div>
          ) : (
            projetos.map((projeto) => (
              <div key={projeto._id} className={styles['admin-projetos__item']}>
                {projeto.imagemPrincipal ? (
                  <img
                    src={projeto.imagemPrincipal}
                    alt={projeto.nome}
                    className={styles['admin-projetos__thumb']}
                  />
                ) : (
                  <div
                    className={styles['admin-projetos__thumb']}
                    style={{
                      background: 'var(--gradiente-hero)',
                      borderRadius: '8px',
                    }}
                  />
                )}

                <div className={styles['admin-projetos__info']}>
                  <div className={styles['admin-projetos__nome']}>
                    {projeto.nome}
                  </div>
                  <div className={styles['admin-projetos__meta']}>
                    <span style={{ textTransform: 'capitalize' }}>
                      {projeto.categoria}
                    </span>
                    <span>{projeto.publicado ? '● Publicado' : '○ Rascunho'}</span>
                    <span>{projeto.visualizacoes || 0} views</span>
                  </div>
                </div>

                <div className={styles['admin-projetos__acoes']}>
                  <button
                    className={`${styles['admin-projetos__acao']} ${styles['admin-projetos__acao--editar']}`}
                    onClick={() =>
                      navigate(`/admin/projetos/editar/${projeto._id}`)
                    }
                  >
                    <FiEdit2 /> {t('adminProjetos.editar')}
                  </button>
                  <button
                    className={`${styles['admin-projetos__acao']} ${styles['admin-projetos__acao--remover']}`}
                    onClick={() => remover(projeto._id, projeto.nome)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Paginação */}
      {paginacao && paginacao.totalPaginas > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
          }}
        >
          <button
            className="btn btn--secundario btn--pequeno"
            disabled={pagina === 1}
            onClick={() => setPagina((p) => p - 1)}
          >
            {t('projetos.anterior')}
          </button>
          <span
            style={{
              padding: '0.5rem 1rem',
              color: 'var(--cor-texto-secundario)',
            }}
          >
            {t('adminProjetos.pagina')} {pagina} {t('adminProjetos.de')} {paginacao.totalPaginas}
          </span>
          <button
            className="btn btn--secundario btn--pequeno"
            disabled={pagina === paginacao.totalPaginas}
            onClick={() => setPagina((p) => p + 1)}
          >
            {t('projetos.proxima')}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProjetos;
