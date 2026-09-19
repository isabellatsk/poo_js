const prompt = require("prompt-sync")();

// --------------------- CLASSE PERSONAGEM ---------------------
class Personagem {
  constructor(nome, vida, dano) {
    this.nome = nome;
    this.vida = vida;
    this.dano = dano; // dano base (sem arma)
  }
}

// --------------------- CLASSE PARA ARMAS ---------------------
// Armas que podem ser compradas e usadas pelo jogador
// Agregação: Jogador terá um array de Armas (inventario)
class Arma {
  constructor(nome, preco, dano, nivelMinimo) {
    this.nome = nome;
    this.preco = preco;
    this.dano = dano; // dano extra que a arma adiciona
    this.nivelMinimo = nivelMinimo;
  }
}

// --------------------- CLASSE PARA JOGADOR ---------------------
// Herança: Jogador extende Personagem (é um tipo de Personagem)
// Encapsulamento: coins é um atributo privado (#coins)
class Jogador extends Personagem {
  #coins;

  constructor(nick) {
    super(nick, 100, 2); // nick vira nome, vida = 100, dano = 2
    this.nick = nick;
    this.vidaMax = 100;
    this.nivel = 1;
    this.#coins = 0; // coins, encapsulados com #
    this.inventario = []; // array que agrega objetos Arma (relacionamento agregação)
    this.espadaEquipada = null;
    this.treinosRestantes = 5; // quantidade de treinos que o jogador pode fazer antes de subir nível
  }

  // Get e Set para coins (encapsulamento protege acesso direto)
  get coins() {
    return this.#coins;
  }
  set coins(valor) {
    this.#coins = Math.max(0, valor); // não permite valor negativo
  }

  // Calcula o dano total: dano base + dano da espada equipada
  get danoTotal() {
    return this.dano + (this.espadaEquipada ? this.espadaEquipada.dano : 0);
  }

  // METÓDO para mostrar informações do jogador
  perfil() {
    console.log(
      `\nNick: ${this.nick}, Nível: ${this.nivel}, Coins: ${this.#coins}, Dano Total: ${this.danoTotal}`,
    );
    if (this.espadaEquipada) {
      console.log(`Espada equipada: ${this.espadaEquipada.nome}`);
    } else {
      console.log("Nenhuma espada equipada.");
    }
  }

  // METÓDO para treinar, aumenta dano base se ainda tem treinos
  treinar() {
    if (this.treinosRestantes > 0) {
      this.dano += 1;
      this.treinosRestantes -= 1;
      console.log(`\nVocê treinou! Dano base agora: ${this.dano}`);
      console.log(`Treinos restantes neste nível: ${this.treinosRestantes}`);
    } else {
      console.log(
        `\nVocê já treinou 5 vezes neste nível. Suba de nível para treinar mais.`,
      );
    }
  }

  // Método para fzer uma missão com chances de recompensa ou falha
  fazerMissao() {
    console.log("\nVocê iniciou a missão...");

    // 35% de chance da missão ser interrompida
    if (Math.random() < 0.35) {
      console.log(
        "Um inimigo apareceu e interrompeu a missão! Você fugiu e não ganhou nada.",
      );
      return;
    }

    const recompensas = [];

    // 5% de chance de ganhar +1 nível
    if (Math.random() < 0.05) {
      this.nivel += 1;
      this.treinosRestantes = 5; // reseta treinos ao subir de nível
      recompensas.push("+1 nível");
    }

    // 25% de chance de ganhar +1 ou +2 de dano
    if (Math.random() < 0.25) {
      const ganhoDano = Math.random() < 0.8 ? 1 : 2;
      this.dano += ganhoDano;
      recompensas.push(`+${ganhoDano} dano`);
    }

    // 40% de chance de ganhar coins (varia entre 10, 20 ou 30)
    if (Math.random() < 0.4) {
      const chanceCoins = Math.random();
      let ganhoCoins = 10;
      if (chanceCoins > 0.95) {
        ganhoCoins = 30;
      } else if (chanceCoins > 0.7) {
        ganhoCoins = 20;
      }
      this.#coins += ganhoCoins;
      recompensas.push(`+${ganhoCoins} coins`);
    }

    // Mostra as recompensas ou aviso que não achou nada
    if (recompensas.length === 0) {
      console.log("Missão concluída, mas você não encontrou nada de valor.");
    } else {
      console.log("Missão concluída! Recompensas:");
      recompensas.forEach((r) => console.log("- " + r));
    }
  }

