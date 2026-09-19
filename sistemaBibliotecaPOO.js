//CLASSE AUTOR
class Autor {
  constructor(nome, nacionalidade) {
    this._nome = nome; // não ta privado mas deve ser tratada como privada (_)
    this._nacionalidade = nacionalidade;
  }

  get nome() {
    return this._nome;
  }

  exibirInfo() {
    return `${this._nome} (${this._nacionalidade})`;
  }
}

//CLASSE LIVRO
class Livro {
  #disponivel = true; // encapsulamento: campo privado

  constructor(titulo, autor, anoPublicacao) {
    this.titulo = titulo;
    this.autor = autor; // agregação: Livro possui Autor
    this.anoPublicacao = anoPublicacao;
  }

  get disponivel() {
    return this.#disponivel;
  }

  emprestar() {
    if (this.#disponivel) {
      this.#disponivel = false;
      return true;
    }
    return false;
  }

  devolver() {
    this.#disponivel = true;
  }

  exibirInfo() {
    return `Título do livro: ${this.titulo} - Autor: ${this.autor.nome} - Livro ${this.#disponivel ? "Disponível" : "Indisponível"}`;
  }
}

//CLASSE USUARIO
class Usuario {
  constructor(nome, id) {
    this.nome = nome;
    this.id = id;
    this.livrosEmprestados = []; // agregação: Usuário tem uma lista de livros emprestados
  }

  pegarEmprestado(livro) {
    if (livro.disponivel) {
      const dataEmprestimo = new Date();
      const dataDevolucao = new Date();
      dataDevolucao.setDate(dataEmprestimo.getDate() + 7);

      this.livrosEmprestados.push({
        livro: livro,
        dataEmprestimo: dataEmprestimo,
        dataDevolucao: dataDevolucao,
      });

      livro.emprestar(); // interação entre objetos
    } else {
      console.log("O livro está indisponível");
    }
  }

  devolverLivro(livro) {
    const index = this.livrosEmprestados.findIndex(
      (registro) => registro.livro === livro,
    );
    if (index > -1) {
      this.livrosEmprestados.splice(index, 1);
      livro.devolver();
    }
  }

  exibirInfo() {
    if (this.livrosEmprestados.length === 0) {
      return `Usuário: ${this.nome} | Nenhum livro emprestado.`;
    } else {
      const detalhes = this.livrosEmprestados
        .map((registro) => {
          const livro = registro.livro;
          const dataEmprestimo = registro.dataEmprestimo.toLocaleDateString();
          const dataDevolucao = registro.dataDevolucao.toLocaleDateString();
          return `${livro.titulo} (Empréstimo: ${dataEmprestimo}, Devolução: ${dataDevolucao})`;
        })
        .join(", ");
      return `Usuário: ${this.nome} | Livros emprestados: ${detalhes}`;
    }
  }
}

//CLASSE BIBLIOTECA
class Biblioteca {
  constructor() {
    this.usuarios = []; // agregação: Biblioteca possui múltiplos Usuários
    this.livros = []; // agregação: Biblioteca possui múltiplos Livros
  }

  adicionarLivro(livro) {
    this.livros.push(livro);
  }

  adicionarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  buscarLivroPorTitulo(titulo) {
    return this.livros.find((livro) => livro.titulo === titulo);
  }
}

//CLASSE LIVRO DIDATICO
class LivroDidatico extends Livro {
  // herança: LivroDidatico estende Livro e adiciona disciplina
  constructor(titulo, autor, anoPublicacao, disciplina) {
    super(titulo, autor, anoPublicacao);
    this.disciplina = disciplina;
  }

  // polimorfismo: sobrescrita do método exibirInfo para incluir disciplina
  exibirInfo() {
    return `${super.exibirInfo()} - Disciplina: ${this.disciplina}`;
  }
}

//CLASSE FUNCIONARIO
class Funcionario extends Usuario {
  // herança: Funcionario estende Usuario
  constructor(nome, id) {
    super(nome, id); // herda atributos e métodos de Usuario
  }

  cadastrarLivro(livro, biblioteca) {
    biblioteca.adicionarLivro(livro);
    console.log(
      `Livro "${livro.titulo}" cadastrado na biblioteca por ${this.nome}.`,
    );
  }
}

//FUNÇÃO EXIBIR DETALHES
function exibirDetalhes(item) {
  console.log(item.exibirInfo()); // polimorfismo: exibirInfo funciona para diferentes classes
}

//TESTES
const autor1 = new Autor("Dante Alighieri", "Italiano");
const autor2 = new Autor("Marilena Chauí", "Brasileira");

const livro1 = new Livro("A Divina Comédia", autor1, 1304);
const livro2 = new LivroDidatico(
  "Convite à Filosofia",
  autor2,
  1995,
  "Filosofia",
);

const usuario1 = new Usuario("Igor", 1);

const biblioteca = new Biblioteca();
biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarUsuario(usuario1);

const busca = biblioteca.buscarLivroPorTitulo("A Divina Comédia");
if (busca) {
  console.log("Livro encontrado na biblioteca:", busca.exibirInfo());
} else {
  console.log("Livro não encontrado na biblioteca.");
}
console.log("");

exibirDetalhes(usuario1);
exibirDetalhes(livro1);
console.log("");

usuario1.pegarEmprestado(livro1);
exibirDetalhes(usuario1);
exibirDetalhes(livro1);
console.log("");

usuario1.pegarEmprestado(livro2);
exibirDetalhes(usuario1);
console.log("");

const funcionario1 = new Funcionario("Lana", 2);
const livro3 = new Livro("Vida Nova", autor1, 1295);

funcionario1.cadastrarLivro(livro3, biblioteca);
console.log("");

usuario1.pegarEmprestado(livro3);
exibirDetalhes(usuario1);
console.log("");

usuario1.devolverLivro(livro1);
exibirDetalhes(usuario1);
exibirDetalhes(livro1);
console.log("");

const usuario2 = new Usuario("Yuri", 3);
biblioteca.adicionarUsuario(usuario2);
usuario2.pegarEmprestado(livro2);

/*
Herança: Classe filha herda características da classe pai
Polimorfismo: Mesmo método funciona diferente em classes diferentes
Encapsulamento: Esconder dados internos, permitindo acesso somente atraves de métodos
Agregação: Uma classe usa objetos de outra classe como parte dela, mas são independentes
*/
