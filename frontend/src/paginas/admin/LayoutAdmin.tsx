// ============================================
// Layout do Painel Administrativo
// ============================================
import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiFolder,
  FiPlusCircle,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiArrowLeft,
} from 'react-icons/fi';
import { useAuth } from '../../contextos/AuthContexto';
import { useIdioma } from '../../contextos/IdiomaContexto';
import styles from './LayoutAdmin.module.css';

const LayoutAdmin = () => {
  const { logout, usuario } = useAuth();
  const { t } = useIdioma();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const links = [
    { caminho: '/admin', label: t('admin.dashboard'), icone: <FiHome /> },
    { caminho: '/admin/projetos', label: t('admin.projetos'), icone: <FiFolder /> },
    { caminho: '/admin/projetos/novo', label: t('admin.novoProjeto'), icone: <FiPlusCircle /> },
    { caminho: '/admin/perfil', label: t('admin.perfil'), icone: <FiUser /> },
  ];

  return (
    <div className={styles['admin-layout']}>
      {/* Botão menu mobile */}
      <button
        className={styles['admin-menu-btn']}
        onClick={() => setSidebarAberta(!sidebarAberta)}
      >
        {sidebarAberta ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${styles['admin-sidebar']} ${
          sidebarAberta ? styles['admin-sidebar--aberto'] : ''
        }`}
      >
        <div className={styles['admin-sidebar__header']}>
          <div className={styles['admin-sidebar__logo']}>
            <span>Admin</span> {t('admin.painel')}
          </div>
          <p className={styles['admin-sidebar__subtitle']}>
            {usuario?.nome || 'Administrador'}
          </p>
        </div>

        <nav className={styles['admin-sidebar__nav']}>
          {links.map((link) => (
            <Link
              key={link.caminho}
              to={link.caminho}
              className={`${styles['admin-sidebar__link']} ${
                pathname === link.caminho
                  ? styles['admin-sidebar__link--ativo']
                  : ''
              }`}
              onClick={() => setSidebarAberta(false)}
            >
              {link.icone} {link.label}
            </Link>
          ))}

          <Link
            to="/"
            className={styles['admin-sidebar__link']}
            target="_blank"
          >
            <FiArrowLeft /> {t('admin.verPortfolio')}
          </Link>
        </nav>

        <div className={styles['admin-sidebar__footer']}>
          <button
            className={styles['admin-sidebar__sair']}
            onClick={handleLogout}
          >
            <FiLogOut /> {t('admin.sair')}
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className={styles['admin-conteudo']}>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
