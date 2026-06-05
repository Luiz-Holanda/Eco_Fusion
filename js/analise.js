(() => {
  const BIOMAS = {
    MT: "Cerrado / Amazônia",
    PA: "Amazônia",
    AM: "Amazônia",
    RO: "Amazônia",
    AC: "Amazônia",
    AP: "Amazônia",
    RR: "Amazônia",
    TO: "Cerrado",
    GO: "Cerrado",
    MS: "Cerrado / Pantanal",
    MG: "Cerrado / Mata Atlântica",
    BA: "Caatinga / Cerrado",
    SP: "Mata Atlântica / Cerrado",
    PR: "Mata Atlântica",
    SC: "Mata Atlântica",
    RS: "Pampa / Mata Atlântica",
    MA: "Cerrado / Amazônia",
    PI: "Caatinga / Cerrado",
    CE: "Caatinga",
    RN: "Caatinga",
    PB: "Caatinga",
    PE: "Caatinga / Mata Atlântica",
    AL: "Mata Atlântica",
    SE: "Mata Atlântica",
    ES: "Mata Atlântica",
    RJ: "Mata Atlântica",
    DF: "Cerrado",
  };

  const RISCO_POR_BIOMA = {
    Amazônia: [20, 55],
    Cerrado: [50, 90],
    "Cerrado / Amazônia": [40, 75],
    Caatinga: [45, 85],
    "Mata Atlântica": [10, 40],
    "Pampa / Mata Atlântica": [8, 30],
    "Mata Atlântica / Cerrado": [30, 65],
    Pantanal: [30, 65],
    "Cerrado / Pantanal": [35, 70],
    "Caatinga / Cerrado": [50, 85],
    "Cerrado / Mata Atlântica": [30, 65],
    "Caatinga / Mata Atlântica": [25, 60],
  };

  function gerarDadosTerreno(estado, latitude, longitude, areaHa) {
    const bioma = BIOMAS[estado] || "Cerrado";

    const faixa = RISCO_POR_BIOMA[bioma];
    if (!faixa) {
      console.error("Bioma sem faixa:", bioma);

      return {
        bioma,
        risco: 0,
        areaPreservacao: 0,
        areaApp: 0,
        totalProtegido: 0,
        areaUtilizavel: 0,
        areaUtilizavelHa: 0,
      };
    }
    const risco =
      Math.floor(Math.random() * (faixa[1] - faixa[0] + 1)) + faixa[0];

    const areaPreservacao = Number((Math.random() * 35 + 5).toFixed(1));

    const areaApp = Number((Math.random() * 15 + 5).toFixed(1));

    const totalProtegido = Math.min(areaPreservacao + areaApp, 60).toFixed(1);

    const areaUtilizavel = Number((100 - totalProtegido).toFixed(1));

    return {
      bioma,

      risco,

      areaPreservacao,

      areaApp,

      totalProtegido,

      areaUtilizavel,

      areaUtilizavelHa: Number(((areaHa * areaUtilizavel) / 100).toFixed(2)),
    };
  }

  const formulario = document.getElementById("formAnalise");

  const resultado = document.getElementById("resultadoAnalise");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const endereco = document.getElementById("endereco").value.trim();

    const estado = document.getElementById("estado").value.trim().toUpperCase();

    const latitudeInput = document.getElementById("latitude").value.trim();

    const longitudeInput = document.getElementById("longitude").value.trim();

    const areaInput = document.getElementById("area").value.trim();
  if (estado.length !== 2 || !BIOMAS[estado]) {

    alert("Estado inválido.");

    return;

    }
    if (
      endereco === "" ||
      estado === "" ||
      latitudeInput === "" ||
      longitudeInput === "" ||
      areaInput === ""
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const latitude = Number(latitudeInput);
    const longitude = Number(longitudeInput);
    const area = Number(areaInput);

    const dados = gerarDadosTerreno(estado, latitude, longitude, area);

const nivel =
    dados.risco >= 70
    ? "ALTO"
    : dados.risco >= 40
    ? "MÉDIO"
    : "BAIXO";

    resultado.innerHTML = `

        <h3>Relatório Ambiental</h3>

        <p><strong>Endereço:</strong> ${endereco}</p>

        <p><strong>Bioma:</strong> ${dados.bioma}</p>

        <p><strong>Risco de queimadas:</strong> ${dados.risco}% (${nivel})</p>

        <hr>

        <h3>Área Utilizável</h3>

        <p>
            Área utilizável:
            ${dados.areaUtilizavelHa} ha
            (${dados.areaUtilizavel}%)
        </p>

        <p>
            Reserva Legal:
            ${dados.areaPreservacao}%
        </p>

        <p>
            APP:
            ${dados.areaApp}%
        </p>

        <p>
            Total protegido:
            ${dados.totalProtegido}%
        </p>

    `;
  });
  console.log("analise.js carregou");

  const formulario2 = document.getElementById("formAnalise");
  const resultado2 = document.getElementById("resultadoAnalise");

  console.log(formulario2);
  console.log(resultado2);

  formulario.addEventListener("submit", (event) => {
    console.log("submit disparado");

    event.preventDefault();
  });
})();
