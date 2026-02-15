// ============================================
// Sistema de Internacionalização (i18n)
// Traduções para PT-BR, EN-US, ES-ES, ZH-CN
// ============================================

export type Idioma = 'pt-BR' | 'en-US' | 'es-ES' | 'zh-CN';

export interface IdiomaInfo {
  codigo: Idioma;
  nome: string;
  bandeira: string;
}

export const idiomasDisponiveis: IdiomaInfo[] = [
  { codigo: 'pt-BR', nome: 'Português (Brasil)', bandeira: '🇧🇷' },
  { codigo: 'en-US', nome: 'English (US)', bandeira: '🇺🇸' },
  { codigo: 'es-ES', nome: 'Español (España)', bandeira: '🇪🇸' },
  { codigo: 'zh-CN', nome: '中文 (简体)', bandeira: '🇨🇳' },
];

type Traducoes = Record<Idioma, Record<string, string>>;

export const traducoes: Traducoes = {
  'pt-BR': {
    // ---- Navegação ----
    'nav.inicio': 'Início',
    'nav.projetos': 'Projetos',
    'nav.contato': 'Contato',
    'nav.alternarTema': 'Alternar tema',

    // ---- Hero ----
    'hero.saudacao': 'Olá, eu sou',
    'hero.verProjetos': 'Ver Projetos',
    'hero.contato': 'Contato',

    // ---- Habilidades ----
    'habilidades.titulo': 'Habilidades',
    'habilidades.subtitulo': 'Tecnologias e ferramentas que domino',

    // ---- Contato (seção) ----
    'contato.titulo': 'Contato',
    'contato.subtitulo': 'Entre em contato comigo através dos canais abaixo',

    // ---- Projetos Destaque ----
    'destaque.titulo': 'Projetos em Destaque',
    'destaque.subtitulo': 'Alguns dos meus melhores trabalhos',
    'destaque.verTodos': 'Ver Todos os Projetos',

    // ---- Publicações ----
    'publicacoes.titulo': 'Publicações & Pacotes',
    'publicacoes.subtitulo': 'Conteúdos e pacotes que criei e publiquei',
    'publicacoes.pacote': 'Pacote',
    'publicacoes.artigo': 'Artigo',
    'publicacoes.video': 'Vídeo',
    'publicacoes.outro': 'Outro',

    // ---- Página de Projetos ----
    'projetos.titulo': 'Projetos',
    'projetos.subtitulo': 'Explore meus projetos por categoria',
    'projetos.todos': 'Todos',
    'projetos.pacotes': 'Pacotes',
    'projetos.scripts': 'Scripts',
    'projetos.sistemas': 'Sistemas',
    'projetos.websites': 'Websites',
    'projetos.aplicativos': 'Aplicativos',
    'projetos.buscar': 'Buscar projetos...',
    'projetos.nenhum': 'Nenhum projeto encontrado',
    'projetos.tentarOutra': 'Tente outra categoria ou busca.',
    'projetos.anterior': 'Anterior',
    'projetos.proxima': 'Próxima',

    // ---- Card Projeto ----
    'card.verProjeto': 'Ver projeto',
    'card.destaque': '★ Destaque',

    // ---- Detalhe Projeto ----
    'detalhe.voltar': 'Voltar aos projetos',
    'detalhe.naoEncontrado': 'Projeto não encontrado.',
    'detalhe.visualizacoes': 'visualizações',
    'detalhe.descricao': 'Descrição',
    'detalhe.funcionalidades': 'Funcionalidades',
    'detalhe.desafios': 'Desafios',
    'detalhe.solucoes': 'Soluções',
    'detalhe.galeria': 'Galeria',
    'detalhe.links': 'Links',
    'detalhe.repositorio': 'Repositório',
    'detalhe.site': 'Site',
    'detalhe.aplicativo': 'Aplicativo',

    // ---- Modal Imagem ----
    'modal.fechar': 'Fechar',
    'modal.anterior': 'Anterior',
    'modal.proxima': 'Próxima',
    'modal.de': 'de',

    // ---- Rodapé ----
    'rodape.direitos': 'Todos os direitos reservados.',

    // ---- Login ----
    'login.titulo': 'Painel Admin',
    'login.subtitulo': 'Faça login para gerenciar seu portfólio',
    'login.email': 'Email',
    'login.senha': 'Senha',
    'login.entrar': 'Entrar',
    'login.entrando': 'Entrando...',
    'login.voltar': '← Voltar ao portfólio',
    'login.erroLogin': 'Erro ao fazer login.',

    // ---- Admin Layout ----
    'admin.painel': 'Admin Painel',
    'admin.dashboard': 'Dashboard',
    'admin.projetos': 'Projetos',
    'admin.novoProjeto': 'Novo Projeto',
    'admin.perfil': 'Perfil',
    'admin.verPortfolio': 'Ver Portfólio',
    'admin.sair': 'Sair',

    // ---- Admin Dashboard ----
    'dashboard.titulo': 'Dashboard',
    'dashboard.publicados': 'Publicados',
    'dashboard.rascunhos': 'Rascunhos',
    'dashboard.emDestaque': 'Em Destaque',
    'dashboard.visualizacoes': 'Visualizações',
    'dashboard.recentes': 'Projetos Recentes',
    'dashboard.nome': 'Nome',
    'dashboard.categoria': 'Categoria',
    'dashboard.status': 'Status',
    'dashboard.views': 'Views',
    'dashboard.publicado': 'Publicado',
    'dashboard.rascunho': 'Rascunho',
    'dashboard.nenhumProjeto': 'Nenhum projeto cadastrado ainda.',

    // ---- Admin Projetos ----
    'adminProjetos.buscar': 'Buscar...',
    'adminProjetos.novo': 'Novo',
    'adminProjetos.editar': 'Editar',
    'adminProjetos.nenhum': 'Nenhum projeto encontrado.',
    'adminProjetos.pagina': 'Página',
    'adminProjetos.de': 'de',
    'adminProjetos.confirmarRemover': 'Remover o projeto',
    'adminProjetos.removido': 'Projeto removido!',
    'adminProjetos.erroCarregar': 'Erro ao carregar projetos',
    'adminProjetos.erroRemover': 'Erro ao remover projeto',

    // ---- Form Projeto ----
    'form.voltar': 'Voltar',
    'form.editarProjeto': 'Editar Projeto',
    'form.novoProjeto': 'Novo Projeto',
    'form.infoBasicas': 'Informações Básicas',
    'form.nomeProjeto': 'Nome do Projeto',
    'form.categoria': 'Categoria',
    'form.resumoCurto': 'Resumo Curto',
    'form.descCompleta': 'Descrição Completa',
    'form.tecTags': 'Tecnologias e Tags',
    'form.tecnologias': 'Tecnologias Usadas',
    'form.tags': 'Tags',
    'form.separarVirgula': 'Separe por vírgulas',
    'form.detalhes': 'Detalhes do Projeto',
    'form.funcionalidades': 'Funcionalidades',
    'form.umaPorLinha': 'Uma por linha',
    'form.desafios': 'Desafios',
    'form.solucoes': 'Soluções',
    'form.linksExternos': 'Links Externos',
    'form.urlGithub': 'URL do GitHub',
    'form.urlSite': 'URL do Site',
    'form.urlApp': 'URL do Aplicativo',
    'form.imagens': 'Imagens',
    'form.imagemPrincipal': 'Imagem Principal',
    'form.galeriaImagens': 'Galeria de Imagens',
    'form.cliqueArraste': 'Clique ou arraste uma imagem',
    'form.cliqueArrasteMultiplas': 'Clique ou arraste múltiplas imagens',
    'form.opcoes': 'Opções',
    'form.publicado': 'Publicado',
    'form.destaqueInicial': 'Destacar na página inicial',
    'form.salvando': 'Salvando...',
    'form.atualizar': 'Atualizar',
    'form.criarProjeto': 'Criar Projeto',
    'form.cancelar': 'Cancelar',
    'form.projetoAtualizado': 'Projeto atualizado!',
    'form.projetoCriado': 'Projeto criado!',
    'form.erroSalvar': 'Erro ao salvar projeto',
    'form.erroCarregar': 'Erro ao carregar projeto',

    // ---- Admin Perfil ----
    'perfil.titulo': 'Editar Perfil',
    'perfil.infoPessoais': 'Informações Pessoais',
    'perfil.nome': 'Nome',
    'perfil.tituloProf': 'Título',
    'perfil.descCurta': 'Descrição Curta',
    'perfil.descCompleta': 'Descrição Completa',
    'perfil.tecDominadas': 'Tecnologias Dominadas',
    'perfil.avatar': 'Avatar',
    'perfil.habilidades': 'Habilidades',
    'perfil.nomeHabilidade': 'Nome da habilidade',
    'perfil.categoriaHab': 'Categoria',
    'perfil.adicionarHab': 'Adicionar Habilidade',
    'perfil.contato': 'Contato',
    'perfil.email': 'Email',
    'perfil.whatsapp': 'WhatsApp',
    'perfil.github': 'GitHub (usuário)',
    'perfil.linkedin': 'LinkedIn (usuário)',
    'perfil.twitter': 'Twitter (usuário)',
    'perfil.website': 'Website',
    'perfil.salvar': 'Salvar Perfil',
    'perfil.salvando': 'Salvando...',
    'perfil.atualizado': 'Perfil atualizado!',
    'perfil.erroCarregar': 'Erro ao carregar perfil',
    'perfil.erroSalvar': 'Erro ao salvar perfil',

    // ---- Geral ----
    'geral.carregando': 'Carregando...',
    'geral.erro': 'Erro',
  },

  'en-US': {
    // ---- Navigation ----
    'nav.inicio': 'Home',
    'nav.projetos': 'Projects',
    'nav.contato': 'Contact',
    'nav.alternarTema': 'Toggle theme',

    // ---- Hero ----
    'hero.saudacao': "Hello, I'm",
    'hero.verProjetos': 'View Projects',
    'hero.contato': 'Contact',

    // ---- Skills ----
    'habilidades.titulo': 'Skills',
    'habilidades.subtitulo': 'Technologies and tools I master',

    // ---- Contact (section) ----
    'contato.titulo': 'Contact',
    'contato.subtitulo': 'Get in touch through the channels below',

    // ---- Featured Projects ----
    'destaque.titulo': 'Featured Projects',
    'destaque.subtitulo': 'Some of my best work',
    'destaque.verTodos': 'View All Projects',

    // ---- Publications ----
    'publicacoes.titulo': 'Publications & Packages',
    'publicacoes.subtitulo': 'Content and packages I created and published',
    'publicacoes.pacote': 'Package',
    'publicacoes.artigo': 'Article',
    'publicacoes.video': 'Video',
    'publicacoes.outro': 'Other',

    // ---- Projects Page ----
    'projetos.titulo': 'Projects',
    'projetos.subtitulo': 'Explore my projects by category',
    'projetos.todos': 'All',
    'projetos.pacotes': 'Packages',
    'projetos.scripts': 'Scripts',
    'projetos.sistemas': 'Systems',
    'projetos.websites': 'Websites',
    'projetos.aplicativos': 'Apps',
    'projetos.buscar': 'Search projects...',
    'projetos.nenhum': 'No projects found',
    'projetos.tentarOutra': 'Try another category or search.',
    'projetos.anterior': 'Previous',
    'projetos.proxima': 'Next',

    // ---- Project Card ----
    'card.verProjeto': 'View project',
    'card.destaque': '★ Featured',

    // ---- Project Detail ----
    'detalhe.voltar': 'Back to projects',
    'detalhe.naoEncontrado': 'Project not found.',
    'detalhe.visualizacoes': 'views',
    'detalhe.descricao': 'Description',
    'detalhe.funcionalidades': 'Features',
    'detalhe.desafios': 'Challenges',
    'detalhe.solucoes': 'Solutions',
    'detalhe.galeria': 'Gallery',
    'detalhe.links': 'Links',
    'detalhe.repositorio': 'Repository',
    'detalhe.site': 'Website',
    'detalhe.aplicativo': 'App',

    // ---- Image Modal ----
    'modal.fechar': 'Close',
    'modal.anterior': 'Previous',
    'modal.proxima': 'Next',
    'modal.de': 'of',

    // ---- Footer ----
    'rodape.direitos': 'All rights reserved.',

    // ---- Login ----
    'login.titulo': 'Admin Panel',
    'login.subtitulo': 'Sign in to manage your portfolio',
    'login.email': 'Email',
    'login.senha': 'Password',
    'login.entrar': 'Sign In',
    'login.entrando': 'Signing in...',
    'login.voltar': '← Back to portfolio',
    'login.erroLogin': 'Login failed.',

    // ---- Admin Layout ----
    'admin.painel': 'Admin Panel',
    'admin.dashboard': 'Dashboard',
    'admin.projetos': 'Projects',
    'admin.novoProjeto': 'New Project',
    'admin.perfil': 'Profile',
    'admin.verPortfolio': 'View Portfolio',
    'admin.sair': 'Sign Out',

    // ---- Admin Dashboard ----
    'dashboard.titulo': 'Dashboard',
    'dashboard.publicados': 'Published',
    'dashboard.rascunhos': 'Drafts',
    'dashboard.emDestaque': 'Featured',
    'dashboard.visualizacoes': 'Views',
    'dashboard.recentes': 'Recent Projects',
    'dashboard.nome': 'Name',
    'dashboard.categoria': 'Category',
    'dashboard.status': 'Status',
    'dashboard.views': 'Views',
    'dashboard.publicado': 'Published',
    'dashboard.rascunho': 'Draft',
    'dashboard.nenhumProjeto': 'No projects yet.',

    // ---- Admin Projects ----
    'adminProjetos.buscar': 'Search...',
    'adminProjetos.novo': 'New',
    'adminProjetos.editar': 'Edit',
    'adminProjetos.nenhum': 'No projects found.',
    'adminProjetos.pagina': 'Page',
    'adminProjetos.de': 'of',
    'adminProjetos.confirmarRemover': 'Remove project',
    'adminProjetos.removido': 'Project removed!',
    'adminProjetos.erroCarregar': 'Failed to load projects',
    'adminProjetos.erroRemover': 'Failed to remove project',

    // ---- Project Form ----
    'form.voltar': 'Back',
    'form.editarProjeto': 'Edit Project',
    'form.novoProjeto': 'New Project',
    'form.infoBasicas': 'Basic Information',
    'form.nomeProjeto': 'Project Name',
    'form.categoria': 'Category',
    'form.resumoCurto': 'Short Summary',
    'form.descCompleta': 'Full Description',
    'form.tecTags': 'Technologies and Tags',
    'form.tecnologias': 'Technologies Used',
    'form.tags': 'Tags',
    'form.separarVirgula': 'Separate with commas',
    'form.detalhes': 'Project Details',
    'form.funcionalidades': 'Features',
    'form.umaPorLinha': 'One per line',
    'form.desafios': 'Challenges',
    'form.solucoes': 'Solutions',
    'form.linksExternos': 'External Links',
    'form.urlGithub': 'GitHub URL',
    'form.urlSite': 'Website URL',
    'form.urlApp': 'App URL',
    'form.imagens': 'Images',
    'form.imagemPrincipal': 'Main Image',
    'form.galeriaImagens': 'Image Gallery',
    'form.cliqueArraste': 'Click or drag an image',
    'form.cliqueArrasteMultiplas': 'Click or drag multiple images',
    'form.opcoes': 'Options',
    'form.publicado': 'Published',
    'form.destaqueInicial': 'Feature on homepage',
    'form.salvando': 'Saving...',
    'form.atualizar': 'Update',
    'form.criarProjeto': 'Create Project',
    'form.cancelar': 'Cancel',
    'form.projetoAtualizado': 'Project updated!',
    'form.projetoCriado': 'Project created!',
    'form.erroSalvar': 'Failed to save project',
    'form.erroCarregar': 'Failed to load project',

    // ---- Admin Profile ----
    'perfil.titulo': 'Edit Profile',
    'perfil.infoPessoais': 'Personal Information',
    'perfil.nome': 'Name',
    'perfil.tituloProf': 'Title',
    'perfil.descCurta': 'Short Description',
    'perfil.descCompleta': 'Full Description',
    'perfil.tecDominadas': 'Mastered Technologies',
    'perfil.avatar': 'Avatar',
    'perfil.habilidades': 'Skills',
    'perfil.nomeHabilidade': 'Skill name',
    'perfil.categoriaHab': 'Category',
    'perfil.adicionarHab': 'Add Skill',
    'perfil.contato': 'Contact',
    'perfil.email': 'Email',
    'perfil.whatsapp': 'WhatsApp',
    'perfil.github': 'GitHub (username)',
    'perfil.linkedin': 'LinkedIn (username)',
    'perfil.twitter': 'Twitter (username)',
    'perfil.website': 'Website',
    'perfil.salvar': 'Save Profile',
    'perfil.salvando': 'Saving...',
    'perfil.atualizado': 'Profile updated!',
    'perfil.erroCarregar': 'Failed to load profile',
    'perfil.erroSalvar': 'Failed to save profile',

    // ---- General ----
    'geral.carregando': 'Loading...',
    'geral.erro': 'Error',
  },

  'es-ES': {
    // ---- Navegación ----
    'nav.inicio': 'Inicio',
    'nav.projetos': 'Proyectos',
    'nav.contato': 'Contacto',
    'nav.alternarTema': 'Cambiar tema',

    // ---- Hero ----
    'hero.saudacao': 'Hola, soy',
    'hero.verProjetos': 'Ver Proyectos',
    'hero.contato': 'Contacto',

    // ---- Habilidades ----
    'habilidades.titulo': 'Habilidades',
    'habilidades.subtitulo': 'Tecnologías y herramientas que domino',

    // ---- Contacto (sección) ----
    'contato.titulo': 'Contacto',
    'contato.subtitulo': 'Contáctame a través de los canales de abajo',

    // ---- Proyectos Destacados ----
    'destaque.titulo': 'Proyectos Destacados',
    'destaque.subtitulo': 'Algunos de mis mejores trabajos',
    'destaque.verTodos': 'Ver Todos los Proyectos',

    // ---- Publicaciones ----
    'publicacoes.titulo': 'Publicaciones y Paquetes',
    'publicacoes.subtitulo': 'Contenidos y paquetes que creé y publiqué',
    'publicacoes.pacote': 'Paquete',
    'publicacoes.artigo': 'Artículo',
    'publicacoes.video': 'Vídeo',
    'publicacoes.outro': 'Otro',

    // ---- Página de Proyectos ----
    'projetos.titulo': 'Proyectos',
    'projetos.subtitulo': 'Explora mis proyectos por categoría',
    'projetos.todos': 'Todos',
    'projetos.pacotes': 'Paquetes',
    'projetos.scripts': 'Scripts',
    'projetos.sistemas': 'Sistemas',
    'projetos.websites': 'Sitios Web',
    'projetos.aplicativos': 'Aplicaciones',
    'projetos.buscar': 'Buscar proyectos...',
    'projetos.nenhum': 'Ningún proyecto encontrado',
    'projetos.tentarOutra': 'Intenta otra categoría o búsqueda.',
    'projetos.anterior': 'Anterior',
    'projetos.proxima': 'Siguiente',

    // ---- Card Proyecto ----
    'card.verProjeto': 'Ver proyecto',
    'card.destaque': '★ Destacado',

    // ---- Detalle Proyecto ----
    'detalhe.voltar': 'Volver a proyectos',
    'detalhe.naoEncontrado': 'Proyecto no encontrado.',
    'detalhe.visualizacoes': 'visualizaciones',
    'detalhe.descricao': 'Descripción',
    'detalhe.funcionalidades': 'Funcionalidades',
    'detalhe.desafios': 'Desafíos',
    'detalhe.solucoes': 'Soluciones',
    'detalhe.galeria': 'Galería',
    'detalhe.links': 'Enlaces',
    'detalhe.repositorio': 'Repositorio',
    'detalhe.site': 'Sitio Web',
    'detalhe.aplicativo': 'Aplicación',

    // ---- Modal Imagen ----
    'modal.fechar': 'Cerrar',
    'modal.anterior': 'Anterior',
    'modal.proxima': 'Siguiente',
    'modal.de': 'de',

    // ---- Pie de página ----
    'rodape.direitos': 'Todos los derechos reservados.',

    // ---- Login ----
    'login.titulo': 'Panel Admin',
    'login.subtitulo': 'Inicia sesión para gestionar tu portafolio',
    'login.email': 'Correo electrónico',
    'login.senha': 'Contraseña',
    'login.entrar': 'Entrar',
    'login.entrando': 'Entrando...',
    'login.voltar': '← Volver al portafolio',
    'login.erroLogin': 'Error al iniciar sesión.',

    // ---- Admin Layout ----
    'admin.painel': 'Panel Admin',
    'admin.dashboard': 'Panel',
    'admin.projetos': 'Proyectos',
    'admin.novoProjeto': 'Nuevo Proyecto',
    'admin.perfil': 'Perfil',
    'admin.verPortfolio': 'Ver Portafolio',
    'admin.sair': 'Salir',

    // ---- Admin Dashboard ----
    'dashboard.titulo': 'Panel',
    'dashboard.publicados': 'Publicados',
    'dashboard.rascunhos': 'Borradores',
    'dashboard.emDestaque': 'Destacados',
    'dashboard.visualizacoes': 'Visualizaciones',
    'dashboard.recentes': 'Proyectos Recientes',
    'dashboard.nome': 'Nombre',
    'dashboard.categoria': 'Categoría',
    'dashboard.status': 'Estado',
    'dashboard.views': 'Vistas',
    'dashboard.publicado': 'Publicado',
    'dashboard.rascunho': 'Borrador',
    'dashboard.nenhumProjeto': 'Aún no hay proyectos.',

    // ---- Admin Proyectos ----
    'adminProjetos.buscar': 'Buscar...',
    'adminProjetos.novo': 'Nuevo',
    'adminProjetos.editar': 'Editar',
    'adminProjetos.nenhum': 'Ningún proyecto encontrado.',
    'adminProjetos.pagina': 'Página',
    'adminProjetos.de': 'de',
    'adminProjetos.confirmarRemover': 'Eliminar el proyecto',
    'adminProjetos.removido': '¡Proyecto eliminado!',
    'adminProjetos.erroCarregar': 'Error al cargar proyectos',
    'adminProjetos.erroRemover': 'Error al eliminar proyecto',

    // ---- Form Proyecto ----
    'form.voltar': 'Volver',
    'form.editarProjeto': 'Editar Proyecto',
    'form.novoProjeto': 'Nuevo Proyecto',
    'form.infoBasicas': 'Información Básica',
    'form.nomeProjeto': 'Nombre del Proyecto',
    'form.categoria': 'Categoría',
    'form.resumoCurto': 'Resumen Corto',
    'form.descCompleta': 'Descripción Completa',
    'form.tecTags': 'Tecnologías y Etiquetas',
    'form.tecnologias': 'Tecnologías Usadas',
    'form.tags': 'Etiquetas',
    'form.separarVirgula': 'Separar con comas',
    'form.detalhes': 'Detalles del Proyecto',
    'form.funcionalidades': 'Funcionalidades',
    'form.umaPorLinha': 'Una por línea',
    'form.desafios': 'Desafíos',
    'form.solucoes': 'Soluciones',
    'form.linksExternos': 'Enlaces Externos',
    'form.urlGithub': 'URL de GitHub',
    'form.urlSite': 'URL del Sitio',
    'form.urlApp': 'URL de la Aplicación',
    'form.imagens': 'Imágenes',
    'form.imagemPrincipal': 'Imagen Principal',
    'form.galeriaImagens': 'Galería de Imágenes',
    'form.cliqueArraste': 'Haga clic o arrastre una imagen',
    'form.cliqueArrasteMultiplas': 'Haga clic o arrastre múltiples imágenes',
    'form.opcoes': 'Opciones',
    'form.publicado': 'Publicado',
    'form.destaqueInicial': 'Destacar en la página principal',
    'form.salvando': 'Guardando...',
    'form.atualizar': 'Actualizar',
    'form.criarProjeto': 'Crear Proyecto',
    'form.cancelar': 'Cancelar',
    'form.projetoAtualizado': '¡Proyecto actualizado!',
    'form.projetoCriado': '¡Proyecto creado!',
    'form.erroSalvar': 'Error al guardar proyecto',
    'form.erroCarregar': 'Error al cargar proyecto',

    // ---- Admin Perfil ----
    'perfil.titulo': 'Editar Perfil',
    'perfil.infoPessoais': 'Información Personal',
    'perfil.nome': 'Nombre',
    'perfil.tituloProf': 'Título',
    'perfil.descCurta': 'Descripción Corta',
    'perfil.descCompleta': 'Descripción Completa',
    'perfil.tecDominadas': 'Tecnologías Dominadas',
    'perfil.avatar': 'Avatar',
    'perfil.habilidades': 'Habilidades',
    'perfil.nomeHabilidade': 'Nombre de la habilidad',
    'perfil.categoriaHab': 'Categoría',
    'perfil.adicionarHab': 'Agregar Habilidad',
    'perfil.contato': 'Contacto',
    'perfil.email': 'Correo electrónico',
    'perfil.whatsapp': 'WhatsApp',
    'perfil.github': 'GitHub (usuario)',
    'perfil.linkedin': 'LinkedIn (usuario)',
    'perfil.twitter': 'Twitter (usuario)',
    'perfil.website': 'Sitio Web',
    'perfil.salvar': 'Guardar Perfil',
    'perfil.salvando': 'Guardando...',
    'perfil.atualizado': '¡Perfil actualizado!',
    'perfil.erroCarregar': 'Error al cargar perfil',
    'perfil.erroSalvar': 'Error al guardar perfil',

    // ---- General ----
    'geral.carregando': 'Cargando...',
    'geral.erro': 'Error',
  },

  'zh-CN': {
    // ---- 导航 ----
    'nav.inicio': '首页',
    'nav.projetos': '项目',
    'nav.contato': '联系',
    'nav.alternarTema': '切换主题',

    // ---- Hero ----
    'hero.saudacao': '你好，我是',
    'hero.verProjetos': '查看项目',
    'hero.contato': '联系方式',

    // ---- 技能 ----
    'habilidades.titulo': '技能',
    'habilidades.subtitulo': '我掌握的技术和工具',

    // ---- 联系（区块） ----
    'contato.titulo': '联系方式',
    'contato.subtitulo': '通过以下渠道联系我',

    // ---- 精选项目 ----
    'destaque.titulo': '精选项目',
    'destaque.subtitulo': '我的一些最佳作品',
    'destaque.verTodos': '查看所有项目',

    // ---- 出版物 ----
    'publicacoes.titulo': '出版物与软件包',
    'publicacoes.subtitulo': '我创建和发布的内容与软件包',
    'publicacoes.pacote': '软件包',
    'publicacoes.artigo': '文章',
    'publicacoes.video': '视频',
    'publicacoes.outro': '其他',

    // ---- 项目页面 ----
    'projetos.titulo': '项目',
    'projetos.subtitulo': '按类别浏览我的项目',
    'projetos.todos': '全部',
    'projetos.pacotes': '软件包',
    'projetos.scripts': '脚本',
    'projetos.sistemas': '系统',
    'projetos.websites': '网站',
    'projetos.aplicativos': '应用',
    'projetos.buscar': '搜索项目...',
    'projetos.nenhum': '未找到项目',
    'projetos.tentarOutra': '请尝试其他类别或搜索。',
    'projetos.anterior': '上一页',
    'projetos.proxima': '下一页',

    // ---- 项目卡片 ----
    'card.verProjeto': '查看项目',
    'card.destaque': '★ 精选',

    // ---- 项目详情 ----
    'detalhe.voltar': '返回项目列表',
    'detalhe.naoEncontrado': '未找到项目。',
    'detalhe.visualizacoes': '次浏览',
    'detalhe.descricao': '描述',
    'detalhe.funcionalidades': '功能',
    'detalhe.desafios': '挑战',
    'detalhe.solucoes': '解决方案',
    'detalhe.galeria': '图库',
    'detalhe.links': '链接',
    'detalhe.repositorio': '仓库',
    'detalhe.site': '网站',
    'detalhe.aplicativo': '应用',

    // ---- 图片模态框 ----
    'modal.fechar': '关闭',
    'modal.anterior': '上一张',
    'modal.proxima': '下一张',
    'modal.de': '/',

    // ---- 页脚 ----
    'rodape.direitos': '版权所有。',

    // ---- 登录 ----
    'login.titulo': '管理面板',
    'login.subtitulo': '登录以管理您的作品集',
    'login.email': '电子邮件',
    'login.senha': '密码',
    'login.entrar': '登录',
    'login.entrando': '登录中...',
    'login.voltar': '← 返回作品集',
    'login.erroLogin': '登录失败。',

    // ---- 管理布局 ----
    'admin.painel': '管理面板',
    'admin.dashboard': '仪表盘',
    'admin.projetos': '项目',
    'admin.novoProjeto': '新项目',
    'admin.perfil': '个人资料',
    'admin.verPortfolio': '查看作品集',
    'admin.sair': '退出',

    // ---- 管理仪表盘 ----
    'dashboard.titulo': '仪表盘',
    'dashboard.publicados': '已发布',
    'dashboard.rascunhos': '草稿',
    'dashboard.emDestaque': '精选',
    'dashboard.visualizacoes': '浏览量',
    'dashboard.recentes': '最近项目',
    'dashboard.nome': '名称',
    'dashboard.categoria': '类别',
    'dashboard.status': '状态',
    'dashboard.views': '浏览',
    'dashboard.publicado': '已发布',
    'dashboard.rascunho': '草稿',
    'dashboard.nenhumProjeto': '暂无项目。',

    // ---- 管理项目 ----
    'adminProjetos.buscar': '搜索...',
    'adminProjetos.novo': '新建',
    'adminProjetos.editar': '编辑',
    'adminProjetos.nenhum': '未找到项目。',
    'adminProjetos.pagina': '第',
    'adminProjetos.de': '页，共',
    'adminProjetos.confirmarRemover': '删除项目',
    'adminProjetos.removido': '项目已删除！',
    'adminProjetos.erroCarregar': '加载项目失败',
    'adminProjetos.erroRemover': '删除项目失败',

    // ---- 项目表单 ----
    'form.voltar': '返回',
    'form.editarProjeto': '编辑项目',
    'form.novoProjeto': '新项目',
    'form.infoBasicas': '基本信息',
    'form.nomeProjeto': '项目名称',
    'form.categoria': '类别',
    'form.resumoCurto': '简短摘要',
    'form.descCompleta': '完整描述',
    'form.tecTags': '技术与标签',
    'form.tecnologias': '使用的技术',
    'form.tags': '标签',
    'form.separarVirgula': '用逗号分隔',
    'form.detalhes': '项目详情',
    'form.funcionalidades': '功能',
    'form.umaPorLinha': '每行一个',
    'form.desafios': '挑战',
    'form.solucoes': '解决方案',
    'form.linksExternos': '外部链接',
    'form.urlGithub': 'GitHub 链接',
    'form.urlSite': '网站链接',
    'form.urlApp': '应用链接',
    'form.imagens': '图片',
    'form.imagemPrincipal': '主图',
    'form.galeriaImagens': '图库',
    'form.cliqueArraste': '点击或拖拽图片',
    'form.cliqueArrasteMultiplas': '点击或拖拽多张图片',
    'form.opcoes': '选项',
    'form.publicado': '已发布',
    'form.destaqueInicial': '在首页精选展示',
    'form.salvando': '保存中...',
    'form.atualizar': '更新',
    'form.criarProjeto': '创建项目',
    'form.cancelar': '取消',
    'form.projetoAtualizado': '项目已更新！',
    'form.projetoCriado': '项目已创建！',
    'form.erroSalvar': '保存项目失败',
    'form.erroCarregar': '加载项目失败',

    // ---- 管理个人资料 ----
    'perfil.titulo': '编辑个人资料',
    'perfil.infoPessoais': '个人信息',
    'perfil.nome': '姓名',
    'perfil.tituloProf': '职称',
    'perfil.descCurta': '简短描述',
    'perfil.descCompleta': '完整描述',
    'perfil.tecDominadas': '掌握的技术',
    'perfil.avatar': '头像',
    'perfil.habilidades': '技能',
    'perfil.nomeHabilidade': '技能名称',
    'perfil.categoriaHab': '类别',
    'perfil.adicionarHab': '添加技能',
    'perfil.contato': '联系方式',
    'perfil.email': '电子邮件',
    'perfil.whatsapp': 'WhatsApp',
    'perfil.github': 'GitHub（用户名）',
    'perfil.linkedin': 'LinkedIn（用户名）',
    'perfil.twitter': 'Twitter（用户名）',
    'perfil.website': '网站',
    'perfil.salvar': '保存资料',
    'perfil.salvando': '保存中...',
    'perfil.atualizado': '个人资料已更新！',
    'perfil.erroCarregar': '加载个人资料失败',
    'perfil.erroSalvar': '保存个人资料失败',

    // ---- 通用 ----
    'geral.carregando': '加载中...',
    'geral.erro': '错误',
  },
};
