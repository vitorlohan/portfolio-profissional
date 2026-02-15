// ============================================
// Página Inicial
// ============================================
import { useEffect, useState } from 'react';
import { perfilServico } from '../../servicos/perfilServico';
import SecaoHero from '../../componentes/secoes/SecaoHero';
import SecaoHabilidades from '../../componentes/secoes/SecaoHabilidades';
import SecaoProjetosDestaque from '../../componentes/secoes/SecaoProjetosDestaque';
import SecaoPublicacoes from '../../componentes/secoes/SecaoPublicacoes';
import SecaoContato from '../../componentes/secoes/SecaoContato';
import type { Perfil } from '../../tipos';

const PaginaInicial = () => {
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
    <>
      <SecaoHero perfil={perfil} />
      <SecaoHabilidades habilidades={perfil?.habilidades || []} />
      <SecaoProjetosDestaque />
      <SecaoPublicacoes publicacoes={perfil?.publicacoes || []} />
      <SecaoContato contato={perfil?.contato || null} />
    </>
  );
};

export default PaginaInicial;
