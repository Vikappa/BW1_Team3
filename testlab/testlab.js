// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = 'https://opentdb.com/api.php?amount=50&category=18';
const body = document.getElementsByName("body")[0]
let nDomandeFatte = 00
const divTest = document.getElementById("testAppend")

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
    let domanda = obgDomanda.question
    let risposte = [obgDomanda.correct_answer].concat(obgDomanda.incorrect_answers)
    const divDomanda = document.createElement("div")
    const divRisposte = document.createElement("div")
    const divRitorno = document.createElement("div")
    const pDomanda = document.createElement("p")
    pDomanda.innerText = obgDomanda.question
    divRitorno.appendChild(pDomanda)
    console.log("flag")
    console.log(obgDomanda.question)
    return divRitorno
}

const renderizzaDomande = async function () {
    arrayDomande = await generaArrayDomande()
    divTest.innerHTML = ``

    const nuovaDomandaRenderizzata = await divDinamicoQuestion(arrayDomande[nDomandeFatte], nDomandeFatte)
    await divTest.appendChild(nuovaDomandaRenderizzata)

}

renderizzaDomande()
renderizzaDomande()
renderizzaDomande()

