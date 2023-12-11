// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = 'https://opentdb.com/api.php?amount=50&category=18';

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// For making a request and fetching a resource, use the fetch() method. It is a global method in both Window and Worker contexts. 
// This makes it available in pretty much any context you might want to fetch resources in.

// Metodo brutalmente copiato da https://www.youtube.com/watch?v=-cX5jnQgqSM senza sapere cosa siano le async functions

const diffInSecondi = function (diffString) {
    switch (key) {
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

// Template da chatGPT modificato

async function loadQuestion() {
    const result = await fetch(`${apiUrl}`);

    const data = await result.json();

    return data.result;
}


const generaArrayDomande = async function () {
    const fullArray = await loadQuestion(); // Attendiamo che loadQuestion() completi prima di procedere
    console.log(data);
    let timeScore = 0 // somma del tempo richiesto da tutte le domande dell'array finale da sottoporre
    while (timeScore < 1800) {

        let temp = fullArray[Math.floor(Math.random * 50)]


        if (diffInSecondi(temp.difficulty) + timeScore < 1800) {
            timeScore += temp.difficulty

        }
    }
    return temp;
}



loadQuestion()