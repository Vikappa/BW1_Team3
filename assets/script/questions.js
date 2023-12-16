///////////////////////////////////////////////// Variabili comuni ai metodi della pagina //////////////////////////////////////////////
const apiUrl = "https://opentdb.com/api.php?amount=50&category=18"
const body = document.getElementsByName("body")[0]
const dinamicStage = document.getElementById("dinamicStage")
const arrayLeaderBoard = []
const arrayRisposte = []
let arrayDomande = []


let nDomandeFatte = 0
let username
let intervalloUnico

//////////////////////////////////////////////////////// Metodo FETCH /////////////////////////////////////////////////////////
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const loadQuestion = async function () {
    const result = await fetch(`${apiUrl}`)
    if (result.status === 429) {
        await delay(2500)
        return await loadQuestion()
    }
    const data = await result.json()
    return data.results;
}

const generaArrayDomande = async function () {
    const fullArray = await loadQuestion()
    let timeScore = 0
    const arrayFinale = []
    const newArray = [...fullArray]

    while (timeScore < 1800) {
        newArray.forEach((domanda) => {
            if (domanda && timeScore + diffInSecondi(domanda.difficulty) <= 1800) {
                arrayFinale.push(domanda);
                timeScore += diffInSecondi(domanda.difficulty);
            }
        });
    }
    return arrayFinale
};

///////////////////////////////////////////////// Metodi comuni ai metodi della pagina /////////////////////////////////////////////////
const fermaTicToc = async function () {
    console.log("Fermato")
    clearInterval(intervalloUnico)
}

const timer = function (difficoltaStringa) {
    let tempo
    if (difficoltaStringa === "easy") {
        tempo = 30
    } else if (difficoltaStringa === "medium") {
        tempo = 60
    } else if (difficoltaStringa === "hard") {
        tempo = 120
    } else {
        console.log("Errore numero inserito nel metodo timer")
        tempo = 0
    }

    function aggiornaTimer() {
        if (tempo >= 1) {
            tempo--
            console.log("Aggiorno tempo")
            document.getElementById("nSecondi").textContent = tempo
        } else {
            rispostaVuota()
            fermaTicToc()
        }
    }

    intervalloUnico = setInterval(aggiornaTimer, 1000)

    return tempo;
}

const diffInSecondi = function (diffString) {
    switch (diffString) {
        case `easy`:
            return 30
        case `medium`:
            return 60
        case `hard`:
            return 120
        default:
            break
    }
}

const convertiStringaInSecondiTimer = function (difficoltaStringa) {
    if (difficoltaStringa === "easy") {
        return 30
    } else if (difficoltaStringa === "medium") {
        return 60
    } else if (difficoltaStringa === "hard") {
        return 120
    } else {
        console.log(
            "Errore numero inserito nel metodo convertiStringaInSecondiTimer"
        );
        return 0
    }
};

///////////////////////////////////////// GRAFICO CIAMBELLA ////////////////////////////////////////

const graficoCiambella = function (giuste, sbagliate) {
    fermaTicToc();
    const divCanvas = document.createElement("div")
    divCanvas.id = "divCanvas"
    divCanvas.style = `height: 20%;width: 20%;`
    const canvas = document.createElement("canvas")
    canvas.id = "graficoCiambella"
    canvas.width = 600
    canvas.height = 600
    const ctx = canvas.getContext("2d")

    // Dati del grafico
    const dati = {
        labels: [
            'Giuste',
            'Sbagliate'
        ],
        datasets: [{
            data: [giuste, sbagliate],
            backgroundColor: ["#00FFFF", "#D20094"],
            hoverOffset: 4,
            borderWidth: 0
        }]
    };
    // Configurazione del grafico
    const options = {
        cutoutPercentage: 70,
        responsive: true,
        legend: {
            display: false
        },

    };
    // Crea e restituisci il grafico a ciambella
    const chart = new Chart(ctx, {
        type: "doughnut",
        data: dati,
        options: options,
    }).canvas;
    divCanvas.appendChild(chart)
    return divCanvas
};

//////////////////////////////////////// ELEMENTI HTML DINAMICI //////////////////////////////////////////////////

