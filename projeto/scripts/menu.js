export function iniciarMenu() {
  const botao = document.querySelector(".botao-menu");
  const menu = document.querySelector(".menu-principal");
  if (!botao || !menu) return;
  botao.addEventListener("click", () => {
    const aberto = botao.getAttribute("aria-expanded") === "true";
    botao.setAttribute("aria-expanded", String(!aberto));
    menu.classList.toggle("aberto", !aberto);
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      botao.setAttribute("aria-expanded", "false");
      menu.classList.remove("aberto");
    }),
  );
}
