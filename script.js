class Jogador {
    constructor(nome, forma) {
        this.nome = nome;
        this.forma = forma;
    }
}

class Jogadas {
    constructor(jogo) {
        this.jogo = jogo;
    }

    setaCelula(cel, pos) {
        if (this.jogo.tabuleiro[pos] === undefined) {
            cel.innerHTML = this.jogo.jogadorAtual.forma;
            this.jogo.tabuleiro[pos] = this.jogo.jogadorAtual.forma;

            if (this.verificarVitoria()) {
                return;
            }

            this.jogo.jogadorAtual = this.jogo.jogadorAtual === this.jogo.jogador1 ? this.jogo.jogador2 : this.jogo.jogador1;
            this.jogo.setaJogadorAtual();
        } else {
            alert('Ops. Já marcado!');
        }

        if (this.tabuleiroIsFilled()) {
            alert('Ninguém ganhou! :(. Tente novamente');
            this.jogo.reset();
        }
    }

    verificarVitoria() {
        const linhas = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of linhas) {
            if (this.jogo.tabuleiro[a] && this.jogo.tabuleiro[a] === this.jogo.tabuleiro[b] && this.jogo.tabuleiro[a] === this.jogo.tabuleiro[c]) {
                alert(`${this.jogo.tabuleiro[a]} ganhou`);
                this.jogo.reset();
                return true;
            }
        }
        return false;
    }

    tabuleiroIsFilled() {
        return this.jogo.tabuleiro.every(cell => cell !== undefined);
    }
}

class Jogo {
    constructor() {
        this.jogador1 = null;
        this.jogador2 = null;
        this.jogadorAtual = null;
        this.tabuleiro = new Array(9).fill(undefined);
        this.formas = ['X', 'O'];
        this.jogadas = new Jogadas(this);
    }

    inicioDoJogo() {
        let nomeJogador1 = document.querySelector('#nomeJogador1').value;
        let nomeJogador2 = document.querySelector('#nomeJogador2').value;
        this.jogador1 = new Jogador(nomeJogador1, 'X');
        this.jogador2 = new Jogador(nomeJogador2, 'O');
        this.jogadorAtual = this.jogador1;
        document.querySelector('#jogadorAtual').innerHTML = `Jogador Atual: ${this.jogadorAtual.nome}`;

        // Exibe o tabuleiro
        document.getElementById('game').style.visibility = 'visible';

        this.setaJogadorAtual();
    }

    setaJogadorAtual() {
        let jogadorDaVez = document.querySelector('#jogadorAtual');
        jogadorDaVez.innerHTML = `Jogador Atual: ${this.jogadorAtual.nome}`;
    }

    reset() {
        window.location.reload();
    }
}

const jogo = new Jogo();
window.onload = function() {
    const startButton = document.getElementById('startButton');
    const inputs = document.querySelectorAll('#nomeJogador1, #nomeJogador2');

    inputs.forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                startButton.click();
            }
        });
    });
};
function validarNomes() {
    const nomeJogador1 = document.getElementById('nomeJogador1').value.trim();
    const nomeJogador2 = document.getElementById('nomeJogador2').value.trim();
    
    if (nomeJogador1 === '' || nomeJogador2 === '') {
        alert('Os nomes dos jogadores não podem estar vazios.');
        return false;
    }
    
    if (nomeJogador1.toLowerCase() === nomeJogador2.toLowerCase()) {
        alert('Os nomes dos jogadores não podem ser iguais.');
        return false;
    }
    
    return true;
}

window.onload = function() {
    console.log('Conteudo carregado');

    const startButton = document.getElementById('startButton');
    console.log('Botão Start:', startButton);

    startButton.addEventListener('click', function(event) {
        console.log('Botão Start clicado');
        if (!validarNomes()) {
            event.preventDefault();
            console.log('Validação falhou');
        }
    });
};
