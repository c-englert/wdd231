const parametros = new URLSearchParams(window.location.search);

function mostrar(id, valor) {
  document.querySelector(`#${id}`).textContent = valor || "—";
}

const nomeCompleto = `${parametros.get("nome") ?? ""} ${parametros.get("sobrenome") ?? ""}`.trim();
mostrar("r-nome", nomeCompleto);
mostrar("r-email", parametros.get("email"));
mostrar("r-celular", parametros.get("celular"));
mostrar("r-organizacao", parametros.get("organizacao"));

const registro = parametros.get("timestamp");
const data = registro ? new Date(registro) : null;
mostrar(
  "r-data",
  data && !isNaN(data)
    ? data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
    : ""
);
