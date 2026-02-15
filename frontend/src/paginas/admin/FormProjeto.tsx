// ============================================
// Formulário de Criar / Editar Projeto
// ============================================
import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { projetoServico } from '../../servicos/projetoServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Categoria } from '../../tipos';
import styles from './FormProjeto.module.css';

interface FormDados {
  nome: string;
  categoria: Categoria;
  resumo: string;
  descricao: string;
  tecnologias: string;
  tags: string;
  funcionalidades: string;
  desafios: string;
  solucoes: string;
  githubUrl: string;
  siteUrl: string;
  aplicativoUrl: string;
  destaque: boolean;
  publicado: boolean;
}

const valoresIniciais: FormDados = {
  nome: '',
  categoria: 'sistemas',
  resumo: '',
  descricao: '',
  tecnologias: '',
  tags: '',
  funcionalidades: '',
  desafios: '',
  solucoes: '',
  githubUrl: '',
  siteUrl: '',
  aplicativoUrl: '',
  destaque: false,
  publicado: false,
};

const FormProjeto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editando = !!id;
  const { t } = useIdioma();

  const [form, setForm] = useState<FormDados>(valoresIniciais);
  const [imagemPrincipal, setImagemPrincipal] = useState<File | null>(null);
  const [galeria, setGaleria] = useState<File[]>([]);
  const [previewPrincipal, setPreviewPrincipal] = useState('');
  const [previewGaleria, setPreviewGaleria] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(editando);

  // Carregar dados se editando
  useEffect(() => {
    if (!id) return;

    const carregar = async () => {
      try {
        const projeto = await projetoServico.buscarPorId(id);
        setForm({
          nome: projeto.nome,
          categoria: projeto.categoria,
          resumo: projeto.resumo,
          descricao: projeto.descricao,
          tecnologias: projeto.tecnologias?.join(', ') || '',
          tags: projeto.tags?.join(', ') || '',
          funcionalidades: projeto.funcionalidades?.join('\n') || '',
          desafios: projeto.desafios || '',
          solucoes: projeto.solucoes || '',
          githubUrl: projeto.linksExternos?.github || '',
          siteUrl: projeto.linksExternos?.site || '',
          aplicativoUrl: projeto.linksExternos?.aplicativo || '',
          destaque: projeto.destaque,
          publicado: projeto.publicado,
        });

        if (projeto.imagemPrincipal) {
          setPreviewPrincipal(projeto.imagemPrincipal);
        }
        if (projeto.galeriaImagens?.length) {
          setPreviewGaleria(projeto.galeriaImagens);
        }
      } catch {
        toast.error(t('form.erroCarregar'));
        navigate('/admin/projetos');
      } finally {
        setCarregandoDados(false);
      }
    };

    carregar();
  }, [id, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImagemPrincipal = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemPrincipal(file);
      setPreviewPrincipal(URL.createObjectURL(file));
    }
  };

  const handleGaleria = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGaleria((prev) => [...prev, ...files]);
    setPreviewGaleria((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const formData = new FormData();

      // Campos de texto
      formData.append('nome', form.nome);
      formData.append('categoria', form.categoria);
      formData.append('resumo', form.resumo);
      formData.append('descricao', form.descricao);
      formData.append('tecnologias', form.tecnologias);
      formData.append('tags', form.tags);
      formData.append('funcionalidades', form.funcionalidades);
      formData.append('desafios', form.desafios);
      formData.append('solucoes', form.solucoes);
      formData.append('destaque', String(form.destaque));
      formData.append('publicado', String(form.publicado));

      // Links externos
      formData.append(
        'linksExternos',
        JSON.stringify({
          github: form.githubUrl,
          site: form.siteUrl,
          aplicativo: form.aplicativoUrl,
          outros: [],
        })
      );

      // Imagens
      if (imagemPrincipal) {
        formData.append('imagemPrincipal', imagemPrincipal);
      }
      galeria.forEach((file) => {
        formData.append('galeria', file);
      });

      if (editando && id) {
        await projetoServico.atualizar(id, formData);
        toast.success(t('form.projetoAtualizado'));
      } else {
        await projetoServico.criar(formData);
        toast.success(t('form.projetoCriado'));
      }

      navigate('/admin/projetos');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { erro?: string } } };
      toast.error(error.response?.data?.erro || t('form.erroSalvar'));
    } finally {
      setCarregando(false);
    }
  };

  if (carregandoDados) {
    return (
      <div className="loader">
        <div className="loader__spinner" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/admin/projetos')}
          className="btn btn--secundario btn--pequeno"
        >
          <FiArrowLeft /> {t('form.voltar')}
        </button>
        <h1 className="secao__titulo" style={{ marginBottom: 0 }}>
          {editando ? t('form.editarProjeto') : t('form.novoProjeto')}
        </h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Informações básicas */}
        <h3 className={styles.form__secao}>{t('form.infoBasicas')}</h3>

        <div className={styles.form__row}>
          <div className={styles.form__grupo}>
            <label className={styles.form__label}>{t('form.nomeProjeto')} *</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className={styles.form__input}
              placeholder="Nome do projeto"
              required
            />
          </div>

          <div className={styles.form__grupo}>
            <label className={styles.form__label}>{t('form.categoria')} *</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className={styles.form__select}
              required
            >
              <option value="pacotes">Pacotes</option>
              <option value="scripts">Scripts</option>
              <option value="sistemas">Sistemas</option>
              <option value="websites">Websites</option>
              <option value="aplicativos">Aplicativos</option>
            </select>
          </div>
        </div>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.resumoCurto')} *</label>
          <textarea
            name="resumo"
            value={form.resumo}
            onChange={handleChange}
            className={styles.form__textarea}
            placeholder="Breve descrição do projeto (máx. 500 caracteres)"
            maxLength={500}
            style={{ minHeight: '80px' }}
            required
          />
        </div>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.descCompleta')} *</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className={styles.form__textarea}
            placeholder="Descrição detalhada do projeto"
            style={{ minHeight: '160px' }}
            required
          />
        </div>

        {/* Tecnologias e Tags */}
        <h3 className={styles.form__secao}>{t('form.tecTags')}</h3>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.tecnologias')}</label>
          <input
            type="text"
            name="tecnologias"
            value={form.tecnologias}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="React, Node.js, TypeScript (separadas por vírgula)"
          />
          <span className={styles.form__dica}>{t('form.separarVirgula')}</span>
        </div>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.tags')}</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="web, api, fullstack (separadas por vírgula)"
          />
        </div>

        {/* Funcionalidades e desafios */}
        <h3 className={styles.form__secao}>{t('form.detalhes')}</h3>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.funcionalidades')}</label>
          <textarea
            name="funcionalidades"
            value={form.funcionalidades}
            onChange={handleChange}
            className={styles.form__textarea}
            placeholder="Uma funcionalidade por linha"
          />
          <span className={styles.form__dica}>{t('form.umaPorLinha')}</span>
        </div>

        <div className={styles.form__row}>
          <div className={styles.form__grupo}>
            <label className={styles.form__label}>{t('form.desafios')}</label>
            <textarea
              name="desafios"
              value={form.desafios}
              onChange={handleChange}
              className={styles.form__textarea}
              placeholder="Descreva os desafios enfrentados"
            />
          </div>

          <div className={styles.form__grupo}>
            <label className={styles.form__label}>{t('form.solucoes')}</label>
            <textarea
              name="solucoes"
              value={form.solucoes}
              onChange={handleChange}
              className={styles.form__textarea}
              placeholder="Descreva as soluções aplicadas"
            />
          </div>
        </div>

        {/* Links externos */}
        <h3 className={styles.form__secao}>{t('form.linksExternos')}</h3>

        <div className={styles.form__row}>
          <div className={styles.form__grupo}>
            <label className={styles.form__label}>{t('form.urlGithub')}</label>
            <input
              type="url"
              name="githubUrl"
              value={form.githubUrl}
              onChange={handleChange}
              className={styles.form__input}
              placeholder="https://github.com/user/repo"
            />
          </div>
          <div className={styles.form__grupo}>
            <label className={styles.form__label}>{t('form.urlSite')}</label>
            <input
              type="url"
              name="siteUrl"
              value={form.siteUrl}
              onChange={handleChange}
              className={styles.form__input}
              placeholder="https://meuprojeto.com"
            />
          </div>
        </div>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.urlApp')}</label>
          <input
            type="url"
            name="aplicativoUrl"
            value={form.aplicativoUrl}
            onChange={handleChange}
            className={styles.form__input}
            placeholder="https://play.google.com/store/apps/..."
          />
        </div>

        {/* Imagens */}
        <h3 className={styles.form__secao}>{t('form.imagens')}</h3>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.imagemPrincipal')}</label>
          <div className={styles.form__upload}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemPrincipal}
              className={styles['form__upload-input']}
            />
            <div className={styles['form__upload-icone']}>
              <FiUpload />
            </div>
            <p className={styles['form__upload-texto']}>
              {t('form.cliqueArraste')}
            </p>
          </div>
          {previewPrincipal && (
            <div className={styles.form__preview}>
              <img
                src={previewPrincipal}
                alt="Preview"
                className={styles['form__preview-img']}
              />
            </div>
          )}
        </div>

        <div className={styles.form__grupo}>
          <label className={styles.form__label}>{t('form.galeriaImagens')}</label>
          <div className={styles.form__upload}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGaleria}
              className={styles['form__upload-input']}
            />
            <div className={styles['form__upload-icone']}>
              <FiUpload />
            </div>
            <p className={styles['form__upload-texto']}>
              {t('form.cliqueArrasteMultiplas')}
            </p>
          </div>
          {previewGaleria.length > 0 && (
            <div className={styles.form__preview}>
              {previewGaleria.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Galeria ${idx + 1}`}
                  className={styles['form__preview-img']}
                />
              ))}
            </div>
          )}
        </div>

        {/* Opções */}
        <h3 className={styles.form__secao}>{t('form.opcoes')}</h3>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div className={styles['form__checkbox-grupo']}>
            <input
              type="checkbox"
              id="publicado"
              name="publicado"
              checked={form.publicado}
              onChange={handleChange}
              className={styles.form__checkbox}
            />
            <label htmlFor="publicado" className={styles['form__checkbox-label']}>
              {t('form.publicado')}
            </label>
          </div>

          <div className={styles['form__checkbox-grupo']}>
            <input
              type="checkbox"
              id="destaque"
              name="destaque"
              checked={form.destaque}
              onChange={handleChange}
              className={styles.form__checkbox}
            />
            <label htmlFor="destaque" className={styles['form__checkbox-label']}>
              {t('form.destaqueInicial')}
            </label>
          </div>
        </div>

        {/* Ações */}
        <div className={styles.form__acoes}>
          <button
            type="submit"
            className="btn btn--primario"
            disabled={carregando}
          >
            <FiSave /> {carregando ? t('form.salvando') : editando ? t('form.atualizar') : t('form.criarProjeto')}
          </button>
          <button
            type="button"
            className="btn btn--secundario"
            onClick={() => navigate('/admin/projetos')}
          >
            {t('form.cancelar')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProjeto;
