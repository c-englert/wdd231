document.querySelector("#timestamp").value = new Date().toISOString();

document.querySelectorAll(".link-beneficios").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.getElementById(botao.dataset.modal).showModal();
  });
});

document.querySelectorAll(".modal-nivel").forEach((modal) => {
  modal.querySelector(".fechar-modal").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
});
