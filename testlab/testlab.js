// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = 'https://opentdb.com/api.php?amount=50&category=18';
const body = document.getElementsByName("body")[0]
let nDomandeFatte = 0
const divTest = document.getElementById("testAppend")
const arrayRisposte = []

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// For making a request and fetching a resource, use the fetch() method. It is a global method in both Window and Worker contexts. 
// This makes it available in pretty much any context you might want to fetch resources in.

// Metodo brutalmente copiato da https://www.youtube.com/watch?v=-cX5jnQgqSM senza sapere cosa siano le async functions

const diffInSecondi = function (diffString) {
    switch (diffString) {
        case `easy`:
            return 30;
        case `medium`:
            return 60;
        case `hard`:
            return 120
        default:
            break;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadQuestion() {
    const result = await fetch(`${apiUrl}`);
    if (result.status === 429) {
        await delay(2500);
        return await loadQuestion();
    }
    const data = await result.json();
    return data.results;
}

const generaArrayDomande = async function () {
    const fullArray = await loadQuestion();
    let timeScore = 0;
    const arrayFinale = [];
    const newArray = [...fullArray]

    while (timeScore < 1800) {
        newArray.forEach(domanda => {
            if (domanda && (timeScore + diffInSecondi(domanda.difficulty)) <= 1800) {
                arrayFinale.push(domanda)
                timeScore += diffInSecondi(domanda.difficulty)
            }
        });
    }
    return arrayFinale
}

let arrayDomande = []

async function addRisposta(arrayRispostePresentate, indice_risposta_selezionata, domanda, correct_answer) {
    let risposta = {}
    if (arrayRispostePresentate.length > 1) {
        risposta = {
            type: `multiple`,
            question: domanda,
            answer: arrayRispostePresentate[indice_risposta_selezionata],
            all_answer: arrayRispostePresentate,
            correct_answer: correct_answer
        }
    } else {

    }
    arrayRisposte.push(risposta)

    console.log("Lunghezza array risposte: " + arrayRisposte.length)
    console.log("Array risposte: " + arrayRisposte)

    renderizzaDomande()
}
async function addRispostaBool(bool, domanda, correct_answer) {
    let ans
    if (bool === "true") {
        ans = "true"
    } else {
        ans = "false"
    }
    risposta = {
        type: `boolean`,
        question: domanda,
        answer: ans,
        all_answer: [`true`, `false`],
        correct_answer: correct_answer
    }
    arrayRisposte.push(risposta)
    console.log("Lunghezza array risposte: " + arrayRisposte.length)
    console.log("Array risposte: " + arrayRisposte)
    renderizzaDomande()
}





const divDinamicoQuestion = async function (obgDomanda, index) {
    console.log("inizio procedura")

    if (!obgDomanda) {
        console.log("obg domanda non esistente")
        await delay(1000)
        return await divDinamicoQuestion(obgDomanda, index)
    }

    console.log("obg domanda esistente")
    difficulty = obgDomanda.difficulty
    index = index

    const divRitorno = document.createElement("div")
    const pDomanda = document.createElement("p")
    pDomanda.innerText = obgDomanda.question
    divRitorno.appendChild(pDomanda)

    if (obgDomanda.type === `multiple`) {
        let risposte = [obgDomanda.correct_answer].concat(obgDomanda.incorrect_answers)
        const divRisposte = document.createElement("div")
        for (let iRisposte = 0; iRisposte < risposte.length; iRisposte++) {
            const divRisposta = document.createElement("div")
            const pRisposta = document.createElement("p")
            pRisposta.innerText = risposte[iRisposte]
            pRisposta.classList = "multTypeButton"
            pRisposta.id = `r` + risposte[iRisposte]
            pRisposta.onclick = async function () {
                console.log("click")
                await addRisposta(risposte, iRisposte, obgDomanda.question, obgDomanda.answer)
            }
            divRisposta.appendChild(pRisposta)
            divRisposte.appendChild(divRisposta)
        }
        divRitorno.appendChild(divRisposte)

    }
    else {
        const divRispostaBoolean = document.createElement("div")
        const divVero = document.createElement("div")
        const divFalso = document.createElement("div")
        const pVero = document.createElement("p")
        const pFalso = document.createElement("p")
        pVero.classList = `booleanButton`
        pVero.id = `pVero`
        pVero.onclick = async function () {
            console.log("click")
            await addRispostaBool("true", obgDomanda.question, obgDomanda.answer)
        }
        pFalso.classList = `booleanButton`
        pFalso.onclick = async function () {
            console.log("click")
            await addRispostaBool("false", obgDomanda.question, obgDomanda.answer)
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
    return divRitorno
}

const renderizzaDomande = async function () {
    arrayDomande = await generaArrayDomande()
    divTest.innerHTML = ``

    const nuovaDomandaRenderizzata = await divDinamicoQuestion(arrayDomande[nDomandeFatte], nDomandeFatte)
    await divTest.appendChild(nuovaDomandaRenderizzata)
}

renderizzaDomande()


