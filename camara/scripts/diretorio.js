const urlMembros = "dados/membros.json";
const secaoMembros = document.querySelector("#membros");
const botaoGrade = document.querySelector("#ver-grade");
const botaoLista = document.querySelector("#ver-lista");

const nomesDeNivel = { 1: "Membro", 2: "Prata", 3: "Ouro" };

// "(51) 3226-1180" -> "+555132261180"
const paraLinkDeTelefone = (telefone) => `+55${telefone.replace(/\D/g, "")}`;

// "https://www.padariacaisdoporto.com.br" -> "padariacaisdoporto.com.br"
const paraTextoDeSite = (site) => site.replace(/^https?:\/\/(www\.)?/, "");

async function obterMembros() {
  try {
    const resposta = await fetch(urlMembros);
    if (!resposta.ok) {
      throw new Error(`Não foi possível carregar o diretório (erro ${resposta.status}).`);
    }
    const dados = await resposta.json();
    exibirMembros(dados.membros);
  } catch (erro) {
    const aviso = document.createElement("p");
    aviso.className = "erro";
    aviso.textContent = `${erro.message} Recarregue a página em alguns instantes.`;
    secaoMembros.appendChild(aviso);
  }
}

function criarCartao(membro) {
  const cartao = document.createElement("article");
  cartao.className = "membro";

  const imagem = document.createElement("img");
  imagem.setAttribute("src", `imagens/membros/${membro.imagem}`);
  imagem.setAttribute("alt", `Marca da empresa ${membro.nome}`);
  imagem.setAttribute("loading", "lazy");
  imagem.setAttribute("width", "400");
  imagem.setAttribute("height", "300");

  const dados = document.createElement("div");
  dados.className = "dados";

  const nome = document.createElement("h2");
  nome.textContent = membro.nome;

  const slogan = document.createElement("p");
  slogan.className = "slogan";
  slogan.textContent = membro.slogan;

  const setor = document.createElement("p");
  setor.className = "setor";
  setor.textContent = `${membro.setor} · desde ${membro.desde}`;

  const endereco = document.createElement("p");
  endereco.className = "endereco";
  endereco.textContent = membro.endereco;

  const contato = document.createElement("p");
  contato.className = "contato";

  const telefone = document.createElement("a");
  telefone.setAttribute("href", `tel:${paraLinkDeTelefone(membro.telefone)}`);
  telefone.textContent = membro.telefone;

  const email = document.createElement("a");
  email.setAttribute("href", `mailto:${membro.email}`);
  email.textContent = membro.email;

  const site = document.createElement("a");
  site.setAttribute("href", membro.site);
  site.setAttribute("rel", "noopener");
  site.textContent = paraTextoDeSite(membro.site);

  contato.appendChild(telefone);
  contato.appendChild(document.createTextNode(" · "));
  contato.appendChild(email);
  contato.appendChild(document.createTextNode(" · "));
  contato.appendChild(site);

  const descricao = document.createElement("p");
  descricao.className = "descricao";
  descricao.textContent = membro.descricao;

  const selo = document.createElement("p");
  selo.className = `selo selo-${membro.nivel}`;
  selo.textContent = nomesDeNivel[membro.nivel];

  dados.appendChild(nome);
  dados.appendChild(slogan);
  dados.appendChild(setor);
  dados.appendChild(endereco);
  dados.appendChild(contato);
  dados.appendChild(descricao);
  dados.appendChild(selo);

  cartao.appendChild(imagem);
  cartao.appendChild(dados);

  return cartao;
}

function exibirMembros(membros) {
  membros.forEach((membro) => secaoMembros.appendChild(criarCartao(membro)));
}

function definirVisualizacao(modo) {
  const emGrade = modo === "grade";

  secaoMembros.classList.toggle("grade", emGrade);
  secaoMembros.classList.toggle("lista", !emGrade);

  botaoGrade.classList.toggle("ativo", emGrade);
  botaoLista.classList.toggle("ativo", !emGrade);

  botaoGrade.setAttribute("aria-pressed", emGrade);
  botaoLista.setAttribute("aria-pressed", !emGrade);
}

botaoGrade.addEventListener("click", () => definirVisualizacao("grade"));
botaoLista.addEventListener("click", () => definirVisualizacao("lista"));

obterMembros();
