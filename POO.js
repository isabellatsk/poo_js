//___________________________________________________________________________________________________________
//                                              CLASSES
//___________________________________________________________________________________________________________

class Veiculo {
  constructor(marca, modelo, ano) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }
  exibirDetalhes() {
    console.log(`
      Modelo: ${this.modelo}
      Marca: ${this.marca}
      Ano: ${this.ano}
    `);
  }
  ligar() {
    console.log(`O ${this.modelo} está ligado e pronto para rodar!`);
  }
  buzinar() {
    console.log(`Biiiii! O ${this.modelo} está buzinando!`);
  }
}

class Cliente {
  constructor(nome, idade, cpf, renda) {
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
    this.renda = renda;
    this.veiculo = null;
  }
  exibirDetalhes() {
    console.log(`
      Cliente: ${this.nome}
      Idade: ${this.idade} 
      CPF: ${this.cpf}
      Renda: ${this.renda}
      Veículo: ${this.veiculo ? this.veiculo.modelo : "Nenhum veículo"}
    `);
  }
  comprar(veiculo, valor, data, formapagamento) {
    if (this.renda >= valor) {
      this.veiculo = veiculo;
      console.log(`${this.nome} comprou um ${veiculo.modelo} por R$${valor}.`);
      return new Venda(this, veiculo, valor, data, formapagamento);
    } else {
      console.log(
        `${this.nome} não tem renda suficiente para comprar o ${veiculo.modelo}.`,
      );
      return null;
    }
  }
  vender() {
    if (this.veiculo) {
      console.log(`${this.nome} vendeu o veículo ${this.veiculo.modelo}.`);
      this.veiculo = null;
    } else {
      console.log(`${this.nome} não possui nenhum veículo para vender.`);
    }
  }
  testedrive(veiculo) {
    console.log(`O cliente ${this.nome} está testando o ${veiculo.modelo}.`);
  }
}

class Venda {
  constructor(cliente, veiculo, valorvenda, datavenda, formapagamento) {
    this.cliente = cliente;
    this.veiculo = veiculo;
    this.datavenda = datavenda;
    this.valorvenda = valorvenda;
    this.formapagamento = formapagamento;
  }
  exibirDetalhes() {
    console.log(`
      Data da venda: ${this.datavenda}
      Valor da venda: ${this.valorvenda}
      Forma de pagamento: ${this.formapagamento}
      Veículo: ${this.veiculo.modelo}
      Cliente: ${this.cliente.nome}
    `);
  }
  aprovarvenda() {
    console.log(`A venda foi aprovada.`);
  }
  reprovarvenda() {
    console.log(`A venda foi reprovada.`);
  }
}

const cliente1 = new Cliente("Carlos", 33, "123456789", 50000);
cliente1.exibirDetalhes();

const veiculo1 = new Veiculo("Toyota", "Corolla", 2022);
veiculo1.exibirDetalhes();

const venda1 = cliente1.comprar(
  veiculo1,
  12000,
  "10-05-2025",
  "Cartão de Crédito",
);

if (venda1) {
  if (cliente1.renda >= venda1.valorvenda) {
    venda1.aprovarvenda();
    venda1.exibirDetalhes();
  } else {
    venda1.reprovarvenda();
  }
} else {
  console.log("Venda não realizada.");
}
cliente1.exibirDetalhes();
cliente1.vender();
cliente1.exibirDetalhes();

//___________________________________________________________________________________________________________
//                                              OBJETOS
//___________________________________________________________________________________________________________

let carro = {
  portas: 4,
  cor: "verde",
  opicionais: ["teto solar", "blindagem", "ar condicionado"],
  revisado: true,
};
console.log("C A R R O");
console.log(`Quantas portas: ${carro.portas}`);
console.log(`Cor do carro: ${carro["cor"]}`);
console.log(`Veículo revisado: ${carro.revisado}`);
console.log(`Opcionais: ${carro.opicionais}`);

if (carro.revisado == true) {
  console.log("O veículo já foi revisado");
} else {
  console.log("O veículo ainda não foi revisado");
}

let maquina = {
  material: "aço inox",
  equipamentos: ["motor", "freio", "esteira", "cilindro"],
  vaiMontada: true,
  numeroDeMotores: 1,
};
console.log("\nM A Q U I N A");
console.log(`Objeto Máquina: ${maquina}`);
console.log(`Material: ${maquina.material}`);
console.log(`Todos equipamentos: ${maquina.equipamentos}`);
console.log(`Equipamento específico: ${maquina.equipamentos[2]}`);

for (let i = 0; i < maquina.equipamentos.length; i++) {
  console.log(`Equipamento (for): ${maquina.equipamentos[i]}`);
}

