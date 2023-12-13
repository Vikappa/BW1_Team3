// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = "https://opentdb.com/api.php?amount=50&category=18";
const body = document.getElementsByName("body")[0];
let nDomandeFatte = 0;
const divTest = document.getElementById("testAppend");
const divResultleaderboard = document.getElementById("resultleaderboard");

const arrayRisposte = [];
let intervalloUnico

const fermaTicToc = async function () {
  console.log("Fermato")
  clearInterval(intervalloUnico)
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// For making a request and fetching a resource, use the fetch() method. It is a global method in both Window and Worker contexts.
// This makes it available in pretty much any context you might want to fetch resources in.

// Metodo brutalmente copiato da https://www.youtube.com/watch?v=-cX5jnQgqSM senza sapere cosa siano le async functions

///////////////////////////////////////// GRAFICO CIAMBELLA ////////////////////////////////////////
const graficoCiambella = function (sbagliate, giuste) {
  fermaTicToc()
  const canvas = document.createElement("canvas");
  canvas.id = "graficoCiambella";
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  // Dati del grafico
  const dati = {
    datasets: [
      {
        data: [sbagliate, giuste],
        backgroundColor: ["#D20094", "#00FFFF"],
        borderColor: "white",
        borderWidth: 0, // Riduci il bordo
      },
    ],
  };

  // Configurazione del grafico
  const options = {
    cutoutPercentage: 70,
    responsive: false,
    plugins: {
      datalabels: {
        display: false, // Nascondi le etichette
      },
    },
  };

  // Crea e restituisci il grafico a ciambella
  return new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: options,
  }).canvas;
};
///////////////////////////////////////// FINEGRAFICO CIAMBELLA ////////////////////////////////////////

/////////////////////////////////////////////////////////// TIMER - FRANCESCO   ///////////////////////////////////////////////////
const main = document.getElementById("main");

const convertiStringaInSecondiTimer = function (difficoltaStringa) {
  if (difficoltaStringa === "easy") {
    return 30
  } else if (difficoltaStringa === "medium") {
    return 60
  } else if (difficoltaStringa === "hard") {
    return 120
  } else {
    console.log("Errore numero inserito nel metodo convertiStringaInSecondiTimer")
    return 0;
  }
}

//modificato per ritornare un valore che non sia fuori dal metodo
const timer = function (difficoltaStringa) {
  let tempo;
  if (difficoltaStringa === "easy") {
    tempo = 30;
  } else if (difficoltaStringa === "medium") {
    tempo = 60;
  } else if (difficoltaStringa === "hard") {
    tempo = 120;
  } else {
    console.log("Errore numero inserito nel metodo timer")
    tempo = 0;
  }
  function aggiornaTimer() {
    if (tempo >= 0) {
      console.log("Aggiorno tempo")
      document.getElementById("nSecondi").textContent = tempo
      tempo--
    } else {
      //rispostaVuota()
      fermaTicToc()
    }
  }

  intervalloUnico = setInterval(aggiornaTimer, 1000);

  return tempo

}
/////////////////////////////////////////////////////////// FINE TIMER - FRANCESCO   ///////////////////////////////////////////////////

//////////////////////////////// VINCENZO DICE: HO ACCROCCHIATO IL METODO CHE AGGIORNA IL TIMER E IL METODO CHE MUOVE IL CERCHIO IN UN SOLO DIV ///////////////////
const cerchioTimer = function (difficolta) {
  const cerchioTimerHtml = document.createElement("div");
  const divCerchio = document.createElement("div");
  const divTime = document.createElement("div");
  cerchioTimerHtml.id = "countdown";
  divCerchio.id = "cerchio";
  divTime.id = "time";

  divCerchio.style = "position: absolute";

  switch (difficolta) {
    case "easy":
      divCerchio.innerHTML = `    
            <svg id="svgGenerale">
              <circle class="svgCircle" id="circle30" r="70" cx="75" cy="75"></circle>
              <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
            </svg>`;
      break;
    case "medium":
      divCerchio.innerHTML = `    
            <svg id="svgGenerale">
              <circle class="svgCircle"  id="circle60" r="70" cx="75" cy="75"></circle>
              <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
            </svg>`;
      break;
    case "hard":
      divCerchio.innerHTML = `    
            <svg id="svgGenerale">
              <circle class="svgCircle"  id="circle120" r="70" cx="75" cy="75"></circle>
              <circle class="svgCircle"  id="circleBackground" r="70" cx="75" cy="75"></circle>
            </svg>`;
      break;
  }

  const pseconds = document.createElement("p");
  const nSecondi = document.createElement("p");
  const primanenti = document.createElement("p");

  pseconds.textContent = "seconds";
  nSecondi.id = "nSecondi";
  nSecondi.textContent = convertiStringaInSecondiTimer(difficolta)

  nSecondi.textContent = timer(difficolta);
  primanenti.textContent = "remeaning";

  divTime.appendChild(pseconds);
  divTime.appendChild(nSecondi);
  divTime.appendChild(primanenti);

  cerchioTimerHtml.style.width = "150px";
  cerchioTimerHtml.style.height = "150px";

  cerchioTimerHtml.appendChild(divCerchio);
  cerchioTimerHtml.appendChild(divTime);

  return cerchioTimerHtml;
};

