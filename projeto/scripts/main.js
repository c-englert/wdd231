import {
  buscarComparacoes,
  renderizarComparacoes,
  escaparHTML,
} from "./dados.js";
import { iniciarMenu } from "./menu.js";
import { configurarModal } from "./modal.js";
const CHAVE_ULTIMO_FILTRO = "mundo-alegrete:ultimo-filtro";
function definirAno() {
  document.querySelectorAll("[data-ano]").forEach((elemento) => {
    elemento.textContent = new Date().getFullYear();
  });
}
function iniciarFiltros(comparacoes, lista) {
  const botoes = [...document.querySelectorAll(".filtro")];
  const filtrosDisponiveis = botoes.map((botao) => botao.dataset.filtro);
  const aplicarFiltro = (filtro) => {
    const filtroValido = filtrosDisponiveis.includes(filtro) ? filtro : "todos";
    botoes.forEach((botao) => {
      const ativo = botao.dataset.filtro === filtroValido;
      botao.classList.toggle("ativo", ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    });
    renderizarComparacoes(
      lista,
      filtroValido === "todos"
        ? comparacoes
        : comparacoes.filter((item) => item.categoria === filtroValido),
    );
    try {
      localStorage.setItem(CHAVE_ULTIMO_FILTRO, filtroValido);
    } catch (erro) {
      console.warn("Não foi possível salvar o filtro escolhido.", erro);
    }
  };
  let filtroInicial = "todos";
  try {
    const filtroSalvo = localStorage.getItem(CHAVE_ULTIMO_FILTRO);
    if (filtrosDisponiveis.includes(filtroSalvo)) filtroInicial = filtroSalvo;
  } catch (erro) {
    console.warn("Não foi possível recuperar o último filtro.", erro);
  }
  aplicarFiltro(filtroInicial);
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => aplicarFiltro(botao.dataset.filtro));
  });
}
function iniciarFormulario() {
  const formulario = document.querySelector(".formulario");
  if (!formulario) return;
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const dados = new FormData(formulario);
    const parametros = new URLSearchParams({
      nome: dados.get("nome"),
      mundo: dados.get("mundo"),
      alegrete: dados.get("alegrete"),
    });
    window.location.href = `obrigado.html?${parametros}`;
  });
}
function mostrarResumoDoEnvio() {
  const parametros = new URLSearchParams(window.location.search);
  const nome = parametros.get("nome");
  const mundo = parametros.get("mundo");
  const alegrete = parametros.get("alegrete");
  if (nome)
    document.querySelectorAll("[data-nome]").forEach((elemento) => {
      elemento.textContent = nome;
    });
  const resumo = document.querySelector("#resumo-envio");
  if (resumo && mundo && alegrete) {
    resumo.innerHTML = `<p><strong>${escaparHTML(mundo)}</strong> ganhou um par no Alegrete: <strong>${escaparHTML(alegrete)}</strong>.</p>`;
    resumo.classList.add("mostrar");
  }
}
async function iniciarComparacoes() {
  const pagina = document.body.dataset.pagina;
  if (!["inicio", "comparacoes"].includes(pagina)) return;
  const lista = document.querySelector(
    pagina === "inicio" ? "#destaques" : "#lista-comparacoes",
  );
  if (!lista) return;
  try {
    const comparacoes = await buscarComparacoes();
    if (pagina === "inicio")
      renderizarComparacoes(lista, comparacoes.slice(0, 3));
    else iniciarFiltros(comparacoes, lista);
    configurarModal(comparacoes);
  } catch (erro) {
    lista.innerHTML =
      '<p class="sem-resultados">Não foi possível carregar as comparações agora. Tente atualizar a página.</p>';
    console.error(erro);
  }
}
iniciarMenu();
definirAno();
iniciarFormulario();
mostrarResumoDoEnvio();
iniciarComparacoes();