if (maquina.vaiMontada == false) {
  console.log("O comprador precisa montar a máquina");
} else {
  console.log("A máquina já está montada\n");
}

const robo = {
  bracos: 4,
  pernas: 2,
  arma: "metralhadora",
  armaEspecial: "lança-chamas",
  atirar: function () {
    console.log("Pew pew pew!");
  },
  falar: function () {
    console.log("Olá, eu sou um robô!");
  },
  caminhar: function () {
    console.log("Estou caminhando...");
  },
};
console.log("R O B O");
robo.atirar();
robo.caminhar();
robo.falar();

//___________________________________________________________________________________________________________
//                                              CLASSES E OBJETOS
//___________________________________________________________________________________________________________

class Curso {
  constructor(nome, codigo, professor) {
    this.nome = nome;
    this.codigo = codigo;
    this.professor = professor;
    this.matriculas = [];
  }

  matricular(aluno) {
    this.matriculas.push(aluno);
    console.log(`${aluno.nome} matriculado no curso ${this.nome}`);
  }

  exibirDetalhes() {
    console.log(`
      Curso: ${this.nome}
      Código: ${this.codigo}
      Professor: ${this.professor.nome}
      Matrículas: ${this.matriculas.map((aluno) => aluno.nome).join(", ")}
    `);
  }
}

class Aluno {
  constructor(nome, matricula) {
    this.nome = nome;
    this.matricula = matricula;
    this.cursos = [];
  }

  adicionarCurso(curso) {
    this.cursos.push(curso);
  }

  exibirDetalhes() {
    console.log(`
      Aluno: ${this.nome}
      Matrícula: ${this.matricula}
      Cursos: ${this.cursos.map((curso) => curso.nome).join(", ")}
    `);
  }
}

class Professor {
  constructor(nome, departamento) {
    this.nome = nome;
    this.departamento = departamento;
  }
}

const curso1 = new Curso(
  "Programação",
  "PROG101",
  new Professor("João Silva", "Ciência da Computação"),
);
const aluno1 = new Aluno("Maria", "12345");
const aluno2 = new Aluno("Pedro", "67890");

curso1.exibirDetalhes();
aluno1.exibirDetalhes();
aluno2.exibirDetalhes();

curso1.matricular(aluno1);
curso1.matricular(aluno2);

aluno1.adicionarCurso(curso1);
aluno2.adicionarCurso(curso1);

curso1.exibirDetalhes();

aluno1.exibirDetalhes();
aluno2.exibirDetalhes();

//___________________________________________________________________________________________________________
//                                              CRIANDO MÉTODOS
//___________________________________________________________________________________________________________

let pessoa = {
  nome: "Isabella",
  idade: 20,
  falar: function () {
    console.log("Oi, meu nome é Isabella");
  },
  aniversario() {
    this.idade += 1;
  },
  dizerIdade() {
    console.log("A minha idade é " + this.idade);
  },
  podeDirigir: function () {
    if (this.idade >= 18) {
      console.log("Pode dirigir");
    } else {
      console.log("Ainda não pode dirigir");
    }
  },
};

console.log(pessoa.idade);
pessoa.aniversario();
console.log(pessoa.idade);

pessoa.aniversario();
console.log(pessoa.idade);
pessoa.dizerIdade();
pessoa.podeDirigir();

let calculadora = {
  numeros: 0,
  somar: function (a, b) {
    this.numeros = a + b;
  },
  subtracao: function (a) {
    this.numeros -= a;
  },
};
calculadora.somar(2, 4);
console.log(calculadora.numeros);
calculadora.subtracao(5);
console.log(calculadora.numeros);

// Ex usando oque foi ensinado acima
let pet = {
  nome: "Rex",
  tipo: "Cachorro",
  idade: 3,
  cor: "marrom",
  fome: true,
  energia: 100,

  brincar() {
    this.energia -= 20;
    console.log(`${this.nome} está brincando! Energia: ${this.energia}`);
  },

  dormir() {
    this.energia = 100;
    console.log(`${this.nome} está dormindo... ZzZz`);
  },

  comer() {
    if (this.fome) {
      console.log(`${this.nome} está comendo!`);
      this.fome = false;
    } else {
      console.log(`${this.nome} não está com fome`);
    }
  },

  latir() {
    console.log("Au au!");
  },

  status() {
    console.log(
      `Nome: ${this.nome}, Energia: ${this.energia}, Fome: ${this.fome}`,
    );
  },
};
pet.status();
pet.brincar();
pet.latir();
pet.comer();

pet.dormir();
pet.status();

pet.brincar();
pet.brincar();