const diffInSecondi = function (diffString) {
  switch (diffString) {
    case `easy`:
      return 30;
    case `medium`:
      return 60;
    case `hard`:
      return 120;
    default:
      break;
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  const newArray = [...fullArray];

  while (timeScore < 1800) {
    newArray.forEach((domanda) => {
      if (domanda && timeScore + diffInSecondi(domanda.difficulty) <= 1800) {
        arrayFinale.push(domanda);
        timeScore += diffInSecondi(domanda.difficulty);
      }
    });
  }
  return arrayFinale;
};

const checkRispostaVX = function (rispostaCasella, rispostaGiusta) {
  if (rispostaCasella === rispostaGiusta) {
    return `V`
  } else {
    return `X`
  }
}

const renderizza_risultato = async function () {
  divTest.innerHTML = `INIZIO SEQUENZA RISULTATO`;
  divResultleaderboard.style.visibility = "visible"

  await delay(500);
  divTest.innerHTML = ``;

  divTest.classList = "divCiambella";
  let totaleDomande = arrayDomande.length;
  let giuste = 0;

  for (let index = 0; index < arrayRisposte.length; index++) {
    if (arrayRisposte[index].correctAnswer === arrayRisposte[index].answer)
      giuste++;
  }
  let sbagliate = totaleDomande - giuste;
  const grafic = graficoCiambella(sbagliate, giuste);
  const quanteGiuste = document.createElement("div");
  quanteGiuste.id = "divQuanteGiuste"
  quanteGiuste.classList = "divSchermataCiambella"
  quanteGiuste.innerHTML = `<p>Wrong</p>
  <p>${sbagliate}%</p>`;
  divTest.appendChild(quanteGiuste);
  const fraseSuperamentoONo = document.createElement("div");
  fraseSuperamentoONo.classList = "divSchermataCiambella"
  fraseSuperamentoONo.id = "divFraseSuperamentoONo"
  if (giuste > sbagliate) {
    fraseSuperamentoONo.innerHTML = `
    <p>Congratulations!/p>
    <p>You have passed the exam</p>
   <p>You will receive your<br>certificate by email shortly</p>`;
    divTest.appendChild(fraseSuperamentoONo);
  } else {
    fraseSuperamentoONo.innerHTML = `
    <p>We are sorry</p>
    <p>You failed your test</p>
   <p>It will be fine next<br>time, commit!</p>`;
    fraseSuperamentoONo.appendChild(grafic);
    divTest.appendChild(fraseSuperamentoONo);
  }
  const quanteSbagliate = document.createElement("div");
  quanteSbagliate.id = "divQuanteSbagliate"
  quanteSbagliate.classList = "divSchermataCiambella"
  quanteSbagliate.innerHTML = `<p>Correct</p>
  <p>${giuste}%</p>`;
  divTest.appendChild(quanteSbagliate);
  console.log("Sbagliate " + sbagliate);
  console.log("Giuste " + giuste);


  const divRisposteDate = document.createElement("div");
  for (let i = 0; i < arrayRisposte.length; i++) {
    if (arrayRisposte[i].type === `multiple`) {
      const divRisposta = document.createElement("div");
      divRisposta.innerHTML = `<table>
    <caption>${arrayRisposte[i].question}</caption>
    <tBody>
    <tr>
    <td class="tdTableRisposta">${checkRispostaVX(arrayRisposte[i].answer, arrayRisposte[i].correctAnswer)} ${arrayRisposte[i].all_answer[1]}</td><td class="tdTableRisposta">${checkRispostaVX(arrayRisposte[i].answer, arrayRisposte[i].correctAnswer)} ${arrayRisposte[i].all_answer[2]}</td>
    </tr>    
    <tr>
    <td class="tdTableRisposta">${checkRispostaVX(arrayRisposte[i].answer, arrayRisposte[i].correctAnswer)} ${arrayRisposte[i].all_answer[3]}</td><td class="tdTableRisposta">${checkRispostaVX(arrayRisposte[i].answer, arrayRisposte[i].correctAnswer)} ${arrayRisposte[i].all_answer[4]}</td>
    </tr>
    </tbody>
    </table>`
      divRisposteDate.appendChild(divRisposta);
    } else {
      const divRisposta = document.createElement("div");
      divRisposta.innerHTML = `<table>
      <caption>${arrayRisposte[i].question}</caption>
      <tBody>
      <tr>
      <td class="tdTableRisposta">${checkRispostaVX(arrayRisposte[i].answer, arrayRisposte[i].correctAnswer)} ${arrayRisposte[i].all_answer[1]}</td><td class="tdTableRisposta">${checkRispostaVX(arrayRisposte[i].answer, arrayRisposte[i].correctAnswer)} ${arrayRisposte[i].all_answer[2]}</td>
      </tbody>
      </table>`
      divRisposteDate.appendChild(divRisposta);
    }
  }

  divResultleaderboard.appendChild(divRisposteDate)

  //////////////////////////////////////////////////////////////////////////////////////CONTINUA QUY
};

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
    "Lunghezza array risposte: " +
    arrayRisposte.length +
    " lunghezza array domande: " +
    arrayDomande.length
  );

  renderizzaDomande();
}
async function addRispostaBool(bool, domanda, correct_answer) {
  let ans;
  if (bool === "true") {
    ans = "true";
  } else {
    ans = "false";
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
    "Lunghezza array risposte: " +
    arrayRisposte.length +
    " lunghezza array domande: " +
    arrayDomande.length
  );
  renderizzaDomande();
}

