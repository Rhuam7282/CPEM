// Configurações globais
const configuracoes = {
    urlApi: 'https://cpem-backend.onrender.com', // URL do backend no Render
    itensPorPagina: 10,
    tempoTransicaoCarrossel: 5000
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('CPEM - Site inicializado');
    
    // Verificar qual página está carregada e inicializar componentes específicos
    const caminhoPagina = window.location.pathname;
    const nomePagina = caminhoPagina.split('/').pop() || 'index.html';
    
    switch(nomePagina) {
        case 'index.html':
        case '':
            inicializarPaginaInicial();
            break;
        case 'noticias.html':
            inicializarPaginaNoticias();
            break;
        case 'eventos.html':
            inicializarPaginaEventos();
            break;
        case 'encontros.html':
            inicializarPaginaEncontros();
            break;
        case 'contato.html':
            inicializarPaginaContato();
            break;
    }
});

// Página Inicial
async function inicializarPaginaInicial() {
    try {
        // Carregar notícias para o carrossel
        const noticias = await buscarNoticias(1, 5);
        if (window.inicializarCarrossel) {
            window.inicializarCarrossel(noticias);
        }
        
        // Carregar eventos em destaque
        const eventos = await buscarEventos(1, 3);
        exibirEventosDestaque(eventos);
        
    } catch (erro) {
        console.error('Erro ao inicializar página inicial:', erro);
        mostrarMensagemErro('Falha ao carregar conteúdo da página inicial');
    }
}

function exibirEventosDestaque(eventos) {
    const container = document.getElementById('gridEventosDestaque');
    if (!container || !eventos || eventos.length === 0) return;
    
    container.innerHTML = eventos.map(evento => `
        <div class="cardEvento animacaoEntrada">
            <h3 class="tituloTerciario">${evento.titulo}</h3>
            <p class="textoCanetao">${evento.subtitulo}</p>
            <p><strong>Data:</strong> ${formatarData(evento.data)}</p>
            <p><strong>Local:</strong> ${evento.local || 'Online'}</p>
            <button class="botaoSecundario" onclick="verDetalhesEvento('${evento.id}')">
                Ver Detalhes
            </button>
        </div>
    `).join('');
}

// Utilitários
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function mostrarMensagemErro(mensagem) {
    // Implementação básica - pode ser melhorada com UI mais elaborada
    console.error('Erro:', mensagem);
    alert(mensagem);
}

function verDetalhesEvento(idEvento) {
    window.location.href = `eventos.html?id=${idEvento}`;
}

// Exportar funções para uso global
window.inicializarPaginaInicial = inicializarPaginaInicial;
window.formatarData = formatarData;
window.mostrarMensagemErro = mostrarMensagemErro;
window.verDetalhesEvento = verDetalhesEvento;