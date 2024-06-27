class Jogador {
  constructor(nome, simbolo) {
    this.nome = nome;
    this.simbolo = simbolo;
    this.vitorias = 0;
    this.derrotas = 0;
    this.empates = 0;
  }
}

class Jogada {
  constructor(jogador, linha, coluna) {
    this.jogador = jogador;
    this.linha = linha;
    this.coluna = coluna;
  }
}

class Jogo {
  constructor(jogador1, jogador2) {
    this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
    this.jogador1 = jogador1;
    this.jogador2 = jogador2;
    this.jogadorAtual = jogador1;
    this.jogoAtivo = true;
    this.atualizarBordaJogadorAtual();
  }
  atualizarBordaJogadorAtual() {
    const nomeJogador1 = document.getElementById('nomeJogador1');
    const nomeJogador2 = document.getElementById('nomeJogador2');

    if (this.jogadorAtual === this.jogador1) {
      nomeJogador1.classList.add('borda-piscando');
      nomeJogador2.classList.remove('borda-piscando');
    } else {
      nomeJogador1.classList.remove('borda-piscando');
      nomeJogador2.classList.add('borda-piscando');
    }
  }
  inicializarJogo() {
    this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
    this.jogadorAtual = this.jogador1;
    this.jogoAtivo = true;
    this.atualizarTabuleiro();
    document.querySelector('[data-mensagem-vitoria]').style.display = 'none';
    atualizarRanking();
    this.atualizarBordaJogadorAtual();
  }

 realizarJogada(jogada) {
    if (this.tabuleiro[jogada.linha][jogada.coluna] === " " && this.jogoAtivo) {
      this.tabuleiro[jogada.linha][jogada.coluna] = jogada.jogador.simbolo;
      this.atualizarTabuleiro();
      if (this.verificarVencedor()) {
        setTimeout(() => {
          document.querySelector("[data-mensagem-texto]").innerText = `O jogador ${jogada.jogador.nome} venceu!`;
          document.querySelector("[data-mensagem-vitoria]").style.display = "flex";
          jogada.jogador.vitorias++;
          this.alternarJogador();
          this.jogadorAtual.derrotas++;
          this.jogoAtivo = false;
          atualizarRanking();
        }, 100);
      } else if (this.verificarEmpate()) {
        setTimeout(() => {
          document.querySelector("[data-mensagem-texto]").innerText = "O jogo empatou!";
          document.querySelector("[data-mensagem-vitoria]").style.display = "flex";
          jogada.jogador.empates++;
          this.alternarJogador();
          this.jogadorAtual.empates++;
          this.jogoAtivo = false;
          atualizarRanking();
        }, 100);
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

  verificarEmpate() {
    return this.tabuleiro.every(linha => linha.every(celula => celula !== ' '));
  }

  alternarJogador() {
    this.jogadorAtual = this.jogadorAtual === this.jogador1 ? this.jogador2 : this.jogador1;
    this.atualizarBordaJogadorAtual();
  }



  atualizarTabuleiro() {
    const tabuleiroDiv = document.getElementById("tabuleiro");
    tabuleiroDiv.innerHTML = '';
    this.tabuleiro.forEach((linha, i) => {
      linha.forEach((celula, j) => {
        const celulaDiv = document.createElement("div");
        celulaDiv.className = "celula";
        celulaDiv.innerText = celula; // Exibe o símbolo da célula
        celulaDiv.onclick = () => this.realizarJogada(new Jogada(this.jogadorAtual, i, j));
        tabuleiroDiv.appendChild(celulaDiv);
      });
    });
  }
}

let jogo;

function reiniciarJogo() {
  jogo.inicializarJogo();
  atualizarRanking();
}

window.onload = () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes('index.html')) {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function(event) {
      if (!validarNomes()) {
        event.preventDefault();
      } else {
        const nomeJogador1 = document.getElementById('nomeJogador1').value.trim();
        const nomeJogador2 = document.getElementById('nomeJogador2').value.trim();
        localStorage.setItem('nomeJogador1', nomeJogador1);
        localStorage.setItem('nomeJogador2', nomeJogador2);
        window.location.href = 'telajogo.html';
      }
    });
  } else if (currentPage.includes('telajogo.html')) {
    const nomeJogador1 = localStorage.getItem('nomeJogador1');
    const nomeJogador2 = localStorage.getItem('nomeJogador2');
    const jogador1 = new Jogador(nomeJogador1, "X");
    const jogador2 = new Jogador(nomeJogador2, "O");
    jogo = new Jogo(jogador1, jogador2);
    jogo.inicializarJogo();

    document.getElementById('rankingNomeJogador1').innerText = nomeJogador1;
    document.getElementById('rankingNomeJogador2').innerText = nomeJogador2;

    document.getElementById('nomeJogador1').innerText = nomeJogador1;
    document.getElementById('nomeJogador2').innerText = nomeJogador2;
    
    const botaosair = document.getElementById('botaosair');
    const confirmasair = document.getElementById('confirmasair');
    const btnconfirmasair = document.getElementById('btnconfirmasair');
    const botaocancelar = document.getElementById('botaocancelar');

    botaosair.addEventListener('click', function() {
      confirmasair.style.display = 'block';
    });

    btnconfirmasair.addEventListener('click', function() {
      localStorage.clear();
      confirmasair.style.display = 'none';
      window.location.href = 'index.html';
    });

    botaocancelar.addEventListener('click', function() {
      confirmasair.style.display = 'none';
    });
  }
};

function validarNomes() {
  const nomeJogador1 = document.getElementById('nomeJogador1').value.trim();
  const nomeJogador2 = document.getElementById('nomeJogador2').value.trim();

  if (!nomeJogador1 || !nomeJogador2) {
    alert("Por favor, preencha os nomes dos dois jogadores.");
    return false;
  }

  if (nomeJogador1 === nomeJogador2) {
    alert("Os nomes dos jogadores não podem ser iguais.");
    return false;
  }

  return true;
}

function atualizarRanking() {
  document.getElementById("vitoriasJogador1").innerText = jogo.jogador1.vitorias;
  document.getElementById("vitoriasJogador2").innerText = jogo.jogador2.vitorias;

  document.getElementById("empatesJogador1").innerText = jogo.jogador1.empates;
  document.getElementById("empatesJogador2").innerText = jogo.jogador2.empates;

  document.getElementById("derrotasJogador1").innerText = jogo.jogador1.derrotas;
  document.getElementById("derrotasJogador2").innerText = jogo.jogador2.derrotas;
}
