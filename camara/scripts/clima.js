// Clima de Porto Alegre com a API do OpenWeatherMap
const CHAVE_API = "c626208c4427536fdd45523a295887cf";
const LAT = -30.0346;
const LON = -51.2177;
const PARAMETROS = `lat=${LAT}&lon=${LON}&units=metric&lang=pt_br&appid=${CHAVE_API}`;

const urlAtual = `https://api.openweathermap.org/data/2.5/weather?${PARAMETROS}`;
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?${PARAMETROS}`;

const temperatura = document.querySelector("#clima-temperatura");
const descricao = document.querySelector("#clima-descricao");
const icone = document.querySelector("#clima-icone");
const listaPrevisao = document.querySelector("#clima-previsao");

async function buscarJson(url) {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(await resposta.text());
  }
  return resposta.json();
}

function exibirClimaAtual(dados) {
  const tempo = dados.weather[0];
  temperatura.textContent = Math.round(dados.main.temp);
  descricao.textContent = tempo.description;
  icone.src = `https://openweathermap.org/img/wn/${tempo.icon}@2x.png`;
  icone.alt = tempo.description;
  icone.hidden = false;
}

// Converte o horário UTC da API para a data local da cidade (AAAA-MM-DD)
function dataLocal(segundosUtc, fusoSegundos) {
  return new Date((segundosUtc + fusoSegundos) * 1000).toISOString().slice(0, 10);
}

function exibirPrevisao(dados) {
  const fuso = dados.city.timezone;
  const hoje = dataLocal(Math.floor(Date.now() / 1000), fuso);
  const maximasPorDia = {};

  dados.list.forEach((item) => {
    const dia = dataLocal(item.dt, fuso);
    if (dia === hoje) return;
    maximasPorDia[dia] = Math.max(maximasPorDia[dia] ?? -Infinity, item.main.temp_max);
  });

  const nomeDoDia = new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: "UTC" });

  listaPrevisao.innerHTML = "";
  Object.keys(maximasPorDia).slice(0, 3).forEach((dia) => {
    const item = document.createElement("li");
    const rotulo = nomeDoDia.format(new Date(`${dia}T12:00:00Z`)).replace("-feira", "");
    item.innerHTML = `<span class="previsao-dia">${rotulo}</span>
      <strong>${Math.round(maximasPorDia[dia])} °C</strong>`;
    listaPrevisao.appendChild(item);
  });
}

async function carregarClima() {
  try {
    const [atual, previsao] = await Promise.all([buscarJson(urlAtual), buscarJson(urlPrevisao)]);
    exibirClimaAtual(atual);
    exibirPrevisao(previsao);
  } catch {
    descricao.textContent = "Não foi possível carregar o clima agora.";
  }
}

carregarClima();
