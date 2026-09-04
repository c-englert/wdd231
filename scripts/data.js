const anoAtual = new Date().getFullYear();
document.querySelector("#anoAtual").textContent = anoAtual;

document.querySelector("#ultimaModificacao").textContent =
  `Última modificação: ${document.lastModified}`;
