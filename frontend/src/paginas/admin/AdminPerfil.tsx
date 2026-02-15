// ============================================
// Página Admin - Editar Perfil
// ============================================
import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { perfilServico } from '../../servicos/perfilServico';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Habilidade } from '../../tipos';
import styles from './AdminPerfil.module.css';

interface FormContato {
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

const AdminPerfil = () => {
  const [nome, setNome] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricaoCurta, setDescricaoCurta] = useState('');
  const [descricaoCompleta, setDescricaoCompleta] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [contato, setContato] = useState<FormContato>({
    email: '',
    whatsapp: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const { t } = useIdioma();

  useEffect(() => {
    const carregar = async () => {
      try {
        const perfil = await perfilServico.obter();
        setNome(perfil.nome || '');
        setTitulo(perfil.titulo || '');
        setDescricaoCurta(perfil.descricaoCurta || '');
        setDescricaoCompleta(perfil.descricaoCompleta || '');
        setTecnologias(perfil.tecnologiasDominadas?.join(', ') || '');
        setHabilidades(perfil.habilidades || []);
        if (perfil.contato) {
          setContato({
            email: perfil.contato.email || '',
            whatsapp: perfil.contato.whatsapp || '',
            github: perfil.contato.github || '',
            linkedin: perfil.contato.linkedin || '',
            twitter: perfil.contato.twitter || '',
            website: perfil.contato.website || '',
          });
        }
        if (perfil.avatar) {
          setPreviewAvatar(perfil.avatar);
        }
      } catch {
        toast.error(t('perfil.erroCarregar'));
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  const adicionarHabilidade = () => {
    setHabilidades((prev) => [
      ...prev,
      { nome: '', porcentagem: 50, categoria: 'geral' },
    ]);
  };

  const removerHabilidade = (idx: number) => {
    setHabilidades((prev) => prev.filter((_, i) => i !== idx));
  };

  const atualizarHabilidade = (
    idx: number,
    campo: keyof Habilidade,
    valor: string | number
  ) => {
    setHabilidades((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [campo]: valor } : h))
    );
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSalvando(true);

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('titulo', titulo);
      formData.append('descricaoCurta', descricaoCurta);
      formData.append('descricaoCompleta', descricaoCompleta);
      formData.append('tecnologiasDominadas', tecnologias);
      formData.append('habilidades', JSON.stringify(habilidades));
      formData.append('contato', JSON.stringify(contato));

      if (avatar) {
        formData.append('avatar', avatar);
      }

      await perfilServico.atualizar(formData);
      toast.success(t('perfil.atualizado'));
    } catch {
      toast.error(t('perfil.erroSalvar'));
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <div className="loader">
        <div className="loader__spinner" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="secao__titulo" style={{ marginBottom: '1.5rem' }}>
        {t('perfil.titulo')}
      </h1>

      <form className={styles['perfil-admin__form']} onSubmit={handleSubmit}>
        {/* Informações básicas */}
        <h3 className={styles['perfil-admin__secao']}>{t('perfil.infoPessoais')}</h3>

        <div className={styles['perfil-admin__row']}>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.nome')}</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={styles['perfil-admin__input']}
              placeholder="Seu nome"
            />
          </div>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.tituloProf')}</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={styles['perfil-admin__input']}
              placeholder="Desenvolvedor Full Stack"
            />
          </div>
        </div>

        <div className={styles['perfil-admin__grupo']}>
          <label className={styles['perfil-admin__label']}>{t('perfil.descCurta')}</label>
          <textarea
            value={descricaoCurta}
            onChange={(e) => setDescricaoCurta(e.target.value)}
            className={styles['perfil-admin__textarea']}
            placeholder="Uma breve descrição sobre você"
            style={{ minHeight: '80px' }}
          />
        </div>

        <div className={styles['perfil-admin__grupo']}>
          <label className={styles['perfil-admin__label']}>{t('perfil.descCompleta')}</label>
          <textarea
            value={descricaoCompleta}
            onChange={(e) => setDescricaoCompleta(e.target.value)}
            className={styles['perfil-admin__textarea']}
            placeholder="Descrição detalhada"
            style={{ minHeight: '120px' }}
          />
        </div>

        <div className={styles['perfil-admin__grupo']}>
          <label className={styles['perfil-admin__label']}>{t('perfil.tecDominadas')}</label>
          <input
            type="text"
            value={tecnologias}
            onChange={(e) => setTecnologias(e.target.value)}
            className={styles['perfil-admin__input']}
            placeholder="JavaScript, React, Node.js (separadas por vírgula)"
          />
        </div>

        {/* Avatar */}
        <div className={styles['perfil-admin__grupo']}>
          <label className={styles['perfil-admin__label']}>{t('perfil.avatar')}</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {previewAvatar && (
            <img
              src={previewAvatar}
              alt="Avatar preview"
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                objectFit: 'cover',
                marginTop: '0.5rem',
              }}
            />
          )}
        </div>

        {/* Habilidades */}
        <h3 className={styles['perfil-admin__secao']}>{t('perfil.habilidades')}</h3>

        {habilidades.map((hab, idx) => (
          <div key={idx} className={styles['perfil-admin__habilidade']}>
            <input
              type="text"
              value={hab.nome}
              onChange={(e) => atualizarHabilidade(idx, 'nome', e.target.value)}
              placeholder={t('perfil.nomeHabilidade')}
            />
            <input
              type="number"
              value={hab.porcentagem}
              onChange={(e) =>
                atualizarHabilidade(idx, 'porcentagem', parseInt(e.target.value) || 0)
              }
              min="0"
              max="100"
              placeholder="%"
            />
            <input
              type="text"
              value={hab.categoria}
              onChange={(e) =>
                atualizarHabilidade(idx, 'categoria', e.target.value)
              }
              placeholder={t('perfil.categoriaHab')}
            />
            <button
              type="button"
              className={styles['perfil-admin__remover-btn']}
              onClick={() => removerHabilidade(idx)}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn--secundario btn--pequeno"
          onClick={adicionarHabilidade}
          style={{ marginTop: '0.5rem' }}
        >
          <FiPlus /> {t('perfil.adicionarHab')}
        </button>

        {/* Contato */}
        <h3 className={styles['perfil-admin__secao']}>{t('perfil.contato')}</h3>

        <div className={styles['perfil-admin__row']}>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.email')}</label>
            <input
              type="email"
              value={contato.email}
              onChange={(e) =>
                setContato((prev) => ({ ...prev, email: e.target.value }))
              }
              className={styles['perfil-admin__input']}
              placeholder="seu@email.com"
            />
          </div>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.whatsapp')}</label>
            <input
              type="text"
              value={contato.whatsapp}
              onChange={(e) =>
                setContato((prev) => ({ ...prev, whatsapp: e.target.value }))
              }
              className={styles['perfil-admin__input']}
              placeholder="+55 11 99999-9999"
            />
          </div>
        </div>

        <div className={styles['perfil-admin__row']}>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.github')}</label>
            <input
              type="text"
              value={contato.github}
              onChange={(e) =>
                setContato((prev) => ({ ...prev, github: e.target.value }))
              }
              className={styles['perfil-admin__input']}
              placeholder="seuusuario"
            />
          </div>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.linkedin')}</label>
            <input
              type="text"
              value={contato.linkedin}
              onChange={(e) =>
                setContato((prev) => ({ ...prev, linkedin: e.target.value }))
              }
              className={styles['perfil-admin__input']}
              placeholder="seuusuario"
            />
          </div>
        </div>

        <div className={styles['perfil-admin__row']}>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.twitter')}</label>
            <input
              type="text"
              value={contato.twitter}
              onChange={(e) =>
                setContato((prev) => ({ ...prev, twitter: e.target.value }))
              }
              className={styles['perfil-admin__input']}
              placeholder="seuusuario"
            />
          </div>
          <div className={styles['perfil-admin__grupo']}>
            <label className={styles['perfil-admin__label']}>{t('perfil.website')}</label>
            <input
              type="url"
              value={contato.website}
              onChange={(e) =>
                setContato((prev) => ({ ...prev, website: e.target.value }))
              }
              className={styles['perfil-admin__input']}
              placeholder="https://seusite.com"
            />
          </div>
        </div>

        {/* Salvar */}
        <div style={{ marginTop: '2rem' }}>
          <button
            type="submit"
            className="btn btn--primario"
            disabled={salvando}
          >
            <FiSave /> {salvando ? t('perfil.salvando') : t('perfil.salvar')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPerfil;
