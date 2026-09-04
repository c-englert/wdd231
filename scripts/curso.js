const cursos = [
  {
    assunto: "CSE",
    numero: 110,
    titulo: "Introduction to Programming",
    creditos: 2,
    certificado: "Web and Computer Programming",
    descricao:
      "Introduz o estudante à programação: variáveis, decisões, cálculos, laços, listas e entrada/saída.",
    tecnologia: ["Python"],
    concluido: true,
  },
  {
    assunto: "WDD",
    numero: 130,
    titulo: "Web Fundamentals",
    creditos: 2,
    certificado: "Web and Computer Programming",
    descricao:
      "Apresenta a World Wide Web e as carreiras de design e desenvolvimento de sites, com prática em HTML e CSS.",
    tecnologia: ["HTML", "CSS"],
    concluido: true,
  },
  {
    assunto: "CSE",
    numero: 111,
    titulo: "Programming with Functions",
    creditos: 2,
    certificado: "Web and Computer Programming",
    descricao:
      "Torna o programador mais organizado e eficiente ao pesquisar, escrever, chamar, depurar e testar funções.",
    tecnologia: ["Python"],
    concluido: true,
  },
  {
    assunto: "CSE",
    numero: 210,
    titulo: "Programming with Classes",
    creditos: 2,
    certificado: "Web and Computer Programming",
    descricao:
      "Introduz classes e objetos, encapsulamento em nível conceitual, herança e polimorfismo.",
    tecnologia: ["C#"],
    concluido: false,
  },
  {
    assunto: "WDD",
    numero: 131,
    titulo: "Dynamic Web Fundamentals",
    creditos: 2,
    certificado: "Web and Computer Programming",
    descricao:
      "Cria sites dinâmicos que usam JavaScript para responder a eventos e atualizar conteúdo.",
    tecnologia: ["HTML", "CSS", "JavaScript"],
    concluido: true,
  },
  {
    assunto: "WDD",
    numero: 231,
    titulo: "Frontend Web Development I",
    creditos: 2,
    certificado: "Web and Computer Programming",
    descricao:
      "Foco em experiência do usuário, acessibilidade, conformidade, otimização de desempenho e uso básico de APIs.",
    tecnologia: ["HTML", "CSS", "JavaScript"],
    concluido: false,
  },
];

const listaCursos = document.querySelector("#lista-cursos");
const totalCreditos = document.querySelector("#total-creditos");
const botoesFiltro = document.querySelectorAll(".filtro");

function montarCartao(curso) {
  const cartao = document.createElement("div");
  cartao.classList.add("curso");
  cartao.classList.add(curso.concluido ? "concluido" : "pendente");
  cartao.textContent = `${curso.assunto} ${curso.numero}`;
  cartao.setAttribute(
    "title",
    `${curso.titulo} — ${curso.creditos} créditos${
      curso.concluido ? " (concluído)" : ""
    }`
  );
  return cartao;
}

function exibirCursos(lista) {
  listaCursos.innerHTML = "";
  lista.forEach((curso) => listaCursos.appendChild(montarCartao(curso)));

  const soma = lista.reduce((total, curso) => total + curso.creditos, 0);
  totalCreditos.textContent = soma;
}

function filtrarCursos(assunto) {
  return assunto === "todos"
    ? cursos
    : cursos.filter((curso) => curso.assunto === assunto);
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    exibirCursos(filtrarCursos(botao.dataset.assunto));
  });
});

exibirCursos(cursos);
