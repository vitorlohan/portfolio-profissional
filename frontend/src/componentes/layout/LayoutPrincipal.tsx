// ============================================
// Layout principal da aplicação pública
// ============================================
import { Outlet } from 'react-router-dom';
import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

const LayoutPrincipal = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Cabecalho />
      <main style={{ flex: 1, marginTop: '70px' }}>
        <Outlet />
      </main>
      <Rodape />
    </div>
  );
};

export default LayoutPrincipal;
