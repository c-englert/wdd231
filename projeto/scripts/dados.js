export async function buscarComparacoes() {
  const resposta = await fetch("dados/comparacoes.json");
  if (!resposta.ok)
    throw new Error("Não foi possível carregar as comparações.");
  return resposta.json();
}
export function escaparHTML(valor = "") {
  return String(valor).replace(
    /[&<>'"]/g,
    (caractere) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        '"': "&quot;",
      })[caractere],
  );
}
export function nomeCategoria(categoria) {
  return (
    {
      natureza: "Natureza",
      monumento: "Monumento",
      arquitetura: "Arquitetura",
      cultura: "Cultura",
      "em-breve": "Em breve",
    }[categoria] || "Comparação"
  );
}
export function criarCartao(comparacao) {
  const mundo = comparacao.mundo;
  const alegrete = comparacao.alegrete;
  const imagens = comparacao.rascunho
    ? `<div class="imagem-rascunho"><span aria-hidden="true">✦</span><p>Imagem do mundo</p></div><div class="imagem-rascunho"><span aria-hidden="true">✦</span><p>Imagem do Alegrete</p></div>`
    : `<img src="${escaparHTML(mundo.imagem)}" alt="${escaparHTML(mundo.nome)}, ${escaparHTML(mundo.local)}" width="480" height="500" loading="lazy"><img src="${escaparHTML(alegrete.imagem)}" alt="${escaparHTML(alegrete.nome)}, Alegrete" width="480" height="500" loading="lazy">`;
  const acao = comparacao.rascunho
    ? '<p class="aviso-rascunho">Complete este rascunho no arquivo de dados.</p>'
    : `<button class="botao-detalhes" type="button" data-comparacao-id="${comparacao.id}">Ver a comparação</button>`;
  return `<article class="cartao-comparacao${comparacao.rascunho ? " cartao-rascunho" : ""}"><div class="imagens-comparacao">${imagens}<span class="selo-igual" aria-hidden="true">≈</span></div><div class="corpo-cartao"><span class="etiqueta">${nomeCategoria(comparacao.categoria)}</span><h3>${escaparHTML(mundo.nome)} <span aria-hidden="true">↔</span> ${escaparHTML(alegrete.nome)}</h3><p>${escaparHTML(mundo.local)}, ${escaparHTML(mundo.pais)}</p>${acao}</div></article>`;
}
export function renderizarComparacoes(container, comparacoes) {
  if (!comparacoes.length) {
    container.innerHTML =
      '<p class="sem-resultados">Ainda não há comparações nesta categoria. Escolha outro destino.</p>';
    return;
  }
  container.innerHTML = comparacoes.map(criarCartao).join("");
}
