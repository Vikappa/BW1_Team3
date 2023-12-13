// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = 'https://opentdb.com/api.php?amount=50&category=18';
const body = document.getElementsByName('body')[0];
let nDomandeFatte = 0;
const divTest = document.getElementById('testAppend');
const arrayRisposte = [];

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// For making a request and fetching a resource, use the fetch() method. It is a global method in both Window and Worker contexts.
// This makes it available in pretty much any context you might want to fetch resources in.

// Metodo brutalmente copiato da https://www.youtube.com/watch?v=-cX5jnQgqSM senza sapere cosa siano le async functions

/////////////////////////////////////////////////////////// TIMER - FRANCESCO   ///////////////////////////////////////////////////


///////////////////////////////////////// GRAFICO CIAMBELLA ////////////////////////////////////////
const graficoCiambella = function (sbagliate, giuste) {
  const canvas = document.createElement("canvas")  // Crea un elemento canvas dinamicamente invece di get-tarlo dal body
  canvas.id = "graficoCiambella";

  const ctx = canvas.getContext("2d");

  // Dati del grafico
  const dati = {
    datasets: [
      {
        data: [sbagliate, giuste],
        backgroundColor: ["#D20094", "#00FFFF"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
    labels: ["SBAGLIATE", "GIUSTE"],
  };

  // Configurazione del grafico
  const options = {
    cutoutPercentage: 30,
    responsive: false,
    plugins: {
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
        },
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      },
    },
  };

  // Crea e restituisci il grafico a ciambella
  return new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: options,
  }).canvas
};

const main = document.getElementById("main")
let tictoc
let timeleft
let diffValueCurrentQuestion
//modificato per ritornare un valore che non sia fuori dal metodo
const timer = function (difficoltaStringa) {
  if (difficoltaStringa === "easy") {
    return 30;
  } else if (difficoltaStringa === "medium") {
    return 60;
  } else if (difficoltaStringa === "hard") {
    return 120;
  }
  console.log("Errore numero inserito nel metodo timer")
  return 0
}

async function aggiornaTimer() {
  if (!timeleft) {
    timeleft = timer(diffValueCurrentQuestion)
  }
  if (timeleft >= 0) {
    const timerInHtml = document.getElementById("nSecondi");
    timerInHtml.textContent =
      console.log(timeleft);
    timeleft--;
  } else {
    //rispostaVuota()
    clearInterval(tictoc);
  }
}

const avviaTicToc = function (diffValue) { //Ex aggiornatimer
  if (tictoc === undefined) {
    setInterval(aggiornaTimer, 1000);
  }
}


