//Quiz
const perguntas = [
    {
        pergunta: "Qual órgão brasileiro fornece dados sobre queimadas utilizados pelo Eco Fusion?",
        alternativas: ["IBGE", "INPE", "ANATEL", "MEC"],
        correta: 1
    },
    {
        pergunta: "O principal objetivo do Eco Fusion é:",
        alternativas: [
            "Monitorar derretimento de geleiras",
            "Analisar riscos ambientais de terrenos",
            "Analisar mudanças climáticas",
            "Resgatar animais em extinção"
        ],
        correta: 1
    },
    {
        pergunta: "Segundo dados do INPE, qual bioma brasileiro costuma registrar os maiores números de focos de queimadas?",
        alternativas: [
            "Cerrado",
            "Mata Atlântica",
            "Pampa",
            "Pantanal"
        ],
        correta: 0
    },
    {
        pergunta: "O que significa APP em um terreno?",
        alternativas: [
            "Área Particular Permanente",
            "Aplicação de Produção Primária",
            "Área de Preservação Permanente",
            "Área de Proteção Privada"
        ],
        correta: 2
    },
    {
        pergunta: "Qual ODS está mais relacionado ao combate às queimadas?",
        alternativas: [
            "ODS 4",
            "ODS 7",
            "ODS 13",
            "ODS 16"
        ],
        correta: 2
    },
    {
        pergunta: "Queimadas frequentes podem causar:",
        alternativas: [
            "Melhoria da biodiversidade",
            "Perda de vegetação",
            "Aumento da umidade",
            "Redução da temperatura"
        ],
        correta: 1
    },
    {
        pergunta: "Qual dessas condições climáticas não aumenta o risco de queimadas",
        alternativas: [
            "Nível de umidade igual ou abaixo de 30%",
            "Velocidade do vento igual ou superior a 30 km/h",
            "Acúmulo de 30 mm de chuva no dia",
            "Temperatura igual ou maior que 30°C"
        ],
        correta: 2
    },
    {
        pergunta: "Qual impacto financeiro pode ser causado por uma grande queimada?",
        alternativas: [
            "Perda de vegetação",
            "Redução da produtividade",
            "Gastos com recuperação ambiental",
            "Todas as alternativas"
        ],
        correta: 3
    },
    {
        pergunta: "Uma área protegida ajuda a:",
        alternativas: [
            "Preservar ecossistemas",
            "Aumentar poluição",
            "Expandir queimadas",
            "Eliminar vegetação"
        ],
        correta: 0
    },
    {
        pergunta: "O Eco Fusion contribui para decisões:",
        alternativas: [
            "Mais sustentáveis",
            "Mais aleatórias",
            "Mais burocráticas",
            "Menos informadas"
        ],
        correta: 0
    }
];
let perguntaAtual = 0;

const respostas = new Array(perguntas.length).fill(null);

const quizContainer = document.getElementById("quiz-container");
const barra = document.getElementById("barraProgresso");
const contador = document.getElementById("contador");
const mensagemErro = document.getElementById("mensagemErro");
const btnVoltar = document.getElementById("btnVoltar");
const btnAvancar = document.getElementById("btnAvancar");

const resultado = document.getElementById("resultado");

function mostrarPergunta(){

    const pergunta = perguntas[perguntaAtual];

    contador.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    barra.style.width =
        `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

    quizContainer.innerHTML = `
        <div class="pergunta">

            <h2>${pergunta.pergunta}</h2>

            ${pergunta.alternativas.map((alternativa, indice) => `

                <label class="alternativa">

                    <input
                        type="radio"
                        name="resposta"
                        value="${indice}"
                        ${respostas[perguntaAtual] == indice ? "checked" : ""}
                    >

                    ${alternativa}

                </label>

            `).join("")}

        </div>
    `;

    btnVoltar.style.display =
        perguntaAtual === 0 ? "none" : "block";

    btnAvancar.textContent =
        perguntaAtual === perguntas.length - 1
        ? "Finalizar"
        : "Próxima";
}

function salvarResposta(){

    const resposta =
        document.querySelector('input[name="resposta"]:checked');

    if(resposta){

        respostas[perguntaAtual] =
            Number(resposta.value);

    }
}

btnAvancar.addEventListener("click", () => {

    const resposta = document.querySelector('input[name="resposta"]:checked');

    if(!resposta){

        mensagemErro.textContent =
            "Selecione uma alternativa antes de continuar.";

        return;
    }

    mensagemErro.textContent = "";

    salvarResposta();

    if(perguntaAtual < perguntas.length - 1){

        perguntaAtual++;

        mostrarPergunta();

    }else{

        finalizarQuiz();

    }

});

btnVoltar.addEventListener("click", () => {

    salvarResposta();

    perguntaAtual--;

    mostrarPergunta();

});

function finalizarQuiz(){

    let pontos = 0;

    perguntas.forEach((pergunta, indice) => {

        if(respostas[indice] === pergunta.correta){

            pontos++;

        }

    });

    let classificacao = "";

    if(pontos <= 3){

        classificacao = "Conhecimento Básico";

    }else if(pontos <= 7){

        classificacao = "Conhecimento Intermediário";

    }else{

        classificacao = "Especialista Ambiental";

    }

    quizContainer.innerHTML = "";

    document.querySelector(".botoes").style.display = "none";

    contador.innerHTML = "";

    resultado.innerHTML = `
        <h2>Resultado Final</h2>

        <h1>${pontos}/${perguntas.length}</h1>

        <p>${classificacao}</p>

        <br>

        <p>
            Você acertou
            ${Math.round((pontos/perguntas.length)*100)}%
            das questões.
        </p>
    `;

    barra.style.width = "100%";
}

mostrarPergunta();

//slideshow
const slides =
    document.querySelectorAll(".slide");

let slideAtual = 0;

function mostrarSlide(indice){

    slides.forEach(slide => {

        slide.classList.remove("ativo");

    });

    slides[indice].classList.add("ativo");
}

document
    .getElementById("proximo")
    .addEventListener("click", () => {

        slideAtual++;

        if(slideAtual >= slides.length){

            slideAtual = 0;

        }

        mostrarSlide(slideAtual);

});

document
    .getElementById("anterior")
    .addEventListener("click", () => {

        slideAtual--;

        if(slideAtual < 0){

            slideAtual = slides.length - 1;

        }

        mostrarSlide(slideAtual);

});