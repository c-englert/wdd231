const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");

botaoMenu.addEventListener("click", () => {
  const aberto = menuPrincipal.classList.toggle("aberto");
  botaoMenu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute(
    "aria-label",
    aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
  );
});
