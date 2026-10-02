import { lugares } from "../dados/lugares.mjs";

const areaLugares = document.querySelector("#lugares");

const linkDoMapa = (lugar) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lugar.nome}, Porto Alegre`)}`;

function criarCartao(lugar, indice) {
  const cartao = document.createElement("article");
  cartao.className = "lugar";

  const titulo = document.createElement("h2");
  titulo.textContent = lugar.nome;

  const figura = document.createElement("figure");
  const imagem = document.createElement("img");
  imagem.src = lugar.imagem;
  imagem.alt = lugar.alt;
  imagem.width = 300;
  imagem.height = 200;
  // A primeira foto é o maior elemento da tela (LCP): carrega já, com prioridade
  imagem.loading = indice === 0 ? "eager" : "lazy";
  if (indice === 0) {
    imagem.fetchPriority = "high";
  }
  const legenda = document.createElement("figcaption");
  legenda.textContent = `Foto: ${lugar.credito}`;
  figura.append(imagem, legenda);

  const endereco = document.createElement("address");
  endereco.textContent = lugar.endereco;

  const descricao = document.createElement("p");
  descricao.textContent = lugar.descricao;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "saiba-mais";
  botao.textContent = "Saiba mais";
  botao.setAttribute("aria-label", `Saiba mais sobre ${lugar.nome} (abre o mapa em nova aba)`);
  botao.addEventListener("click", () => window.open(linkDoMapa(lugar), "_blank", "noopener"));

  cartao.append(titulo, figura, endereco, descricao, botao);
  return cartao;
}

areaLugares.append(...lugares.map(criarCartao));
