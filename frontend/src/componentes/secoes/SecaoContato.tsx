// ============================================
// Seção de Contato
// ============================================
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiGlobe,
  FiMessageCircle,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useIdioma } from '../../contextos/IdiomaContexto';
import type { Contato } from '../../tipos';
import styles from './SecaoContato.module.css';

interface Props {
  contato: Contato | null;
}

const SecaoContato = ({ contato }: Props) => {
  const { t } = useIdioma();
  if (!contato) return null;

  // Montar links de contato disponíveis
  const links = [
    {
      url: contato.whatsapp ? `https://wa.me/${contato.whatsapp.replace(/\D/g, '')}` : '',
      label: 'WhatsApp',
      valor: contato.whatsapp,
      icone: <FaWhatsapp />,
    },
    {
      url: contato.github ? `https://github.com/${contato.github}` : '',
      label: 'GitHub',
      valor: contato.github,
      icone: <FiGithub />,
    },
    {
      url: contato.linkedin ? `https://linkedin.com/in/${contato.linkedin}` : '',
      label: 'LinkedIn',
      valor: contato.linkedin,
      icone: <FiLinkedin />,
    },
    {
      url: contato.email ? `mailto:${contato.email}` : '',
      label: 'Email',
      valor: contato.email,
      icone: <FiMail />,
    },
    {
      url: contato.twitter ? `https://twitter.com/${contato.twitter}` : '',
      label: 'Twitter',
      valor: contato.twitter,
      icone: <FiMessageCircle />,
    },
    {
      url: contato.website || '',
      label: 'Website',
      valor: contato.website,
      icone: <FiGlobe />,
    },
  ].filter((l) => l.valor);

  return (
    <section className={styles.contato}>
      <div className={styles.contato__container}>
        <h2 className="secao__titulo">{t('contato.titulo')}</h2>
        <p className="secao__subtitulo">
          {t('contato.subtitulo')}
        </p>

        <div className={styles.contato__grid}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contato__item}
            >
              <span className={styles.contato__icone}>{link.icone}</span>
              <span className={styles.contato__label}>{link.label}</span>
              <span className={styles.contato__valor}>{link.valor}</span>
            </a>
          ))}

          {/* Links extras */}
          {contato.outros?.map((outro) => (
            <a
              key={outro.nome}
              href={outro.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contato__item}
            >
              <span className={styles.contato__icone}>
                <FiGlobe />
              </span>
              <span className={styles.contato__label}>{outro.nome}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecaoContato;