const divDinamicoQuestion = async function (obgDomanda) {
  if (!obgDomanda) {
    console.log("obg domanda non esistente");
    await delay(1000);
    return await divDinamicoQuestion(obgDomanda);
  }

  await fermaTicToc()


  difficulty = obgDomanda.difficulty;
  const rispostaCorretta = obgDomanda.correct_answer;
  const divRitorno = document.createElement("div");
  const pDomanda = document.createElement("p");
  pDomanda.innerText = obgDomanda.question;
  pDomanda.id = "pDomanda";
  pDomanda.style = "font-size: 2em; margin: 0 25% 0 25%";
  divRitorno.appendChild(pDomanda);

  if (obgDomanda.type === `multiple`) {
    let risposte = [obgDomanda.correct_answer].concat(
      obgDomanda.incorrect_answers
    );
    const divRisposte1 = document.createElement("div");

    const divRisposte2 = document.createElement("div");

    divRisposte1.id = `divRisposteRiga1`;
    divRisposte2.id = `divRisposteRiga2`;

    let risposteAppese = 0;

    for (let iRisposte = 0; iRisposte < risposte.length; iRisposte++) {
      const pRisposta = document.createElement("p");
      pRisposta.innerText = risposte[iRisposte];

      pRisposta.classList = "multTypeButton";
      pRisposta.id = `r` + risposte[iRisposte];

      pRisposta.onclick = async function () {
        await addRisposta(
          risposte,
          iRisposte,
          pDomanda.innerText,
          rispostaCorretta
        );
      };
      if (risposteAppese > 1) {
        divRisposte2.appendChild(pRisposta);
      } else {
        risposteAppese++;
        divRisposte1.appendChild(pRisposta);
      }

      divRitorno.appendChild(divRisposte1);
      divRitorno.appendChild(divRisposte2);
    }
  } else {
    const divRispostaBoolean = document.createElement("div");
    divRispostaBoolean.id = "pVero-pFalso";
    const divVero = document.createElement("div");
    const divFalso = document.createElement("div");
    const pVero = document.createElement("p");
    const pFalso = document.createElement("p");
    pVero.classList = `booleanButton`;
    pVero.id = `pVero`;
    pVero.onclick = async function () {
      await addRispostaBool("true", pDomanda.innerText, rispostaCorretta);
    };
    pFalso.classList = `booleanButton`;
    pFalso.onclick = async function () {
      await addRispostaBool("false", pDomanda.innerText, rispostaCorretta);
    };
    pFalso.id = `pFalso`;
    pVero.innerText = "True";
    pFalso.innerText = "False";
    divFalso.appendChild(pFalso);
    divVero.appendChild(pVero);
    divRispostaBoolean.appendChild(divVero);
    divRispostaBoolean.appendChild(divFalso);
    divRitorno.appendChild(divRispostaBoolean);
  }
  divRitorno.id = "genitore";
  divRitorno.appendChild(cerchioTimer(difficulty));
  return divRitorno
};