const cerchioTimer = function (difficolta) {
    const cerchioTimerHtml = document.createElement("div")
    const divCerchio = document.createElement("div")
    const divTime = document.createElement("div")
    cerchioTimerHtml.id = "countdown"
    divCerchio.id = "cerchio"
    divTime.id = "time"

    divCerchio.style = "position: absolute"

    switch (difficolta) {
        case "easy":
            divCerchio.innerHTML = `    
              <svg id="svgGenerale">
                <circle class="svgCircle" id="circle30" r="70" cx="75" cy="75"></circle>
                <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
              </svg>`
            break
        case "medium":
            divCerchio.innerHTML = `    
              <svg id="svgGenerale">
                <circle class="svgCircle"  id="circle60" r="70" cx="75" cy="75"></circle>
                <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
              </svg>`
            break
        case "hard":
            divCerchio.innerHTML = `    
              <svg id="svgGenerale">
                <circle class="svgCircle"  id="circle120" r="70" cx="75" cy="75"></circle>
                <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
              </svg>`
            break
    }

    const pseconds = document.createElement("p")
    const nSecondi = document.createElement("p")
    const primanenti = document.createElement("p")

    pseconds.textContent = "seconds"
    nSecondi.id = "nSecondi"
    nSecondi.textContent = convertiStringaInSecondiTimer(difficolta);

    nSecondi.textContent = timer(difficolta)
    primanenti.textContent = "remeaning"

    divTime.appendChild(pseconds)
    divTime.appendChild(nSecondi)
    divTime.appendChild(primanenti)

    cerchioTimerHtml.style.width = "150px"
    cerchioTimerHtml.style.height = "150px"

    cerchioTimerHtml.appendChild(divCerchio)
    cerchioTimerHtml.appendChild(divTime)

    return cerchioTimerHtml
}

const divDinamicoQuestion = async function (obgDomanda) {
    if (!obgDomanda) {
        console.log("obg domanda non esistente")
        await delay(1000);
        return await divDinamicoQuestion(obgDomanda)
    }

    await fermaTicToc();

    difficulty = obgDomanda.difficulty;
    const rispostaCorretta = obgDomanda.correct_answer
    const divRitorno = document.createElement("div")
    const pDomanda = document.createElement("p")
    pDomanda.innerText = obgDomanda.question
    pDomanda.id = "pDomanda"
    pDomanda.style = "font-size: 2em; margin: 0 25% 0 25%"
    divRitorno.appendChild(pDomanda)

    if (obgDomanda.type === `multiple`) {
        let risposte = [obgDomanda.correct_answer].concat(
            obgDomanda.incorrect_answers
        )
        const divRisposte1 = document.createElement("div")

        const divRisposte2 = document.createElement("div")

        divRisposte1.id = `divRisposteRiga1`
        divRisposte2.id = `divRisposteRiga2`

        let risposteAppese = 0

        for (let iRisposte = 0; iRisposte < risposte.length; iRisposte++) {
            const pRisposta = document.createElement("p")
            pRisposta.innerText = risposte[iRisposte]

            pRisposta.classList = "multTypeButton"
            pRisposta.id = `r` + risposte[iRisposte]

            pRisposta.onclick = async function () {
                await addRisposta(
                    risposte,
                    iRisposte,
                    pDomanda.innerText,
                    rispostaCorretta
                );
            };
            if (risposteAppese > 1) {
                divRisposte2.appendChild(pRisposta)
            } else {
                risposteAppese++;
                divRisposte1.appendChild(pRisposta)
            }

            divRitorno.appendChild(divRisposte1)
            divRitorno.appendChild(divRisposte2)
        }
    } else {
        const divRispostaBoolean = document.createElement("div")
        divRispostaBoolean.id = "pVero-pFalso"
        const divVero = document.createElement("div")
        const divFalso = document.createElement("div")
        const pVero = document.createElement("p")
        const pFalso = document.createElement("p")
        pVero.classList = `booleanButton`
        pVero.id = `pVero`
        pVero.onclick = async function () {
            await addRispostaBool("true", pDomanda.innerText, rispostaCorretta)
        }
        pFalso.classList = `booleanButton`
        pFalso.onclick = async function () {
            await addRispostaBool("false", pDomanda.innerText, rispostaCorretta)
        }
        pFalso.id = `pFalso`
        pVero.innerText = "True"
        pFalso.innerText = "False"
        divFalso.appendChild(pFalso)
        divVero.appendChild(pVero)
        divRispostaBoolean.appendChild(divVero)
        divRispostaBoolean.appendChild(divFalso)
        divRitorno.appendChild(divRispostaBoolean)
    }
    divRitorno.id = "genitore"
    divRitorno.appendChild(cerchioTimer(difficulty))
    return divRitorno
}

///////////////////////////////////////////////// INIZIO EFFETTIVA ESECUZIONE /////////////////////////////////////////////

arrayDomande = generaArrayDomande()
console.log(arrayDomande)