// Serviço de API para comunicação com o backend
class ServicoAPI {
    constructor(urlBase) {
        this.urlBase = urlBase;
    }

    async fazerRequisicao(endpoint, opcoes = {}) {
        const url = `${this.urlBase}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...opcoes.headers
            },
            ...opcoes
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const resposta = await fetch(url, config);
            
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

            return await resposta.json();
        } catch (erro) {
            console.error('Erro na requisição API:', erro);
            throw erro;
        }
    }

    // Notícias
    async buscarNoticias(pagina = 1, limite = 10) {
        return this.fazerRequisicao(`/noticias?pagina=${pagina}&limite=${limite}`);
    }

    async buscarNoticiaPorId(id) {
        return this.fazerRequisicao(`/noticias/${id}`);
    }

    // Eventos
    async buscarEventos(pagina = 1, limite = 10) {
        return this.fazerRequisicao(`/eventos?pagina=${pagina}&limite=${limite}`);
    }

    async buscarEventoPorId(id) {
        return this.fazerRequisicao(`/eventos/${id}`);
    }

    // Encontros
    async buscarEncontros(pagina = 1, limite = 10) {
        return this.fazerRequisicao(`/encontros?pagina=${pagina}&limite=${limite}`);
    }

    async buscarEncontroPorId(id) {
        return this.fazerRequisicao(`/encontros/${id}`);
    }

    // Newsletter
    async inscreverNewsletter(email) {
        return this.fazerRequisicao('/newsletter/inscrever', {
            method: 'POST',
            body: { email }
        });
    }

    // Contato
    async enviarMensagemContato(dadosContato) {
        return this.fazerRequisicao('/contato', {
            method: 'POST',
            body: dadosContato
        });
    }
}

// Instância global do serviço API
const api = new ServicoAPI(configuracoes.urlApi);

// Funções de conveniência para uso global
async function buscarNoticias(pagina = 1, limite = 10) {
    try {
        const resposta = await api.buscarNoticias(pagina, limite);
        return resposta.noticias || [];
    } catch (erro) {
        throw new Error('Falha ao buscar notícias: ' + erro.message);
    }
}

async function buscarEventos(pagina = 1, limite = 10) {
    try {
        const resposta = await api.buscarEventos(pagina, limite);
        return resposta.eventos || [];
    } catch (erro) {
        throw new Error('Falha ao buscar eventos: ' + erro.message);
    }
}

async function buscarEncontros(pagina = 1, limite = 10) {
    try {
        const resposta = await api.buscarEncontros(pagina, limite);
        return resposta.encontros || [];
    } catch (erro) {
        throw new Error('Falha ao buscar encontros: ' + erro.message);
    }
}

async function inscreverNewsletter(email) {
    return await api.inscreverNewsletter(email);
}

async function enviarMensagemContato(dadosContato) {
    return await api.enviarMensagemContato(dadosContato);
}

// Exportar para uso global
window.buscarNoticias = buscarNoticias;
window.buscarEventos = buscarEventos;
window.buscarEncontros = buscarEncontros;
window.inscreverNewsletter = inscreverNewsletter;
window.enviarMensagemContato = enviarMensagemContato;