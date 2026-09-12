const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

// Reserva: 11 links de imagem do JSON em português estão quebrados.
// A versão em inglês do mesmo JSON tem links que funcionam.
const urlIngles = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
let dadosIngles; // guarda a promise para buscar o JSON em inglês uma vez só

async function obterDadosDeProfetas() {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  // console.table(dados.profetas); // teste temporário de resposta de dados
  exibirProfetas(dados.profetas); // envia só o array, não o objeto inteiro
}

// "1805-12-23" -> "23 de dezembro de 1805"
// o "T00:00:00" evita que o fuso horário mude o dia
const formatarData = (dataISO) =>
  new Date(`${dataISO}T00:00:00`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// Procura a foto do mesmo profeta (pela ordem) no JSON em inglês
const buscarFotoReserva = async (ordem) => {
  if (!dadosIngles) {
    dadosIngles = fetch(urlIngles).then((resposta) => resposta.json());
  }
  const dados = await dadosIngles;
  const profetaIngles = dados.prophets.find((p) => Number(p.order) === Number(ordem));
  return profetaIngles ? profetaIngles.imageurl : null;
};

const exibirProfetas = (profetas) => {
  profetas.forEach((profeta) => {
    // Crie elementos para adicionar ao elemento div.cartoes
    let cartao = document.createElement('section');
    let nomeCompleto = document.createElement('h2');
    let nascimento = document.createElement('p');
    let localNascimento = document.createElement('p');
    let retrato = document.createElement('img');

    // Conteúdo do h2 com o nome completo do profeta
    nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

    // Data e local de nascimento
    nascimento.textContent = `Data de Nascimento: ${formatarData(profeta.nascimento)}`;
    localNascimento.textContent = `Local de Nascimento: ${profeta.localNascimento}`;

    // Se a imagem falhar, troca pela foto do JSON em inglês (once: tenta só uma vez)
    retrato.addEventListener('error', async () => {
      const fotoReserva = await buscarFotoReserva(profeta.ordem);
      if (fotoReserva) {
        retrato.setAttribute('src', fotoReserva);
      }
    }, { once: true });

    // Retrato com todos os atributos relevantes
    retrato.setAttribute('src', profeta.urlImagem);
    retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
    retrato.setAttribute('loading', 'lazy');
    retrato.setAttribute('width', '340');
    retrato.setAttribute('height', '440');

    // Acrescente a seção (cartao) com os elementos criados
    cartao.appendChild(nomeCompleto);
    cartao.appendChild(nascimento);
    cartao.appendChild(localNascimento);
    cartao.appendChild(retrato);

    cartoes.appendChild(cartao);
  }); // fim da arrow function e do loop forEach
};

obterDadosDeProfetas();
