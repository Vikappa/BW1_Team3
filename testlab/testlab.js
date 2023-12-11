// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = 'https://opentdb.com/api.php?amount=50&category=18';

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
    const result = await fetch(`${apiUrl}`)
    console.log("Eseguo domanda")
    if (result.status === 429) {
        console.log("Delay 3 sec")
        await delay(3000);
        return loadQuestion();
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
    console.log(arrayFinale)
    return arrayFinale
}

const arrayDomande = generaArrayDomande()

for (let i = 0; i < arrayDomande.length; i++) {
    console.log(arrayDomande[i])
}