const renderizzaDomande = async function () {
  if (arrayDomande.length === 0) {
    arrayDomande = await generaArrayDomande();
  }

  console.log(
    "Di seguito metto l'array risposte accumulate. Non so perchè se metto questa stringa nel prossimo console log smarmella tutto"
  );
  console.log(arrayRisposte);

  divTest.innerHTML = ``;

  if (arrayDomande.length === arrayRisposte.length + 20) {
    ////////////////////////////////////////////////////////////////////////////////////////////ABBREVIA SEQUENZA DOMANDE
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

////////////////////////////////// ALESSANDRO Creazione coriandoli O Lacrime + audio /////////////////////////////////////
// const superatoOno = function (pass) {
//   if (pass === "superato") {
//     // inzio Animazione Coriandoli + audio:
//     let canvas = document.getElementById("animazioniCoriandoliOgocce");
//     let contenuto = canvas.getContext("2d");
//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     let coriandoli = [];
//     let coriandoliSetting = {
//       count: 500,
//       gravity: 0.05,
//       wave: 0,
//     };

//     window.requestAnimationFrame =
//       window.requestAnimationFrame ||
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       window.msRequestAnimationFrame ||
//       function (callback) {
//         window.setTimeout(callback, 1000 / 60);
//       };

//     const numeroRandom = function (min, max) {
//       return Math.random() * (max - min) + min;
//     };

//     function Coriandolo() {
//       this.x = Math.random() * width;
//       this.y = Math.random() * height;
//       this.area = numeroRandom(12, 15);
//       this.dimension = numeroRandom(9, 24); // Nuovo campo per la dimensione
//       this.tilt = numeroRandom(-4, 4);
//       this.tiltAngle = 0;
//       this.color = `rgb(${numeroRandom(0, 255)}, ${numeroRandom(
//         0,
//         255
//       )}, ${numeroRandom(0, 255)})`;
//     }

//     Coriandolo.prototype.draw = function () {
//       contenuto.beginPath();
//       contenuto.lineJoin = "round"; // Smusso degli angoli
//       contenuto.lineCap = "round"; // Smusso delle estremità
//       contenuto.lineWidth = this.dimension; // Utilizza la dimensione
//       contenuto.strokeStyle = this.color;
//       this.x = this.x + this.tilt;
//       contenuto.moveTo(this.x + this.dimension / 5, this.y);
//       contenuto.lineTo(this.x, this.y + this.tilt + this.dimension / 30);
//       contenuto.stroke();
//     };

//     const creaCoriandoli = function () {
//       while (coriandoli.length < coriandoliSetting.count) {
//         let coriandolo = new Coriandolo();
//         coriandoli.push(coriandolo);
//       }
//     };

//     let startTime = null;
//     let duration = 3000; // Durata in millisecondi
//     let tempoCorrente = 0; // Tempo corrente di animazione

//     const inizia = (timestamp) => {
//       const tempoTrascorso = timestamp - startTime;

//       if (!startTime) {
//         startTime = timestamp;
//       }

//       tempoCorrente = timestamp - startTime; // Aggiornamento del tempo corrente

//       contenuto.clearRect(0, 0, width, height);

//       for (let i = 0; i < coriandoli.length; i++) {
//         coriandoliSetting.wave += 0.4;
//         coriandoli[i].tiltAngle += numeroRandom(0.1, 0.2);
//         coriandoli[i].y +=
//           (Math.sin(coriandoliSetting.wave) +
//             coriandoli[i].area +
//             coriandoliSetting.gravity) *
//           0.36;
//         coriandoli[i].tilt = Math.cos(coriandoli[i].tiltAngle) * 0.355;

//         coriandoli[i].draw();

//         if (tempoCorrente < duration) {
//           tempoCorrente = timestamp - startTime; // Aggiornamento del tempo corrente
//         } else {
//           // Animazione terminata, i coriandoli possono scendere fuori dal canvas
//           coriandoli[i].y += 10; // Modifica la velocità di caduta al termine del tempo
//         }

//         if (coriandoli[i].y > height) {
//           coriandoli.splice(i, 1);
//           i--; // Decrementa l'indice dopo la rimozione dell'elemento
//         }
//       }

//       if (coriandoli.length > 0 && tempoCorrente < duration) {
//         window.requestAnimationFrame(inizia);
//       }
//     };

//     window.onload = () => {
//       canvas.width = width;
//       canvas.height = height;

//       // Attendi 700 millisecondi (0.7 secondi) prima di chiamare creaCoriandoli()
//       setTimeout(() => {
//         creaCoriandoli();
//         window.requestAnimationFrame(inizia);
//       }, 700);
//       const audioWinner = new Audio("./sounds/crowd-cheer-results.wav");
//       audioWinner.play();
//     };
//     // // fine Animazione Coriandoli.
//     // inzio Animazione Lacrime + audio:
//   } else {
//     let canvas = document.getElementById("animazioniCoriandoliOgocce");
//     let contenuto = canvas.getContext("2d");
//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     let lacrime = [];
//     let lacrimeSetting = {
//       count: 400,
//       gravity: 0.4,
//       wave: 0,
//     };

//     window.requestAnimationFrame =
//       window.requestAnimationFrame ||
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame ||
//       window.oRequestAnimationFrame ||
//       window.msRequestAnimationFrame ||
//       function (callback) {
//         window.setTimeout(callback, 1000 / 60);
//       };

//     const numeroRandom = function (min, max) {
//       return Math.random() * (max - min) + min;
//     };

//     function Lacrima() {
//       this.x = Math.random() * width;
//       this.y = Math.random() * height;
//       this.dimension = numeroRandom(8, 20);
//       this.color = `rgba(0, 0, 255, ${numeroRandom(0.5, 1)})`;
//       this.speed = numeroRandom(5, 15);
//       this.tilt = numeroRandom(-4, 4);
//       this.tiltAngle = 0;
//     }

//     Lacrima.prototype.draw = function () {
//       contenuto.beginPath();
//       contenuto.lineWidth = 5;
//       contenuto.strokeStyle = this.color;
//       contenuto.moveTo(this.x, this.y);
//       contenuto.quadraticCurveTo(
//         this.x + this.dimension / 1.5, // Inverti la posizione del punto di controllo
//         this.y - this.dimension, // Inverti la posizione del punto di controllo
//         this.x,
//         this.y - this.dimension * 2.5 // Inverti la posizione del punto di arrivo
//       );
//       contenuto.quadraticCurveTo(
//         this.x - this.dimension / 1.5, // Inverti la posizione del punto di controllo
//         this.y - this.dimension, // Inverti la posizione del punto di controllo
//         this.x,
//         this.y
//       );
//       contenuto.stroke();
//     };

//     const creaLacrime = function () {
//       while (lacrime.length < lacrimeSetting.count) {
//         let lacrima = new Lacrima();
//         lacrime.push(lacrima);
//       }
//     };

//     let startTime = null;
//     let duration = 3000; // Durata in millisecondi
//     let tempoCorrente = 0; // Tempo corrente di animazione

//     const iniziaLacrime = (timestamp) => {
//       const tempoTrascorso = timestamp - startTime;

//       if (!startTime) {
//         startTime = timestamp;
//       }

//       tempoCorrente = timestamp - startTime;

//       contenuto.clearRect(0, 0, width, height);

//       for (let i = 0; i < lacrime.length; i++) {
//         lacrimeSetting.wave += 0.00001;
//         lacrime[i].tiltAngle += numeroRandom(0.1, 0.2);
//         lacrime[i].y +=
//           (Math.sin(lacrimeSetting.wave) + lacrimeSetting.gravity) *
//           lacrime[i].speed;
//         lacrime[i].tilt = Math.cos(lacrime[i].tiltAngle) * 0.1;

//         lacrime[i].draw();

//         if (tempoCorrente < duration) {
//           tempoCorrente = timestamp - startTime;
//         } else {
//           lacrime[i].y += 10;
//         }
//         if (lacrime[i].y > height + lacrime[i].dimension) {
//           lacrime.splice(i, 1);
//           i--; // Decrementa l'indice dopo la rimozione dell'elemento
//         }
//       }

//       if (lacrime.length > 0 && tempoCorrente < duration) {
//         window.requestAnimationFrame(iniziaLacrime);
//       }
//     };

//     window.onload = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       setTimeout(() => {
//         document.getElementById("messaggioGocce").style.display = "block";
//         creaLacrime();
//         window.requestAnimationFrame(iniziaLacrime);
//       }, 700);
//       const audioLooser = new Audio("./sounds/looser-results.wav");
//       audioLooser.play();
//     };
//   }
//   // fine Animazione Lacrime.
// };
// superatoOno("perato");
