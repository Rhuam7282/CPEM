// Sistema de Carrossel para notícias em destaque
class CarrosselNoticias {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.noticias = [];
        this.indiceAtual = 0;
        this.config = {
            tempoTransicao: config.tempoTransicao || 5000,
            animacao: config.animacao || 'slide',
            ...config
        };
        this.intervalo = null;
    }

    inicializar(noticias) {
        if (!this.container || !noticias || noticias.length === 0) {
            console.warn('Carrossel: Container não encontrado ou sem notícias');
            return;
        }

        this.noticias = noticias;
        this.indiceAtual = 0;
        this.renderizar();
        this.iniciarAutoplay();
        this.adicionarEventos();
    }

    renderizar() {
        const noticia = this.noticias[this.indiceAtual];
        
        this.container.innerHTML = `
            <div class="slideCarrossel animacaoFlutuar">
                <div class="imagemSlide">
                    <img src="${noticia.imagemCapa || 'imagens/conteudo/placeholder.jpg'}" 
                         alt="${noticia.titulo}">
                </div>
                <div class="conteudoSlide quadroBranco">
                    <h3 class="tituloTerciario">${noticia.titulo}</h3>
                    <p class="textoCanetao">${noticia.subtitulo}</p>
                    <p class="dataNoticia">${formatarData(noticia.data)}</p>
                    <button class="botaoPrimario" onclick="verNoticia('${noticia.id}')">
                        Ler Notícia
                    </button>
                </div>
            </div>
            <div class="controlesCarrossel">
                <button class="botaoControle" onclick="carrossel.anterior()">‹</button>
                <div class="indicadores">
                    ${this.noticias.map((_, index) => `
                        <button class="indicador ${index === this.indiceAtual ? 'ativo' : ''}" 
                                onclick="carrossel.irPara(${index})"></button>
                    `).join('')}
                </div>
                <button class="botaoControle" onclick="carrossel.proximo()">›</button>
            </div>
        `;
    }

    proximo() {
        this.indiceAtual = (this.indiceAtual + 1) % this.noticias.length;
        this.renderizar();
        this.reiniciarAutoplay();
    }

    anterior() {
        this.indiceAtual = (this.indiceAtual - 1 + this.noticias.length) % this.noticias.length;
        this.renderizar();
        this.reiniciarAutoplay();
    }

    irPara(indice) {
        this.indiceAtual = indice;
        this.renderizar();
        this.reiniciarAutoplay();
    }

    iniciarAutoplay() {
        this.intervalo = setInterval(() => {
            this.proximo();
        }, this.config.tempoTransicao);
    }

    pararAutoplay() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }

    reiniciarAutoplay() {
        this.pararAutoplay();
        this.iniciarAutoplay();
    }

    adicionarEventos() {
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        this.container.addEventListener('mouseenter', () => {
            this.pararAutoplay();
        });

        this.container.addEventListener('mouseleave', () => {
            this.iniciarAutoplay();
        });
    }
}

// Instância global do carrossel
const carrossel = new CarrosselNoticias('carrosselNoticias', {
    tempoTransicao: 5000,
    animacao: 'fade'
});

// Função para ver notícia completa
function verNoticia(idNoticia) {
    window.location.href = `noticias.html?id=${idNoticia}`;
}

// Inicialização global
window.inicializarCarrossel = function(noticias) {
    carrossel.inicializar(noticias);
};

window.carrossel = carrossel;
window.verNoticia = verNoticia;