pet.dormir();
pet.status();

//___________________________________________________________________________________________________________
//                                              AÇÕES DE OBJETOS
//___________________________________________________________________________________________________________

//Obj dentro de obj
let pessoa = {
  nome: "Matheus",
  caracteristicas: {
    olhos: "verdes",
    cabelo: "preto",
    brincos: false,
    oculos: false,
    cnh: true,
    carteira: ["dinheiro", "documento", "moeda"],
  },
};
console.log(pessoa.caracteristicas.cabelo);
console.log(pessoa.caracteristicas);
console.log(pessoa.caracteristicas.carteira[2]);

// Delete e Add propriedades ao obj ao longo do código
let pessoa = {
  nome: "Joao",
};
console.log(pessoa);

pessoa.idade = 29;
pessoa.falar = function () {
  console.log("Olá, eu tenho " + this.idade + " anos");
};
console.log(pessoa);
pessoa.falar();
delete pessoa.idade;
console.log(pessoa);

let carro = {
  tipo: "SUV",
};
carro.portas = 4;
console.log(carro.portas);
console.log(carro);

if (carro.tipo === "SUV") {
  carro.tetosolar = true;
}
console.log(carro);
carro.acelerar = function () {
  console.log("Vrummmm");
};
carro.acelerar();

// Sintaxe de object literal
const pessoa = {
  nome: "João",
  idade: 30,
  falar: function () {
    console.log("Olá!");
  },
};

// Destructuring - Colocar propriedades de objetos ou arrays em variáveis
const pessoa = {
  nome: "Ana",
  idade: 25,
};

const { nome, idade } = pessoa; //const nome = pessoa.nome; const idade = pessoa.idade;

console.log(nome);
console.log(idade);

//Constructor functions - Outra forma de criar obj
function Pessoa(nome) {
  this.nome = nome;
}
let pessoa11 = new Pessoa("Luan");
let pessoa22 = new Pessoa("Juan");
console.log(pessoa11.nome);
console.log(pessoa22.nome);

//Functions que retornam objs
function criarPessoa(nome) {
  return {
    nome: nome,
  };
}
let pessoa3 = criarPessoa("Gale");
let pessoa4 = criarPessoa("Carl");
console.log(pessoa3.nome);
console.log(pessoa4.nome);

//Obj global
var teste = "teste";
console.log(teste);
console.log(window.teste);
console.log(this.teste);

//Propriedade constructor
function newObj(x) {
  return {
    x: x,
  };
}
let y = newObj(1);

function NewObjTwo(x) {
  this.x = x;
}
let z = new NewObjTwo(2);

console.log(y.constructor);
console.log(z.constructor);

//Operador instanceof
function Robo(nome, arma) {
  this.nome = nome;
  this.arma = arma;
}

function Humano(nome) {
  this.nome = nome;
}
let android = new Robo("Xyz", "Punhos");

console.log(android instanceof Robo);
console.log(android instanceof Humano);

//Passando referencia de obj
let obj = {
  teste: 1,
};
console.log(obj.teste);

let copia = obj;
copia.teste = 2;
console.log(obj.teste);

// Ex usando oque foi ensinado acima
function animal(nome, tipo) {
  this.nome = nome;
  this.tipo = tipo;
}

let animal1 = new animal("Hanna", "Cachorro");
console.log(animal1.nome);
console.log(animal1.tipo);

//___________________________________________________________________________________________________________
//                                              ENCAPSULAMENTO
//
// Agrupa dados e métodos em uma única unidade (classe), ocultando detalhes de implementação
// e protegendo o estado interno contra modificações indevidas
//___________________________________________________________________________________________________________

class ContaBancaria {
  #saldo = 0; // Atributo privado (#)

  depositar(valor) {
    if (valor > 0) {
      this.#saldo += valor;
    }
  }

  retirar(valor) {
    if (valor <= this.#saldo) {
      this.#saldo -= valor;
    }
  }
  mostrarSaldo() {
    return `Saldo: ${this.#saldo}`;
  }
}

const conta = new ContaBancaria();
conta.depositar(100);
console.log(conta.mostrarSaldo()); // "Saldo: 100"
conta.retirar(50);
console.log(conta.mostrarSaldo()); // "Saldo: 50"
// Aqui se o usuário tentar acessar conta.#saldo diretamente, ele receberá um erro, pois é um atributo privado e não pode ser acessado fora da classe

//___________________________________________________________________________________________________________
//                                              AGREGAÇÃO
//___________________________________________________________________________________________________________

