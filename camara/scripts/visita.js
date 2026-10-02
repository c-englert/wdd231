// Mensagem sobre o intervalo entre as visitas (localStorage)
const CHAVE_VISITA = "camara-ultima-visita";
const MS_POR_DIA = 24 * 60 * 60 * 1000;

const areaMensagem = document.querySelector(".mensagem-visita");
const textoMensagem = areaMensagem.querySelector("p");
const botaoFechar = areaMensagem.querySelector("button");

function montarMensagem(ultimaVisita, agora) {
  if (!ultimaVisita) {
    return "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
  }

  const dias = Math.floor((agora - ultimaVisita) / MS_POR_DIA);

  if (dias < 1) {
    return "Já voltou? Que legal!";
  }

  return `Seu último acesso foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
}

const agora = Date.now();
const ultimaVisita = Number(localStorage.getItem(CHAVE_VISITA));

textoMensagem.textContent = montarMensagem(ultimaVisita, agora);
localStorage.setItem(CHAVE_VISITA, agora);

botaoFechar.addEventListener("click", () => {
  areaMensagem.hidden = true;
});
