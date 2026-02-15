// ============================================
// Componente de Rodapé
// ============================================
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useIdioma } from '../../contextos/IdiomaContexto';
import styles from './Rodape.module.css';

const Rodape = () => {
  const anoAtual = new Date().getFullYear();
  const { t } = useIdioma();

  return (
    <footer className={styles.rodape}>
      <div className={styles.rodape__container}>
        <p className={styles.rodape__texto}>
          &copy; {anoAtual} — Portfólio Vitor Lohan. {t('rodape.direitos')}
        </p>
        <div className={styles.rodape__links}>
          <a
            href="https://github.com/vitorlohan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.rodape__link}
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/vitorlohan"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.rodape__link}
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="mailto:vitorlohanrj@gmail.com"
            className={styles.rodape__link}
            aria-label="Email"
          >
            <FiMail />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
