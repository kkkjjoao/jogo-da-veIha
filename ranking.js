class Jogador {
  constructor(nome, simbolo) {
      this.nome = nome;
      this.simbolo = simbolo;
  }
}

class Jogada {
  constructor(jogador, linha, coluna) {
      this.jogador = jogador;
      this.linha = linha;
      this.coluna = coluna;
  }
}

class Ranking {
  constructor() {
      this.ranking = JSON.parse(localStorage.getItem("ranking")) || {};
  }

  atualizarRanking(jogador, venceu) {
      if (!this.ranking[jogador.nome]) {
          this.ranking[jogador.nome] = { vitorias: 0, derrotas: 0 };
      }
      if (venceu) {
          this.ranking[jogador.nome].vitorias += 1;
      } else {
          this.ranking[jogador.nome].derrotas += 1;
      }
      localStorage.setItem("ranking", JSON.stringify(this.ranking));
  }

  exibirRanking() {
      const rankingDiv = document.getElementById("ranking");
      rankingDiv.innerHTML = "<h2>Ranking:</h2>";
      for (const jogador in this.ranking) {
          rankingDiv.innerHTML += `<p>${jogador}: ${this.ranking[jogador].vitorias} Vitórias, ${this.ranking[jogador].derrotas} Derrotas</p>`;
      }
  }

  limparRanking() {
      this.ranking = {};
      localStorage.removeItem("ranking");
      this.exibirRanking();
  }
}

class Jogo {
  constructor(jogador1, jogador2, ranking) {
      this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
      this.jogador1 = jogador1;
      this.jogador2 = jogador2;
      this.jogadorAtual = jogador1;
      this.jogoAtivo = true;
      this.ranking = ranking;
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
          if (this.verificarVencedor(jogada.jogador.simbolo)) {
              setTimeout(() => {
                  alert(`O jogador ${jogada.jogador.nome} venceu!`);
                  this.jogoAtivo = false;
                  this.ranking.atualizarRanking(jogada.jogador, true);
                  this.ranking.atualizarRanking(this.jogadorAtual === this.jogador1 ? this.jogador2 : this.jogador1, false);
                  this.ranking.exibirRanking();
              }, 100);
          } else {
              this.alternarJogador();
          }
      } else {
          alert("Jogada inválida!");
      }
  }

  verificarVencedor(simbolo) {
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
  const ranking = new Ranking();
  ranking.exibirRanking();

  document.getElementById("iniciarJogo").onclick = () => {
      const nomeJogador1 = document.getElementById("nomeJogador1").value || "Jogador 1";
      const nomeJogador2 = document.getElementById("nomeJogador2").value || "Jogador 2";
      const jogador1 = new Jogador(nomeJogador1, "X");
      const jogador2 = new Jogador(nomeJogador2, "O");
      window.jogo = new Jogo(jogador1, jogador2, ranking);
      jogo.inicializarJogo();
  };

  document.getElementById("botaosair").addEventListener('click', function() {
      document.getElementById("confirmasair").style.display = 'block';
  });

  document.getElementById("btnconfirmasair").addEventListener('click', function() {
      ranking.limparRanking();
      document.getElementById("confirmasair").style.display = 'none';
      window.location.href = 'index.html';
  });

  document.getElementById("botaocancelar").addEventListener('click', function() {
      document.getElementById("confirmasair").style.display = 'none';
  });
};