  // METÓDO para mostrar as armas do inventário
  mostrarInventario() {
    if (this.inventario.length === 0) {
      console.log("\nSeu inventário está vazio.");
    } else {
      console.log("\nInventário:");
      this.inventario.forEach((item) => {
        console.log(`- ${item.nome} (Dano: ${item.dano})`);
      });
    }
  }

  // METÓDO para equipar uma espada pelo nome, buscando no inventário (array) de armas
  equiparEspada(nomeEspada) {
    const espada = this.inventario.find(
      (item) => item.nome.toLowerCase() === nomeEspada.toLowerCase(),
    );

    if (!espada) {
      console.log("\nEssa espada não está no seu inventário.");
      return;
    }

    this.espadaEquipada = espada;
    console.log(`\nVocê equipou: ${espada.nome}`);
  }

  // METÓDO para comprar arma da loja
  comprarArma(arma) {
    if (!arma) {
      console.log("\nArma inválida.");
      return;
    }

    if (this.nivel < arma.nivelMinimo) {
      console.log(
        `\nVocê precisa estar no nível ${arma.nivelMinimo} para comprar esta arma.`,
      );
      return;
    }
    93;

    const jaTemArma = this.inventario.some(
      (a) => a.nome.toLowerCase() === arma.nome.toLowerCase(),
    );

    if (jaTemArma) {
      console.log("\nVocê já possui essa arma no inventário.");
      return;
    }

    if (this.#coins < arma.preco) {
      console.log("\nMoedas insuficientes!");
      return;
    }

    // faz a compra: desconta moedas e adiciona arma no inventário (array)
    this.#coins -= arma.preco;
    this.inventario.push(arma);
    console.log(
      `\nVocê comprou: ${arma.nome} (arma adicionada ao inventário, é preciso equipar para usar)`,
    );
  }

  // METÓDO para escolher um chefão p lutar
  escolherBoss(numeroEscolhido) {
    const bosses = Chefao.listaBosses();
    const index = Number(numeroEscolhido) - 1;
    const bossOriginal = bosses[index];

    if (!bossOriginal) {
      console.log("\nNúmero inválido.");
      return;
    }

    // Cria nova instância para luta, para não alterar o chefão original
    const bossParaLutar = new Chefao(
      bossOriginal.nome,
      bossOriginal.vida,
      bossOriginal.dano,
      bossOriginal.recompensaNivel,
      bossOriginal.recompensaCoins,
    );

    // Reseta vida do jogador antes da luta
    this.vida = this.vidaMax;

    console.log(`\nVocê escolheu enfrentar: ${bossParaLutar.nome}`);
    this.lutarComBoss(bossParaLutar);
  }

  // MÉTODO que executa a luta entre jogador e chefão
  lutarComBoss(boss) {
    console.log(`\n⚔️ A luta começou entre ${this.nick} e ${boss.nome}!`);

    while (this.vida > 0 && boss.vida > 0) {
      console.log(
        `\nSua Vida: ${this.vida} | Vida do Boss (${boss.nome}): ${boss.vida}`,
      );
      const escolha = prompt("Digite '1' para Atacar ou '2' para Fugir: ");

      if (escolha === "2") {
        console.log("\nVocê fugiu da batalha!");
        return;
      }

      if (escolha !== "1") {
        console.log("Opção inválida.");
        continue;
      }

      // Jogador ataca
      boss.vida -= this.danoTotal;
      console.log(`\nVocê causou ${this.danoTotal} de dano ao ${boss.nome}.`);

      // Se chefão morreu, jogador ganha recompensas e fim da luta
      if (boss.vida <= 0) {
        console.log(`\nVocê derrotou o ${boss.nome}!`);
        this.nivel += boss.recompensaNivel;
        this.#coins += boss.recompensaCoins;
        this.treinosRestantes = 5; // resetar treinos ao subir de nível
        console.log(
          `Você ganhou +${boss.recompensaNivel} nível(s) e +${boss.recompensaCoins} coins!`,
        );
        return;
      }

      // Boss ataca : gera dano aleatório e diminui vida do jogador
      const danoBoss = boss.getDanoAleatorio();
      this.vida -= danoBoss;
      console.log(`${boss.nome} causou ${danoBoss} de dano em você.`);

      if (this.vida <= 0) {
        console.log(`\nVocê foi derrotado pelo ${boss.nome}...`);
        return;
      }
    }
  }
}