//////////////////////////////// VINCENZO DICE: HO ACCROCCHIATO IL METODO CHE AGGIORNA IL TIMER E IL METODO CHE MUOVE IL CERCHIO IN UN SOLO DIV ///////////////////
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
            <svg>
              <circle class="svgCircle" id="circle30" r="70" cx="75" cy="75"></circle>
              <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
            </svg>`;
      break;
    case "medium":
      divCerchio.innerHTML = `    
            <svg>
              <circle class="svgCircle"  id="circle60" r="70" cx="75" cy="75"></circle>
              <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
            </svg>`;
      break;
    case "hard":
      divCerchio.innerHTML = `    
            <svg>
              <circle class="svgCircle"  id="circle120" r="70" cx="75" cy="75"></circle>
              <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
            </svg>`
      break
  }

  const pseconds = document.createElement("p")
  const nSecondi = document.createElement("p")
  const primanenti = document.createElement("p")

  pseconds.textContent = "seconds"
  nSecondi.textContent = timer(difficolta)
  nSecondi.id = "nSecondi"
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
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function loadQuestion() {
  const result = await fetch(`${apiUrl}`)
  if (result.status === 429) {
    await delay(2500)
    return await loadQuestion()
  }
  const data = await result.json()
  return data.results
}

const generaArrayDomande = async function () {
  const fullArray = await loadQuestion()
  let timeScore = 0
  const arrayFinale = []
  const newArray = [...fullArray]

  while (timeScore < 1800) {
    newArray.forEach((domanda) => {
      if (domanda && timeScore + diffInSecondi(domanda.difficulty) <= 1800) {
        arrayFinale.push(domanda)
        timeScore += diffInSecondi(domanda.difficulty)
      }
    });
  }
  return arrayFinale;
};

const renderizza_risultato = async function () {
  divTest.innerHTML = `INIZIO SEQUENZA RISULTATO`
  await delay(500)
  divTest.innerHTML = ``

  let totaleDomande = arrayDomande.length
  let giuste = 0

  for (let index = 0; index < arrayRisposte.length; index++) {
    if (arrayRisposte[index].correctAnswer === arrayRisposte.answer)
      giuste++
  }
  let sbagliate = totaleDomande - giuste
  const grafic = graficoCiambella(sbagliate, giuste)
  console.log("Sbagliate " + sbagliate)
  console.log("Giuste " + giuste)
  divTest.appendChild(grafic)

  const divRisposteDate = document.createElement("div")
  for (let i = 0; i < arrayRisposte.length; i++) {
    const divRisposta = document.createElement("div")
    const pDomanda = document.createElement("p")
    pDomanda.textContent = arrayRisposte[i].question
    const pAnswer = document.createElement("p")
    pAnswer.textContent = `Risposta data; ` + arrayRisposte[i].answer
    divRisposta.appendChild(pDomanda)
    divRisposta.appendChild(pAnswer)
    divRisposteDate.appendChild(divRisposta)
  }


  //////////////////////////////////////////////////////////////////////////////////////CONTINUA QUY
}

let arrayDomande = [];

async function addRisposta(
  arrayRispostePresentate,
  indice_risposta_selezionata,
  domanda,
  correct_answer
) {
  let risposta = {
    type: `multiple`,
    question: domanda,
    answer: arrayRispostePresentate[indice_risposta_selezionata],
    all_answer: arrayRispostePresentate,
    correctAnswer: correct_answer,
  };

  arrayRisposte.push(risposta);

  console.log(
    'Lunghezza array risposte: ' +
    arrayRisposte.length +
    ' lunghezza array domande: ' +
    arrayDomande.length
  );

  renderizzaDomande();
}
async function addRispostaBool(bool, domanda, correct_answer) {
  let ans;
  if (bool === 'true') {
    ans = 'true';
  } else {
    ans = 'false';
  }
  risposta = {
    type: `boolean`,
    question: domanda,
    answer: ans,
    all_answer: [`true`, `false`],
    correctAnswer: correct_answer,
  };
  arrayRisposte.push(risposta);
  console.log(
    'Lunghezza array risposte: ' +
    arrayRisposte.length +
    ' lunghezza array domande: ' +
    arrayDomande.length
  );
  renderizzaDomande();
}

const divDinamicoQuestion = async function (obgDomanda) {
  if (!obgDomanda) {
    console.log('obg domanda non esistente');
    await delay(1000);
    return await divDinamicoQuestion(obgDomanda);
  }

  difficulty = obgDomanda.difficulty;
  const rispostaCorretta = obgDomanda.correct_answer
  const divRitorno = document.createElement('div');
  const pDomanda = document.createElement('p');
  pDomanda.innerText = obgDomanda.question;
  pDomanda.id = "pDomanda"
  pDomanda.style = "font-size: 2em; margin: 0 25% 0 25%"
  divRitorno.appendChild(pDomanda);

  if (obgDomanda.type === `multiple`) {
    let risposte = [obgDomanda.correct_answer].concat(obgDomanda.incorrect_answers)
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

        await addRisposta(risposte, iRisposte, pDomanda.innerText, rispostaCorretta)
      }
      if (risposteAppese > 1) {
        divRisposte2.appendChild(pRisposta)
      } else {
        risposteAppese++
        divRisposte1.appendChild(pRisposta)
      }

      divRitorno.appendChild(divRisposte1)
      divRitorno.appendChild(divRisposte2)
    }


  } else {
    const divRispostaBoolean = document.createElement('div');
    divRispostaBoolean.id = 'pVero-pFalso';
    const divVero = document.createElement('div');
    const divFalso = document.createElement('div');
    const pVero = document.createElement('p');
    const pFalso = document.createElement('p');
    pVero.classList = `booleanButton`;
    pVero.id = `pVero`;
    pVero.onclick = async function () {
      await addRispostaBool('true', pDomanda.innerText, rispostaCorretta);
    };
    pFalso.classList = `booleanButton`;
    pFalso.onclick = async function () {
      await addRispostaBool('false', pDomanda.innerText, rispostaCorretta);
    };
    pFalso.id = `pFalso`;
    pVero.innerText = 'True';
    pFalso.innerText = 'False';
    divFalso.appendChild(pFalso);
    divVero.appendChild(pVero);
    divRispostaBoolean.appendChild(divVero);
    divRispostaBoolean.appendChild(divFalso);
    divRitorno.appendChild(divRispostaBoolean);
  }
  divRitorno.id = 'genitore';
  divRitorno.appendChild(cerchioTimer(difficulty))
  return divRitorno;
};

const renderizzaDomande = async function () {
  if (arrayDomande.length === 0) {
    arrayDomande = await generaArrayDomande();
  }

  console.log("Di seguito metto l'array risposte accumulate. Non so perchè se metto questa stringa nel prossimo console log smarmella tutto")
  console.log(arrayRisposte);

  divTest.innerHTML = ``;

  if (arrayDomande.length === arrayRisposte.length + 20) {////////////////////////////////////////////////////////////////////////////////////////////ABBREVIA SEQUENZA DOMANDE
    renderizza_risultato(arrayRisposte);
  } else {
    const nuovaDomandaRenderizzata = await divDinamicoQuestion(
      arrayDomande[nDomandeFatte]
    );
    nDomandeFatte++;
    await divTest.appendChild(nuovaDomandaRenderizzata);
  }
};

renderizzaDomande();

