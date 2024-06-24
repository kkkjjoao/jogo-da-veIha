// Classe Jogador
class Jogador {
    constructor(nome, simbolo) {
      this.nome = nome;
      this.simbolo = simbolo;
    }
  }

  // Classe Jogada
  class Jogada {
    constructor(jogador, linha, coluna) {
      this.jogador = jogador;
      this.linha = linha;
      this.coluna = coluna;
    }
  }

  // Classe Jogo
  class Jogo {
    constructor(jogador1, jogador2) {
      this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
      this.jogador1 = jogador1;
      this.jogador2 = jogador2;
      this.jogadorAtual = jogador1;
      this.jogoAtivo = true;
    }

    inicializarJogo() {
      this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
      this.jogadorAtual = this.jogador1;
      this.jogoAtivo = true;
      atualizarTabuleiro();
    }

    realizarJogada(jogada) {
      if (this.tabuleiro[jogada.linha][jogada.coluna] === ' ' && this.jogoAtivo) {
        this.tabuleiro[jogada.linha][jogada.coluna] = jogada.jogador.simbolo;
        atualizarTabuleiro();
        if (this.verificarVencedor()) {
          alert(`O jogador ${jogada.jogador.nome} venceu!`);
          this.jogoAtivo = false;
        } else {
          this.alternarJogador();
        }
      } else {
        alert("Jogada inválida!");
      }
    }

    verificarVencedor() {
      const simbolo = this.jogadorAtual.simbolo;
      const linhas = this.tabuleiro.some(linha => linha.every(celula => celula === simbolo));
      const colunas = [0, 1, 2].some(col => this.tabuleiro.every(linha => linha[col] === simbolo));
      const diagonais =
        [0, 1, 2].every(i => this.tabuleiro[i][i] === simbolo) ||
        [0, 1, 2].every(i => this.tabuleiro[i][2 - i] === simbolo);

      return linhas || colunas || diagonais;
    }

    alternarJogador() {
      this.jogadorAtual = this.jogadorAtual === this.jogador1 ? this.jogador2 : this.jogador1;
    }
  }

  const jogador1 = new Jogador("Alice", "X");
  const jogador2 = new Jogador("Bob", "O");
  const jogo = new Jogo(jogador1, jogador2);

  function atualizarTabuleiro() {
    const tabuleiroDiv = document.getElementById("tabuleiro");
    tabuleiroDiv.innerHTML = '';
    jogo.tabuleiro.forEach((linha, i) => {
      linha.forEach((celula, j) => {
        const celulaDiv = document.createElement("div");
        celulaDiv.className = "celula";
        celulaDiv.innerText = celula;
        celulaDiv.onclick = () => jogo.realizarJogada(new Jogada(jogo.jogadorAtual, i, j));
        tabuleiroDiv.appendChild(celulaDiv);
      });
    });
  }

  function reiniciarJogo() {
    jogo.inicializarJogo();
  }

  window.onload = () => {
    jogo.inicializarJogo();
  };

exitButton.addEventListener('click', function() {
      confirmExitModal.style.display = 'block';
  });

  confirmExitButton.addEventListener('click', function() {
      localStorage.clear();
      confirmExitModal.style.display = 'none';
      window.location.href = 'index.html';
  });

  cancelExitButton.addEventListener('click', function() {
      confirmExitModal.style.display = 'none';
  });
