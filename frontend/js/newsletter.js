// Sistema de Newsletter
class GerenciadorNewsletter {
    constructor() {
        this.formulario = document.getElementById('formNewsletter');
        this.inicializar();
    }

    inicializar() {
        if (this.formulario) {
            this.formulario.addEventListener('submit', (e) => {
                this.processarInscricao(e);
            });
        }
    }

    async processarInscricao(evento) {
        evento.preventDefault();
        
        const email = this.formulario.querySelector('input[type="email"]').value;
        
        if (!this.validarEmail(email)) {
            this.mostrarMensagem('Por favor, insira um email válido.', 'erro');
            return;
        }

        try {
            this.mostrarCarregamento(true);
            
            await inscreverNewsletter(email);
            
            this.mostrarMensagem('Inscrição realizada com sucesso! Verifique seu email para confirmação.', 'sucesso');
            this.formulario.reset();
            
        } catch (erro) {
            console.error('Erro na inscrição:', erro);
            this.mostrarMensagem(
                erro.message || 'Erro ao realizar inscrição. Tente novamente.', 
                'erro'
            );
        } finally {
            this.mostrarCarregamento(false);
        }
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    mostrarMensagem(mensagem, tipo) {
        // Remover mensagens anteriores
        const mensagensAnteriores = this.formulario.querySelectorAll('.mensagemNewsletter');
        mensagensAnteriores.forEach(msg => msg.remove());

        // Criar nova mensagem
        const elementoMensagem = document.createElement('div');
        elementoMensagem.className = `mensagemNewsletter ${tipo}`;
        elementoMensagem.textContent = mensagem;
        elementoMensagem.style.cssText = `
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            font-family: var(--fonte-corpo);
            ${tipo === 'sucesso' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
            ${tipo === 'erro' ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
        `;

        this.formulario.appendChild(elementoMensagem);

        // Auto-remover após 5 segundos
        setTimeout(() => {
            elementoMensagem.remove();
        }, 5000);
    }

    mostrarCarregamento(mostrar) {
        const botao = this.formulario.querySelector('button[type="submit"]');
        
        if (mostrar) {
            botao.disabled = true;
            botao.innerHTML = 'Inscrevendo...';
        } else {
            botao.disabled = false;
            botao.innerHTML = 'Inscrever';
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new GerenciadorNewsletter();
});