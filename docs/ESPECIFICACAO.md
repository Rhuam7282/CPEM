Guia de Desenvolvimento - Site CPEM

# Site CPEM - Especificação do Projeto

## 📋 Resumo Executivo

O **Coletivo de Professores que Ensinam Matemática (CPEM)** é um projeto de extensão acadêmica que oferece suporte pedagógico para professores de matemática do ensino fundamental. O site servirá como **plataforma central de documentação e divulgação**, funcionando como:

- 🗂️ **Acervo Digital**: Armazena registros de encontros, eventos e notícias do projeto
- 📢 **Canal de Comunicação**: Divulga atividades e permite inscrição em newsletter
- 🌐 **Vitrine do Projeto**: Apresenta a iniciativa para comunidade científica e educadores

## 🎯 Público-Alvo Principal
- Professores de matemática (30-50 anos) da rede pública
- Comunidade acadêmica interessada em projetos de extensão
- Gestores educacionais da região

---

📁 Estrutura do Projeto

cpem-site/
├── frontend/                    # Site estático (Netlify)
│   ├── index.html
│   ├── sobre.html
│   ├── eventos.html
│   ├── noticias.html
│   ├── encontros.html
│   ├── contato.html
│   ├── admin.html              # Painel do Decap CMS
│   ├── css/
│   │   ├── estiloPrincipal.css
│   │   ├── componentes.css
│   │   └── temas/
│   │       ├── salaAula.css    # Estilos esqueumórficos
│   │       └── utilitarios.css
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── carrossel.js
│   │   ├── newsletter.js
│   │   └── admin.js
│   └── imagens/
│       ├── elementos/
│       │   ├── quadro.png
│       │   ├── cortica.png
│       │   └── postit.png
│       └── conteudo/
├── backend/                     # API (Render)
│   ├── server.js
│   ├── routes/
│   │   ├── noticias.js
│   │   ├── eventos.js
│   │   ├── encontros.js
│   │   └── newsletter.js
│   ├── models/
│   │   ├── Noticia.js
│   │   ├── Evento.js
│   │   ├── Encontro.js
│   │   └── Assinante.js
│   └── config/
│       └── database.js
├── docs/
│   ├── ESPECIFICACAO.md        # Este arquivo - SEMPRE ATUALIZAR
│   ├── ELEMENTOS.md            # Documentação de elementos
│   └── MANUAL_ADMIN.md
├── netlify/
│   └── config.yml
├── node_modules/              # Configuração do Decap CMS
├── .gitgnore
└── README.md

🚨 Regras de Desenvolvimento
Convenções de Nomenclatura

// ✅ CORRETO - Português camelCase
const listaDeNoticias = [];
function carregarNoticias() {}
class GerenciadorDeEventos {}

// ❌ EVITAR - Inglês
const newsList = [];
function loadNews() {}
class EventManager {}

// ✅ Classes CSS em português
.cardNoticia {}
.botaoPrimario {}
.muralCortica {}

// ❌ Classes CSS em inglês
.news-card {}
.primary-button {}

Organização de Código

// ✅ Um arquivo por funcionalidade
// js/carrossel.js
class CarrosselNoticias {
    inicializar() {}
    proximoSlide() {}
}

// ✅ Funções específicas em arquivos específicos  
// js/newsletter.js
function inscreverNewsletter(email) {}
function validarEmail(email) {}

// ❌ Não misturar funcionalidades diferentes no mesmo arquivo

Estrutura de Arquivos CSS
css

/* css/componentes.css */
/* ===== COMPONENTES REUTILIZÁVEIS ===== */
.cardBase {
    /* Estilos base para cards */
}

.botaoPrimario {
    /* Estilos do botão primário */
}

/* ===== COMPONENTES ESPECÍFICOS ===== */
.cardNoticia {
    /* Estilos específicos para notícias */
}

.cardEvento {
    /* Estilos específicos para eventos */
}

🔧 Configurações de Ambiente
Variáveis de Ambiente (Backend)

// backend/.env
MONGODB_URI=sua_string_de_conexao
JWT_SECRET=chave_secreta_jwt
FRONTEND_URL=https://cpem-site.netlify.app
EMAIL_PROJETO=cpem@email.com

Configuração Decap CMS
yaml

# netlify/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: "frontend/imagens/conteudo"
public_folder: "/imagens/conteudo"

collections:
  - name: "noticias"
    label: "Notícias"
    folder: "frontend/content/noticias"
    create: true
    fields:
      - { label: "Título", name: "titulo", widget: "string" }
      - { label: "Subtítulo", name: "subtitulo", widget: "string" }
      - { label: "Data", name: "data", widget: "datetime" }
      - { label: "Imagem de Capa", name: "imagemCapa", widget: "image" }
      - { label: "Texto", name: "texto", widget: "markdown" }

📋 Especificação do Site (ATUALIZAR SEMPRE)
Páginas e Funcionalidades
🏠 Página Inicial (index.html)

O que deve fazer:

    Carrossel com últimas notícias

    Texto de boas-vindas do projeto

    Seção "Eventos em Destaque" (3 mais recentes)

    Mapa do site explicativo

    Formulário de newsletter

📰 Página de Notícias (noticias.html)