class Livro {
  constructor(titulo) {
    this.titulo = titulo;
  }
}
class Autor {
  constructor(nome) {
    this.nome = nome;
    this.livros = [];
  }
  adicionarLivro(livro) {
    this.livros.push(livro);
  }
}

const autor = new Autor("J.K. Rowling");
const livro1 = new Livro("Harry Potter e a Pedra Filosofal");
const livro2 = new Livro("Harry Potter e a Câmara Secreta");

autor.adicionarLivro(livro1);
autor.adicionarLivro(livro2);

console.log(autor.livros.map((livro) => livro.titulo)); // ["Harry Potter e a Pedra Filosofal", "Harry Potter e a Câmara Secreta"]

//___________________________________________________________________________________________________________
//                                              HERANÇA
//___________________________________________________________________________________________________________

class Animal {
  fazerSom() {
    return "Som genérico";
  }
}
class Cachorro extends Animal {
  fazerSom() {
    return "Au au!";
  }
}
const cachorro = new Cachorro();
console.log(cachorro.fazerSom()); // "Au au!"

//___________________________________________________________________________________________________________
//                                              POLIMORFISMO
//___________________________________________________________________________________________________________

class Forma {
  calcularArea() {
    return 0;
  }
}
class Retangulo extends Forma {
  constructor(base, altura) {
    super();
    this.base = base;
    this.altura = altura;
  }
  calcularArea() {
    return this.base * this.altura;
  }
}
class Circulo extends Forma {
  constructor(raio) {
    super();
    this.raio = raio;
  }
  calcularArea() {
    return Math.PI * Math.pow(this.raio, 2);
  }
}

const retangulo = new Retangulo(5, 10);
const circulo = new Circulo(7);

console.log(retangulo.calcularArea()); // "50"
console.log(circulo.calcularArea()); // "153.93804002589985"

//___________________________________________________________________________________________________________
//                                              EXERCÍCIOS em Js 29/05/2025
//___________________________________________________________________________________________________________

//Ex1
let gato = {
  nome: "Toby",
  idade: 2,
  fome: true,
  miar: function () {
    console.log("Miau!");
  },
};
console.log(gato.nome);
console.log(gato.idade);
console.log(gato.fome);
gato.miar();

//Ex2
let pessoa = {
  nome: "Yuri",
  falar: function () {
    console.log("Olá, eu sou " + this.nome);
  },
};
console.log(pessoa.nome);
pessoa.falar();

//Ex3 Ex4 Ex5
let inimigo = {
  nome: "Sasuke",
  vivo: true,
};

function Ninja(nome, shuriken) {
  this.nome = nome;
  this.shuriken = shuriken;

  this.atirarShuriken = function () {
    console.log("Shuriken atirada!");
    this.shuriken -= 1;

    inimigo.vivo = false;
    console.log("Inimigo MORTO!");

    if (this.shuriken === 0) {
      console.log("Você não tem mais shurikens!");
    }
  };
}

let ninja1 = new Ninja("Naruto", 5);
console.log(ninja1.nome);
console.log(ninja1.shuriken);

ninja1.atirarShuriken();
console.log(ninja1.shuriken);

//Ex6
function verificarInstancia(obj1, obj2) {
  if (obj1 instanceof obj2.constructor) {
    console.log(
      "POSITIVO = obj1 É instância da função construtora que criou obj2",
    );
    return true;
  } else {
    console.log(
      "NEGATIVO = obj1 NÃO é instância da função construtora que criou obj2",
    );
    return false;
  }
}

function pessoa(nome) {
  this.nome = nome;
}
function carro(marca) {
  this.marca = marca;
}
let pessoa12 = new pessoa("Luan");
let pessoa23 = new pessoa("Juan");
let carro1 = new carro("Toyota");
verificarInstancia(pessoa12, pessoa23);
verificarInstancia(pessoa12, carro1);

//Ex7
const humano = {
  nome: "João",
  idade: 30,
  falar: function () {
    console.log("Olá!");
  },
};
const cachorro1 = {
  nome: "Rex",
  idade: 5,
  latir: function () {
    console.log("Au au!");
  },
};

let propriedadesRepeat = [];

for (let i in humano) {
  if (i in cachorro1) {
    propriedadesRepeat.push(i);
  }
}

if (propriedadesRepeat.length === 0) {
  console.log("Não há propriedades comuns");
} else {
  console.log("Propriedades comuns: ", propriedadesRepeat);
}

//Ex8
let caminhao = {
  cor: "prata",
  porte: "médio",
  motor: "V8",
  portas: 2,
  rodas: 4,
};
const { cor, porte, motor, portas, rodas } = caminhao;
console.log(cor);
console.log(porte);
console.log(motor);
console.log(portas);
console.log(rodas);
