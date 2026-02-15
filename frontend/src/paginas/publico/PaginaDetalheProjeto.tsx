// ============================================
// Página de Detalhe do Projeto
// ============================================
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiGithub,
  FiGlobe,
  FiSmartphone,
  FiEye,
  FiExternalLink,
} from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { projetoServico } from '../../servicos/projetoServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import ModalImagem from '../../componentes/comum/ModalImagem';
import type { Projeto } from '../../tipos';
import styles from './PaginaDetalheProjeto.module.css';

const PaginaDetalheProjeto = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useIdioma();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemModalIndice, setImagemModalIndice] = useState(0);

  useEffect(() => {
    const carregar = async () => {
      try {
        if (!slug) return;
        const dados = await projetoServico.buscarPorSlug(slug);
        setProjeto(dados);
      } catch {
        setErro('Projeto não encontrado.');
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, [slug]);

  if (carregando) {
    return (
      <div className="loader">
        <div className="loader__spinner" />
      </div>
    );
  }

  if (erro || !projeto) {
    return (
      <div className={styles.detalhe}>
        <div className={styles.detalhe__container}>
          <Link to="/projetos" className={styles.detalhe__voltar}>
            <FiArrowLeft /> {t('detalhe.voltar')}
          </Link>
          <h1>{erro || t('detalhe.naoEncontrado')}</h1>
        </div>
      </div>
    );
  }

  const dataFormatada = new Date(projeto.dataPublicacao).toLocaleDateString(
    'pt-BR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className={styles.detalhe}>
      <div className={styles.detalhe__container}>
        <Link to="/projetos" className={styles.detalhe__voltar}>
          <FiArrowLeft /> {t('detalhe.voltar')}
        </Link>

        {/* Imagem principal */}
        {projeto.imagemPrincipal && (
          <LazyLoadImage
            src={projeto.imagemPrincipal}
            alt={projeto.nome}
            className={styles['detalhe__imagem-principal']}
            effect="opacity"
          />
        )}

        {/* Meta informações */}
        <div className={styles.detalhe__meta}>
          <span className={styles.detalhe__categoria}>
            {projeto.categoria}
          </span>
          <span className={styles.detalhe__data}>{dataFormatada}</span>
          <span className={styles.detalhe__visualizacoes}>
            <FiEye /> {projeto.visualizacoes} {t('detalhe.visualizacoes')}
          </span>
        </div>

        {/* Título e resumo */}
        <h1 className={styles.detalhe__nome}>{projeto.nome}</h1>
        <p className={styles.detalhe__resumo}>{projeto.resumo}</p>

        {/* Tecnologias */}
        <div className={styles.detalhe__tecnologias}>
          {projeto.tecnologias?.map((tec) => (
            <span key={tec} className="tag">
              {tec}
            </span>
          ))}
        </div>

        {/* Descrição completa */}
        <div className={styles.detalhe__secao}>
          <h2>{t('detalhe.descricao')}</h2>
          <div className={styles.detalhe__descricao}>{projeto.descricao}</div>
        </div>

        {/* Funcionalidades */}
        {projeto.funcionalidades?.length > 0 && (
          <div className={styles.detalhe__secao}>
            <h2>{t('detalhe.funcionalidades')}</h2>
            <ul className={styles.detalhe__lista}>
              {projeto.funcionalidades.map((func, idx) => (
                <li key={idx}>{func}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Desafios e Soluções */}
        {projeto.desafios && (
          <div className={styles.detalhe__secao}>
            <h2>{t('detalhe.desafios')}</h2>
            <div className={styles.detalhe__descricao}>{projeto.desafios}</div>
          </div>
        )}

        {projeto.solucoes && (
          <div className={styles.detalhe__secao}>
            <h2>{t('detalhe.solucoes')}</h2>
            <div className={styles.detalhe__descricao}>{projeto.solucoes}</div>
          </div>
        )}

        {/* Galeria de imagens */}
        {projeto.galeriaImagens?.length > 0 && (
          <div className={styles.detalhe__secao}>
            <h2>{t('detalhe.galeria')}</h2>
            <div className={styles.detalhe__galeria}>
              {projeto.galeriaImagens.map((img, idx) => (
                <LazyLoadImage
                  key={idx}
                  src={img}
                  alt={`${projeto.nome} - imagem ${idx + 1}`}
                  className={styles['detalhe__galeria-img']}
                  effect="opacity"
                  onClick={() => {
                    setImagemModalIndice(idx);
                    setModalAberto(true);
                  }}
                />
              ))}
            </div>

            <ModalImagem
              imagens={projeto.galeriaImagens}
              indiceAtual={imagemModalIndice}
              altBase={projeto.nome}
              aberto={modalAberto}
              onFechar={() => setModalAberto(false)}
              onMudarIndice={setImagemModalIndice}
            />
          </div>
        )}

        {/* Links externos */}
        {(projeto.linksExternos?.github ||
          projeto.linksExternos?.site ||
          projeto.linksExternos?.aplicativo ||
          projeto.linksExternos?.outros?.length) && (
          <div className={styles.detalhe__secao}>
            <h2>{t('detalhe.links')}</h2>
            <div className={styles.detalhe__links}>
              {projeto.linksExternos.github && (
                <a
                  href={projeto.linksExternos.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['detalhe__link-externo']}
                >
                  <FiGithub /> {t('detalhe.repositorio')}
                </a>
              )}
              {projeto.linksExternos.site && (
                <a
                  href={projeto.linksExternos.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['detalhe__link-externo']}
                >
                  <FiGlobe /> {t('detalhe.site')}
                </a>
              )}
              {projeto.linksExternos.aplicativo && (
                <a
                  href={projeto.linksExternos.aplicativo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['detalhe__link-externo']}
                >
                  <FiSmartphone /> {t('detalhe.aplicativo')}
                </a>
              )}
              {projeto.linksExternos.outros?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['detalhe__link-externo']}
                >
                  <FiExternalLink /> {link.titulo}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginaDetalheProjeto;