O que deve fazer:

    Lista paginada de notícias (mais recentes primeiro)

    Filtro por data e pesquisa por título

    Visualização individual de notícia

    Compartilhamento por link

🎯 Página de Eventos (eventos.html)

O que deve fazer:

    Galeria de eventos participados

    Filtro por ano e tipo de evento

    Visualização com detalhes e galeria de fotos

👥 Página de Encontros (encontros.html)

O que deve fazer:

    Registros dos encontros quinzenais

    Organização por data (mais recente primeiro)

    Links para materiais e PDFs

    Galeria de fotos dos encontros

📞 Página de Contato (contato.html)

O que deve fazer:

    Formulário de contato funcional

    Informações do projeto e email

    Redirecionamento para email do projeto

⚙️ Painel Admin (admin.html)

O que deve fazer:

    Login seguro para administradores

    Interface para criar/editar notícias, eventos, encontros

    Gerenciamento de assinantes da newsletter

    Upload de imagens e arquivos

Funcionalidades Técnicas
🔄 Sistema de Publicações

// Estrutura comum para todos os tipos de publicação
{
    id: "string",
    tipo: "noticia|evento|encontro",
    titulo: "string", 
    subtitulo: "string",
    data: "ISOString",
    conteudo: "string|markdown",
    imagens: ["array", "de", "urls"],
    anexos: ["array", "de", "arquivos"]
}

📧 Sistema de Newsletter

    Inscrição com confirmação por email

    Lista de assinantes gerenciável

    Envio de notificações automáticas

    Template de emails personalizável

🎨 Sistema de Estilos e Temas
Classes CSS Fundamentais (Documentar em ELEMENTOS.md)
css

/* Layout */
.containerPrincipal {}
.gridNoticias {}
.flexCards {}

/* Componentes Esqueumórficos */
.quadroNegro {}
.quadroBranco {}
.muralCortica {}
.postIt {}
.abaArquivo {}

/* Cores Temáticas */
--cor-giz: #f8f9fa;
--cor-quadro-branco: #f8f9fa;
--cor-quadro-negro: #2c3e50; 
--cor-canetao: #2c3e50; 
--cor-cortica: #d2691e;
--verde-principal #2EA650;
--azul-principal #2E39A6;
--vermelho-principal #A62E2E;
--azul-claro #6F7DF2;
--verde-claro #2D623C;

Paleta de Cores (Sala de Aula)
css

:root {
    --cor-canetao: #2c3e50;
    --cor-quadro: #f8f9fa;
    --cor-cortica: #8b4513;
    --cor-postit: #6F7DF2;
    --cor-vermelho-caneta: #A62E2E;
    --cor-verde-caneta: #2D623C;
}

/* Fontes favoritas */
Merienda Black - Para Títulos
EduNSWACTCursive SemiBold - Para Subtítulos
Handlee Regular - Para o Corpo

Importação das fontes
css

@import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Cursive:wght@400..700&family=Handlee&family=Merienda:wght@300..900&display=swap');

🔄 Fluxo de Desenvolvimento
1. Desenvolvimento Frontend

# Na pasta frontend/
cd frontend
# Desenvolver componentes → Testar local → Commit → Push

2. Desenvolvimento Backend

# Na pasta backend/  
cd backend
npm install
npm run dev
# Testar endpoints → Commit → Deploy no Render

3. Atualização da Documentação

# SEMPRE que fizer mudanças:
# 1. Atualizar docs/ESPECIFICACAO.md
# 2. Atualizar docs/ELEMENTOS.md se criar novos componentes
# 3. Testar tudo localmente antes do commit

📝 Comandos e Boas Práticas
Para Evitar Conflitos

// ✅ Use funções com nomes descritivos em português
function validarFormularioContato() {}

// ✅ Documente funções complexas
/**
 * Carrega notícias da API e renderiza na página
 * @param {number} pagina - Número da página para paginação
 * @returns {Promise} Promise com as notícias
 */
async function carregarNoticias(pagina = 1) {}

// ✅ Use constantes para valores fixos
const tiposDePublicacao = {
    NOTICIA: 'noticia',
    EVENTO: 'evento', 
    ENCONTRO: 'encontro'
};

Validações Obrigatórias

// ✅ Sempre validar dados da API
function validarDadosNoticia(dados) {
    if (!dados.titulo || !dados.data) {
        throw new Error('Dados da notícia incompletos');
    }
}

// ✅ Tratar erros de forma consistente
async function buscarDados() {
    try {
        const resposta = await fetch(url);
        return await resposta.json();
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        mostrarMensagemErro('Falha ao carregar dados');
    }
}

🔍 Checklist de Qualidade
Antes de Cada Commit

    Código em português camelCase

    Documentação atualizada

    Funcionalidades testadas

    Sem CSS ou JS desnecessário

    Nomes de arquivos corretos

    Responsividade verificada

Antes de Cada Deploy

    Todas as páginas funcionando

    Formulários operacionais

    Admin acessível e funcional

    Newsletter integrada

    Performance otimizada

IMPORTANTE: Este arquivo (ESPECIFICACAO.md) deve ser atualizado sempre que novas funcionalidades forem implementadas ou mudanças forem feitas na estrutura do projeto. Mantenha sempre sincronizado com o estado atual do desenvolvimento.