// Empresas em destaque: 3 membros Ouro ou Prata sorteados a cada carregamento
const urlMembros = "dados/membros.json";
const areaDestaques = document.querySelector("#destaques");
const QUANTIDADE = 3;

const nomesDeNivel = { 2: "Prata", 3: "Ouro" };

// "(51) 3226-1180" -> "+555132261180"
const paraLinkDeTelefone = (telefone) => `+55${telefone.replace(/\D/g, "")}`;

// "https://www.exemplo.com.br" -> "exemplo.com.br"
const paraTextoDeSite = (site) => site.replace(/^https?:\/\/(www\.)?/, "");

// Embaralhamento de Fisher-Yates: cada ordem tem a mesma chance
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function criarDestaque(membro) {
  const cartao = document.createElement("article");
  cartao.className = "membro";

  const imagem = document.createElement("img");
  imagem.src = `imagens/membros/${membro.imagem}`;
  imagem.alt = `Marca da empresa ${membro.nome}`;
  imagem.loading = "lazy";
  imagem.width = 400;
  imagem.height = 300;

  const dados = document.createElement("div");
  dados.className = "dados";

  const nome = document.createElement("h3");
  nome.textContent = membro.nome;

  const endereco = document.createElement("p");
  endereco.className = "endereco";
  endereco.textContent = membro.endereco;

  const contato = document.createElement("p");
  contato.className = "contato";

  const telefone = document.createElement("a");
  telefone.href = `tel:${paraLinkDeTelefone(membro.telefone)}`;
  telefone.textContent = membro.telefone;

  const site = document.createElement("a");
  site.href = membro.site;
  site.rel = "noopener";
  site.textContent = paraTextoDeSite(membro.site);

  contato.append(telefone, document.createTextNode(" · "), site);

  const selo = document.createElement("p");
  selo.className = `selo selo-${membro.nivel}`;
  selo.textContent = nomesDeNivel[membro.nivel];

  dados.append(nome, endereco, contato, selo);
  cartao.append(imagem, dados);
  return cartao;
}

async function carregarDestaques() {
  try {
    const resposta = await fetch(urlMembros);
    if (!resposta.ok) {
      throw new Error();
    }
    const { membros } = await resposta.json();
    const ouroEPrata = membros.filter((membro) => membro.nivel >= 2);
    embaralhar(ouroEPrata)
      .slice(0, QUANTIDADE)
      .forEach((membro) => areaDestaques.appendChild(criarDestaque(membro)));
  } catch {
    const aviso = document.createElement("p");
    aviso.className = "erro";
    aviso.textContent = "Não foi possível carregar as empresas em destaque. Recarregue a página em alguns instantes.";
    areaDestaques.appendChild(aviso);
  }
}

carregarDestaques();
