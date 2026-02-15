// ============================================
// Configuração de Rotas da Aplicação
// ============================================
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contextos
import { AuthProvider } from './contextos/AuthContexto';
import { TemaProvider } from './contextos/TemaContexto';
import { IdiomaProvider } from './contextos/IdiomaContexto';

// Layouts
import LayoutPrincipal from './componentes/layout/LayoutPrincipal';

// Páginas públicas
import PaginaInicial from './paginas/publico/PaginaInicial';
import PaginaProjetos from './paginas/publico/PaginaProjetos';
import PaginaDetalheProjeto from './paginas/publico/PaginaDetalheProjeto';
import PaginaContato from './paginas/publico/PaginaContato';

// Páginas admin
import PaginaLogin from './paginas/admin/PaginaLogin';
import LayoutAdmin from './paginas/admin/LayoutAdmin';
import AdminDashboard from './paginas/admin/AdminDashboard';
import AdminProjetos from './paginas/admin/AdminProjetos';
import FormProjeto from './paginas/admin/FormProjeto';
import AdminPerfil from './paginas/admin/AdminPerfil';

// Componentes
import RotaProtegida from './componentes/auth/RotaProtegida';

const App = () => {
  return (
    <IdiomaProvider>
    <TemaProvider>
      <AuthProvider>
        <BrowserRouter basename="/portfolio-profissional">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '10px',
                background: 'var(--cor-fundo-card)',
                color: 'var(--cor-texto)',
                border: '1px solid var(--cor-borda)',
              },
            }}
          />

          <Routes>
            {/* ---- Rotas Públicas ---- */}
            <Route element={<LayoutPrincipal />}>
              <Route path="/" element={<PaginaInicial />} />
              <Route path="/projetos" element={<PaginaProjetos />} />
              <Route path="/projetos/:categoria" element={<PaginaProjetos />} />
              <Route path="/projeto/:slug" element={<PaginaDetalheProjeto />} />
              <Route path="/contato" element={<PaginaContato />} />
            </Route>

            {/* ---- Login Admin ---- */}
            <Route path="/admin/login" element={<PaginaLogin />} />

            {/* ---- Rotas Protegidas (Admin) ---- */}
            <Route
              path="/admin"
              element={
                <RotaProtegida>
                  <LayoutAdmin />
                </RotaProtegida>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="projetos" element={<AdminProjetos />} />
              <Route path="projetos/novo" element={<FormProjeto />} />
              <Route path="projetos/editar/:id" element={<FormProjeto />} />
              <Route path="perfil" element={<AdminPerfil />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TemaProvider>
    </IdiomaProvider>
  );
};

export default App;
