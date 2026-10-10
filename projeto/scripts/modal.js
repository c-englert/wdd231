import { escaparHTML, nomeCategoria } from "./dados.js";
export function configurarModal(comparacoes) {
  const dialogo = document.querySelector("#dialog-comparacao");
  const conteudo = dialogo?.querySelector(".conteudo-modal");
  const botaoFechar = dialogo?.querySelector(".fechar-modal");
  if (!dialogo || !conteudo || !botaoFechar) return;
  document.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-comparacao-id]");
    if (!botao) return;
    const comparacao = comparacoes.find(
      ({ id }) => id === Number(botao.dataset.comparacaoId),
    );
    if (!comparacao) return;
    const { mundo, alegrete, descricao, categoria } = comparacao;
    conteudo.innerHTML = `<div class="modal-imagens"><figure><img src="${escaparHTML(mundo.imagem)}" alt="${escaparHTML(mundo.nome)}, ${escaparHTML(mundo.local)}"><figcaption>${escaparHTML(mundo.nome)} — ${escaparHTML(mundo.local)}</figcaption></figure><figure><img src="${escaparHTML(alegrete.imagem)}" alt="${escaparHTML(alegrete.nome)}, Alegrete"><figcaption>${escaparHTML(alegrete.nome)} — Alegrete</figcaption></figure></div><div class="modal-texto"><span class="etiqueta">${nomeCategoria(categoria)}</span><h2 id="modal-titulo">${escaparHTML(mundo.nome)} <span aria-hidden="true">↔</span> ${escaparHTML(alegrete.nome)}</h2><p class="modal-local">${escaparHTML(mundo.local)}, ${escaparHTML(mundo.pais)} encontra o Alegrete.</p><p>${escaparHTML(descricao)}</p></div>`;
    dialogo.showModal();
  });
  botaoFechar.addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
}
