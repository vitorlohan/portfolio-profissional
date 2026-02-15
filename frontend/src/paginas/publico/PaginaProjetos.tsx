// ============================================
// Página de Projetos (listagem com filtros)
// ============================================
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { projetoServico } from '../../servicos/projetoServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import CardProjeto from '../../componentes/projetos/CardProjeto';
import type { Projeto, Paginacao, Categoria } from '../../tipos';
import styles from './PaginaProjetos.module.css';

const PaginaProjetos = () => {
  const { categoria } = useParams<{ categoria?: string }>();
  const navigate = useNavigate();
  const { t } = useIdioma();

  const categorias: { valor: string; label: string }[] = [
    { valor: 'todos', label: t('projetos.todos') },
    { valor: 'pacotes', label: t('projetos.pacotes') },
    { valor: 'scripts', label: t('projetos.scripts') },
    { valor: 'sistemas', label: t('projetos.sistemas') },
    { valor: 'websites', label: t('projetos.websites') },
    { valor: 'aplicativos', label: t('projetos.aplicativos') },
  ];

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [paginacao, setPaginacao] = useState<Paginacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  const categoriaAtiva = categoria || 'todos';

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      let resposta;

      if (categoriaAtiva !== 'todos') {
        resposta = await projetoServico.filtrarPorCategoria(
          categoriaAtiva as Categoria,
          paginaAtual
        );
      } else {
        resposta = await projetoServico.listar(paginaAtual, busca || undefined);
      }

      setProjetos(resposta.projetos);
      setPaginacao(resposta.paginacao);
    } catch (erro) {
      console.error('Erro ao carregar projetos:', erro);
    } finally {
      setCarregando(false);
    }
  }, [categoriaAtiva, paginaAtual, busca]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const mudarCategoria = (valor: string) => {
    setPaginaAtual(1);
    if (valor === 'todos') {
      navigate('/projetos');
    } else {
      navigate(`/projetos/${valor}`);
    }
  };

  const buscarProjetos = (e: React.FormEvent) => {
    e.preventDefault();
    setPaginaAtual(1);
    carregar();
  };

  return (
    <div className={styles['pagina-projetos']}>
      <div className={styles['pagina-projetos__container']}>
        <div className={styles['pagina-projetos__header']}>
          <h1 className="secao__titulo">{t('projetos.titulo')}</h1>
          <p className="secao__subtitulo">
            {t('projetos.subtitulo')}
          </p>
        </div>

        {/* Filtros de categoria */}
        <div className={styles['pagina-projetos__filtros']}>
          {categorias.map((cat) => (
            <button
              key={cat.valor}
              className={`${styles['pagina-projetos__filtro']} ${
                categoriaAtiva === cat.valor
                  ? styles['pagina-projetos__filtro--ativo']
                  : ''
              }`}
              onClick={() => mudarCategoria(cat.valor)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Busca */}
        {categoriaAtiva === 'todos' && (
          <form
            className={styles['pagina-projetos__busca']}
            onSubmit={buscarProjetos}
          >
            <input
              type="text"
              placeholder={t('projetos.buscar')}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={styles['pagina-projetos__input']}
            />
            <button type="submit" className="btn btn--primario" style={{ marginLeft: '0.5rem' }}>
              <FiSearch />
            </button>
          </form>
        )}

        {/* Grid de projetos */}
        {carregando ? (
          <div className="loader">
            <div className="loader__spinner" />
          </div>
        ) : (
          <>
            <div className={styles['pagina-projetos__grid']}>
              {projetos.length > 0 ? (
                projetos.map((projeto) => (
                  <CardProjeto key={projeto._id} projeto={projeto} />
                ))
              ) : (
                <div className={styles['pagina-projetos__vazio']}>
                  <h3>{t('projetos.nenhum')}</h3>
                  <p>{t('projetos.tentarOutra')}</p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {paginacao && paginacao.totalPaginas > 1 && (
              <div className={styles.paginacao}>
                <button
                  className={styles.paginacao__btn}
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual((p) => p - 1)}
                >
                  {t('projetos.anterior')}
                </button>

                {Array.from(
                  { length: paginacao.totalPaginas },
                  (_, i) => i + 1
                ).map((num) => (
                  <button
                    key={num}
                    className={`${styles.paginacao__btn} ${
                      num === paginaAtual ? styles['paginacao__btn--ativo'] : ''
                    }`}
                    onClick={() => setPaginaAtual(num)}
                  >
                    {num}
                  </button>
                ))}

                <button
                  className={styles.paginacao__btn}
                  disabled={paginaAtual === paginacao.totalPaginas}
                  onClick={() => setPaginaAtual((p) => p + 1)}
                >
                  {t('projetos.proxima')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaginaProjetos;
