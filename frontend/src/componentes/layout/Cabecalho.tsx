// ============================================
// Componente de Cabeçalho / Navbar
// ============================================
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTema } from '../../contextos/TemaContexto';
import { useIdioma } from '../../contextos/IdiomaContexto';
import SeletorIdioma from '../comum/SeletorIdioma';
import styles from './Cabecalho.module.css';

const Cabecalho = () => {
  const { tema, alternarTema } = useTema();
  const { t } = useIdioma();
  const { pathname } = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { caminho: '/', label: t('nav.inicio') },
    { caminho: '/projetos', label: t('nav.projetos') },
    { caminho: '/contato', label: t('nav.contato') },
  ];

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className={styles.cabecalho}>
      <div className={styles.cabecalho__container}>
        <Link to="/" className={styles.cabecalho__logo}>
          {'<'}
          <span>Dev</span>
          {'/>'}
        </Link>

        <nav
          className={`${styles.cabecalho__nav} ${
            menuAberto ? styles['cabecalho__nav--aberto'] : ''
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.caminho}
              to={link.caminho}
              className={`${styles.cabecalho__link} ${
                pathname === link.caminho ? styles['cabecalho__link--ativo'] : ''
              }`}
              onClick={fecharMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cabecalho__acoes}>
          <SeletorIdioma />
          <button
            className={styles['cabecalho__btn-tema']}
            onClick={alternarTema}
            aria-label={t('nav.alternarTema')}
          >
            {tema === 'claro' ? <FiMoon /> : <FiSun />}
          </button>

          <button
            className={styles['cabecalho__menu-btn']}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Menu"
          >
            {menuAberto ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Cabecalho;