// --------------------- CLASSE PARA LOJA DE ARMAS ----------------------------
// Contém o catálogo de armas disponíveis para compra
// Agregação: array de objetos Arma
class Loja {
  constructor() {
    this.armas = [
      new Arma("Adaga de Bronze", 50, 4, 1),
      new Arma("Espada de Ferro", 90, 6, 2),
      new Arma("Lança de Prata", 150, 10, 4),
      new Arma("Adaga Sombria", 180, 12, 5),
      new Arma("Nichirin Vermelha", 220, 16, 6),
      new Arma("Zangetsu", 240, 18, 7),
      new Arma("Espada de Ouro", 280, 22, 8),
      new Arma("Machado de Guerra", 310, 25, 9),
      new Arma("Tessaiga", 360, 30, 11),
      new Arma("Dark Repulser", 380, 33, 12),
    ];
  }

  // MÉTODO para exibir armas disponíveis
  mostrarArmas() {
    console.log("\nArmas disponíveis na loja:");
    this.armas.forEach((arma) => {
      console.log(
        `- ${arma.nome} (Preço: ${arma.preco} coins, Dano: ${arma.dano}, Nível mínimo: ${arma.nivelMinimo})`,
      );
    });
  }

  // MÉTODO para busca uma arma pelo nome na lista de armas
  buscarArma(nome) {
    return this.armas.find((a) => a.nome.toLowerCase() === nome.toLowerCase());
  }
}

// --------------------- CLASSE PARA CHEFÃO ---------------------
// Herança: Chefao estende Personagem
class Chefao extends Personagem {
  constructor(nome, vida, dano, recompensaNivel, recompensaCoins) {
    super(nome, vida, dano);
    this.recompensaNivel = recompensaNivel; // nível ganho ao derrotar chefão
    this.recompensaCoins = recompensaCoins; // coins ganhos ao derrotar chefão
  }

  // Retorna uma lista estática de chefes para escolha
  static listaBosses() {
    return [
      new Chefao("Ignir, o Dragão Escarlate", 120, 15, 1, 100),
      new Chefao("Vermithrax, o Dragão Ancião", 220, 25, 2, 180),
      new Chefao("Nidhogg, o Devorador de Raízes", 320, 40, 3, 300),
    ];
  }

  // MÉTODO para gera dano aleatório entre metade do dano e dano máximo do chefão
  getDanoAleatorio() {
    const min = Math.floor(this.dano / 2);
    const max = this.dano;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// --------------------- CRIAÇÃO DE JOGADOR ---------------------
console.log("=== Bem-vindo ao Jogo! ===");
const nick = prompt("Digite o nome do seu personagem: ");
const jogador = new Jogador(nick);

const loja = new Loja();

// --------------------- MENU ---------------------
let opcao = -1;
while (opcao !== 0) {
  console.log(`\n=== MENU - Jogador: ${jogador.nick} ===`);
  console.log("1 - Ver perfil");
  console.log("2 - Fazer missão");
  console.log("3 - Treinar");
  console.log("4 - Ver inventário");
  console.log("5 - Comprar item");
  console.log("6 - Equipar espada");
  console.log("7 - Enfrentar chefão");
  console.log("0 - Sair");

  opcao = Number(prompt("Escolha uma opção: "));

  switch (opcao) {
    case 1:
      console.log("\n📄 Exibindo perfil...");
      jogador.perfil();
      break;
    case 2:
      console.log("\n🗺️ Iniciando missão...");
      jogador.fazerMissao();
      break;
    case 3:
      console.log("\n💪 Iniciando treino...");
      jogador.treinar();
      break;
    case 4:
      console.log("\n🎒 Acessando inventário...");
      jogador.mostrarInventario();
      break;
    case 5:
      console.log("\n🛒 Abrindo loja...");
      loja.mostrarArmas();
      const nomeCompra = prompt("Digite o nome da arma que deseja comprar: ");
      const armaSelecionada = loja.buscarArma(nomeCompra);
      jogador.comprarArma(armaSelecionada);
      break;
    case 6:
      console.log("\n🗡️ Escolhendo espada para equipar...");
      jogador.mostrarInventario();
      const nomeEspada = prompt("Digite o nome da espada para equipar: ");
      jogador.equiparEspada(nomeEspada);
      break;
    case 7:
      console.log("\n👹 Escolhendo chefão para enfrentar...");
      const bosses = Chefao.listaBosses();
      console.log("\nEscolha qual boss você quer enfrentar:");
      bosses.forEach((boss, index) => {
        console.log(
          `${index + 1} - ${boss.nome} (Vida: ${boss.vida}, Dano: ${boss.dano})`,
        );
      });
      const numero = prompt("Digite o número do boss: ");
      jogador.escolherBoss(numero);
      break;
    case 0:
      console.log("\n👋 Saindo do jogo...");
      break;
    default:
      console.log("\nOpção inválida.");
  }
}
