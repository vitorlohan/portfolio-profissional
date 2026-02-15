// ============================================
// Componente de Rota Protegida (Admin)
// ============================================
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contextos/AuthContexto';

interface Props {
  children: React.ReactNode;
}

const RotaProtegida = ({ children }: Props) => {
  const { estaAutenticado, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="loader" style={{ minHeight: '100vh' }}>
        <div className="loader__spinner" />
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default RotaProtegida;
