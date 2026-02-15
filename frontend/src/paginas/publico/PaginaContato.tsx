// ============================================
// Página de Contato (dedicada)
// ============================================
import { useEffect, useState } from 'react';
import { perfilServico } from '../../servicos/perfilServico';
import SecaoContato from '../../componentes/secoes/SecaoContato';
import type { Perfil } from '../../tipos';

const PaginaContato = () => {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await perfilServico.obter();
        setPerfil(dados);
      } catch (erro) {
        console.error('Erro ao carregar perfil:', erro);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  if (carregando) {
    return (
      <div className="loader">
        <div className="loader__spinner" />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '2rem' }}>
      <SecaoContato contato={perfil?.contato || null} />
    </div>
  );
};

export default PaginaContato;
