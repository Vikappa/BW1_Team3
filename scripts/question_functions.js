// Il link magico altro non era che il link all'API di un progetto OpenSource di un Database di domande di vari argomenti
// Sul sito https://opentdb.com possiamo iscriverci e creare la nostra richiesta al database sotto forma di url su cui fare fetch()

const apiUrl = "https://opentdb.com/api.php?amount=50&category=18";
const body = document.getElementsByName("body")[0];
let nDomandeFatte = 0;
const divTest = document.getElementById("testAppend");
const divResultleaderboard = document.getElementById("resultleaderboard");
const leaderboardItems = [];

const arrayRisposte = [];
let intervalloUnico;
let currentQuestion;

let resOrLead;

const fermaTicToc = async function () {
  console.log("Fermato");
  clearInterval(intervalloUnico);
};

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// For making a request and fetching a resource, use the fetch() method. It is a global method in both Window and Worker contexts.
// This makes it available in pretty much any context you might want to fetch resources in.

// Metodo brutalmente copiato da https://www.youtube.com/watch?v=-cX5jnQgqSM senza sapere cosa siano le async functions

///////////////////////////////////////// GRAFICO CIAMBELLA ////////////////////////////////////////
const graficoCiambella = function (sbagliate, giuste) {
  fermaTicToc();
  const canvas = document.createElement("canvas");
  canvas.id = "graficoCiambella";
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Colore dell'ombra
  ctx.shadowBlur = 50; // Intensità dell'ombra
  ctx.shadowOffsetX = 10; // Spostamento orizzontale dell'ombra
  ctx.shadowOffsetY = 5; // Spostamento verticale dell'ombra

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
///////////////////////////////////////// INIZIO ANIMAZIONE CORIANDOLI ////////////////////////////////////////
function avviaAnimazioneCoriandoli() {
  const canvas = document.getElementById("animazioniCoriandoliOgocce");
  const contenuto = canvas.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  let coriandoli = [];
  const durataAnimazione = 4000; // 4 secondi

  function creaCoriandolo() {
    return {
      x: Math.random() * width,
      y: Math.random() * height - height,
      radius: Math.random() * (5 - 2) + 2,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255
        }, 1)`,
      velocita: Math.random() * 5 + 2,
    };
  }

  for (let i = 0; i < 300; i++) {
    coriandoli.push(creaCoriandolo());
  }

  function aggiorna() {
    contenuto.clearRect(0, 0, width, height);
    coriandoli.forEach((coriandolo) => {
      contenuto.beginPath();
      contenuto.arc(
        coriandolo.x,
        coriandolo.y,
        coriandolo.radius,
        0,
        Math.PI * 2
      );
      contenuto.fillStyle = coriandolo.color;
      contenuto.fill();
      contenuto.closePath();

      // Aggiornamento della posizione dei coriandoli
      coriandolo.y += coriandolo.velocita;
    });

    coriandoli = coriandoli.filter((coriandolo) => coriandolo.y < height);

    if (coriandoli.length !== 0) {
      requestAnimationFrame(aggiorna);
    }
  }

  setTimeout(() => {
    requestAnimationFrame(aggiorna);
  }, 100); // Ritardo iniziale

  setTimeout(() => {
    coriandoli = []; // Svuota l'array di coriandoli dopo 4 secondi
  }, durataAnimazione);

  // Riproduzione dell'audio
  const audioWinner = new Audio("./sounds/crowd-cheer-results.wav");
  audioWinner.play();
}
///////////////////////////////////////// FINE ANIMAZIONE CORIANDOLI ////////////////////////////////////////
/////////////////////////////////////////////////////////// TIMER - FRANCESCO   ///////////////////////////////////////////////////
const main = document.getElementById("main");

const convertiStringaInSecondiTimer = function (difficoltaStringa) {
  if (difficoltaStringa === "easy") {
    return 30;
  } else if (difficoltaStringa === "medium") {
    return 60;
  } else if (difficoltaStringa === "hard") {
    return 120;
  } else {
    console.log(
      "Errore numero inserito nel metodo convertiStringaInSecondiTimer"
    );
    return 0;
  }
};

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
    console.log("Errore numero inserito nel metodo timer");
    tempo = 0;
  }
  function aggiornaTimer() {
    if (tempo >= 1) {
      tempo--;
      console.log("Aggiorno tempo");
      document.getElementById("nSecondi").textContent = tempo;
    } else {
      rispostaVuota();
      fermaTicToc();
    }
  }

  intervalloUnico = setInterval(aggiornaTimer, 1000);

  return tempo;
};
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
  nSecondi.textContent = convertiStringaInSecondiTimer(difficolta);

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

///////////////////////////////////////////////////// ANIMAZIONE DURANTE ATTESA/CARICAMENTO PAGINA ///////////////////////////////////////////////////////////////////

const loadingDiv = document.createElement("div");
loadingDiv.id = "loadingDiv";
loadingDiv.classList.add("clessidra");
divTest.appendChild(loadingDiv);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const generateRandomName = () => {
  const names = [
    "Ali",
    "Eric",
    "Gabriel",
    "Beatriz",
    "Hanna",
    "Diya",
    "Fatima",
  ];

  if (!generateRandomName.usedNames) {
    generateRandomName.usedNames = [];
  }
  if (generateRandomName.usedNames.length === names.length) {
    generateRandomName.usedNames = [];
  }
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * names.length);
  } while (generateRandomName.usedNames.includes(randomIndex));
  generateRandomName.usedNames.push(randomIndex);

  return names[randomIndex];
};
for (let i = 0; i < 10; i++) {
  console.log(generateRandomName());
}

const generateRandomPoints = () => Math.floor(Math.random() * 100) + 1;

const generateRandomImages = () => {
  x = (100 + Math.floor(Math.random() * 100))
  const images = "https://placedog.net/" + x + "/" + x
  return images
};

const aggiungiVincenzo = function () {
  const leaderboardItem = document.createElement("div");
  leaderboardItem.classList.add("lboard_memory");

  leaderboardItem.innerHTML = `
  <div class="img">
      <img class="leaderboardImg" src="https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/332322660_229280442872270_1966642424894709984_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=IwcCZThU24QAX_YsqMf&_nc_ht=scontent-fco2-1.xx&oh=00_AfA-u19WOGqYi9cergtQwbHZNkwXvdOXXQNx4LT0C0f3RA&oe=6581C12B" alt="Foto-Vincenzo" />
  </div>
  <div class="name_barra">
      <p><span></span>Vincenzo</p>
      <div class="bar_wrap">
          <div class="inner_bar" style="width: 150%"></div>
      </div>
  </div>
  <div class="points">infiniti++ points</div>
`;

  leaderboardItems.push({ element: leaderboardItem, points: 100, name: "Vincenzo", image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/332322660_229280442872270_1966642424894709984_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=IwcCZThU24QAX_YsqMf&_nc_ht=scontent-fco2-1.xx&oh=00_AfA-u19WOGqYi9cergtQwbHZNkwXvdOXXQNx4LT0C0f3RA&oe=6581C12B" });

};

////////////////////////////////////////////////////////  ALEX   /////////////////////////////////////////////////////////////////////////////////////////////
aggiungiVincenzo()

const populateLeaderboard = () => {
  const leaderboardContainer = document.getElementById("leaderboard");
  if (leaderboardItems.length < 10) {
    for (let i = 1; i <= 10; i++) {
      const randomName = generateRandomName();
      const randomPoints = generateRandomPoints();
      const randomImages = generateRandomImages();

      const leaderboardItem = document.createElement("div");
      leaderboardItem.classList.add("lboard_memory");

      leaderboardItem.innerHTML = `
    <div class="img">
        <img class="leaderboardImg" src="${randomImages}" alt="random-image"/>
    </div>
    <div class="name_barra">
        <p><span></span>${randomName}</p>
        <div class="bar_wrap">
            <div class="inner_bar" style="width: ${randomPoints}%"></div>
        </div>
    </div>
    <div class="points">${randomPoints} points</div>
`;

      leaderboardItems.push({ element: leaderboardItem, points: randomPoints, name: randomName, image: randomImages });
    }
  }


  const goldElement = document.getElementById("gold");
  const silverElement = document.getElementById("silver");
  const bronzeElement = document.getElementById("bronze");

  const participants = [];

  for (let i = 0; i < 10; i++) {
    participants.push({
      name: leaderboardItems[i].name,
      points: leaderboardItems[i].points,
      image: leaderboardItems[i].image,
    });
  }


  const podiumElements = [goldElement, silverElement, bronzeElement];

  for (let i = 0; i < 3; i++) {
    const podiumItem = podiumElements[i];
    const participant = participants[i];
  }



  const divPodium = document.createElement("div")
  divPodium.classList = "podium"
  const divGold = document.createElement("div")
  divGold.id = "gold"
  const goldImg = document.createElement("img")
  goldImg.src = leaderboardItems[0].image
  const pGold = document.createElement("p")
  pGold.textContent = "1st Place"
  divGold.appendChild(goldImg)
  divGold.appendChild(pGold)


  const divSilver = document.createElement("div")
  divSilver.id = "silver"
  const silverImg = document.createElement("img")
  silverImg.src = leaderboardItems[1].image
  const pSilver = document.createElement("p")
  pSilver.textContent = "2nd Place"
  divSilver.appendChild(silverImg)
  divSilver.appendChild(pSilver)

  const divBronze = document.createElement("div")
  divBronze.id = "bronze"
  const bronzeImg = document.createElement("img")
  bronzeImg.src = leaderboardItems[2].image
  const pBronze = document.createElement("p")
  pBronze.textContent = "3rd Place"
  divBronze.appendChild(bronzeImg)
  divBronze.appendChild(pBronze)

  divPodium.appendChild(divSilver)
  divPodium.appendChild(divGold)
  divPodium.appendChild(divBronze)

  divTest.innerHTML = ``
  divTest.appendChild(divPodium)


  leaderboardItems.sort((a, b) => b.points - a.points);

  leaderboardItems.forEach((item, index) => {
    item.element.querySelector(".name_barra p span").textContent = `${index + 1
      }.`;

    leaderboardContainer.appendChild(item.element);
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

const checkRispostaVX = function (
  rispostaData,
  rispostaGiusta,
  rispostaCasella
) {
  if (rispostaData === rispostaCasella) {
    if (rispostaCasella === rispostaGiusta) {
      return `<i class="fas fa-check" style="color: #00ff4c;"></i>`;
    }
    if (rispostaCasella !== rispostaGiusta) {
      return `<i class="fas fa-times" style="color: #ff0000;"></i>`;
    }
  }
};

const populatePodium = () => {
  const goldElement = document.getElementById("gold");
  const silverElement = document.getElementById("silver");
  const bronzeElement = document.getElementById("bronze");

  const participants = [];

  for (let i = 0; i < 10; i++) {
    participants.push({
      name: leaderboardItems[i].name,
      points: leaderboardItems[i].points,
      image: leaderboardItems[i].image,
    });
  }


  const podiumElements = [goldElement, silverElement, bronzeElement];

  for (let i = 0; i < 3; i++) {
    const podiumItem = podiumElements[i];
    const participant = participants[i];
  }
};

const renderizzaLeaderBoard = function () {

  fermaTicToc();

  divResultleaderboard.style.visibility = "visible";
  divResultleaderboard.innerHTML = `<div class="lboard_section">
      <div class="lboard_item Leaderboard" id="leaderboard">
      </div>
</div>`;

  const divPulsanteLeaderBoard = document.createElement("div");
  const pPulsanteLeaderBoard = document.createElement("p");
  const divPulsanteResultBoard = document.createElement("div");
  const pPulsanteResultBoard = document.createElement("p");
  const divPulsantiSwitchTab = document.createElement("div");
  divPulsantiSwitchTab.id = "divPulsantiSwitchTab";

  pPulsanteLeaderBoard.id = "Leaderboard";
  pPulsanteResultBoard.id = "Risultati";

  pPulsanteLeaderBoard.addEventListener("click", function () {
    renderizzaLeaderBoard();
  });

  pPulsanteResultBoard.addEventListener("click", function () {
    renderizza_risultato();
  });

  pPulsanteLeaderBoard.classList = "switchTab";
  pPulsanteResultBoard.classList = "switchTab";
  pPulsanteLeaderBoard.textContent = "Leaderboard";
  pPulsanteResultBoard.textContent = "Risultati";

  divPulsantiSwitchTab.appendChild(pPulsanteResultBoard);
  divPulsantiSwitchTab.appendChild(pPulsanteLeaderBoard);

  divPulsantiSwitchTab.append(divPulsanteResultBoard);
  divPulsantiSwitchTab.append(divPulsanteLeaderBoard);

  divResultleaderboard.appendChild(divPulsantiSwitchTab);
  populateLeaderboard();

};

const renderizza_risultato = async function () {
  divResultleaderboard.innerHTML = ``;
  divResultleaderboard.style.visibility = "visible";
  divTest.innerHTML = ``;

  const divPulsanteLeaderBoard = document.createElement("div");
  const pPulsanteLeaderBoard = document.createElement("p");
  const divPulsanteResultBoard = document.createElement("div");
  const pPulsanteResultBoard = document.createElement("p");
  const divPulsantiSwitchTab = document.createElement("div");
  divPulsantiSwitchTab.id = "divPulsantiSwitchTab";

  pPulsanteLeaderBoard.id = "Leaderboard";
  pPulsanteResultBoard.id = "Risultati";

  pPulsanteLeaderBoard.addEventListener("click", function () {
    renderizzaLeaderBoard();
  });

  pPulsanteResultBoard.addEventListener("click", function () {
    renderizza_risultato();
  });

  pPulsanteLeaderBoard.classList = "switchTab";
  pPulsanteResultBoard.classList = "switchTab";
  pPulsanteLeaderBoard.textContent = "Leaderboard";
  pPulsanteResultBoard.textContent = "Risultati";

  divPulsantiSwitchTab.appendChild(pPulsanteResultBoard);
  divPulsantiSwitchTab.appendChild(pPulsanteLeaderBoard);

  divPulsantiSwitchTab.append(divPulsanteResultBoard);
  divPulsantiSwitchTab.append(divPulsanteLeaderBoard);

  divResultleaderboard.appendChild(divPulsantiSwitchTab);

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
  quanteGiuste.id = "divQuanteGiuste";
  quanteGiuste.classList = "divSchermataCiambella";
  quanteGiuste.innerHTML = `<p class="txtCiambella">Wrong</p>
  <p class="percentualeCiambella">${Math.floor(
    (sbagliate / totaleDomande) * 100
  )}%</p>
  <p class="quanteCiambella">${sbagliate}/${totaleDomande} questions</p>`;
  divTest.appendChild(quanteGiuste);
  const fraseSuperamentoONo = document.createElement("div");
  fraseSuperamentoONo.classList = "divSchermataCiambella";
  fraseSuperamentoONo.id = "divFraseSuperamentoONo";

  if (giuste > sbagliate) {
    avviaAnimazioneCoriandoli();
    fraseSuperamentoONo.innerHTML = `
    <p class="primaFraseResultCorrect">Congratulations!</p>
    <p class="secondaFraseResultCorrect">You have passed the exam</p>
   <p class="terzaFraseResultCorrect">We'll send you the certificate in few minutes</p>
   <p class="terzaFraseResultCorrect">in few minutes</p>
   <p class="terzaFraseResultCorrect">Check your email(including</p>
   <p class="terzaFraseResultCorrect">promotions / spam folder)</p>`;
    fraseSuperamentoONo.appendChild(grafic);
    divTest.appendChild(fraseSuperamentoONo);
  } else {
    fraseSuperamentoONo.innerHTML = `
    <p class="primaFraseResultSbagliato ">Dammit!</p>
    <p class="secondaFraseResultSbagliato ">You failed the exam</p>
   <p class="terzaFraseResultSbagliato ">You can always make it up if you want.</p>
   <p class="terzaFraseResultSbagliato "> Ask your teacher</p>
   `;
    fraseSuperamentoONo.appendChild(grafic);
    divTest.appendChild(fraseSuperamentoONo);
  }
  const quanteSbagliate = document.createElement("div");
  quanteSbagliate.id = "divQuanteSbagliate";
  quanteSbagliate.classList = "divSchermataCiambella";
  quanteSbagliate.innerHTML = `<p class="txtCiambella">Correct</p>
  <p class="percentualeCiambella">${Math.floor(
    (giuste / totaleDomande) * 100
  )}%</p>
  <p  class="quanteCiambella">${giuste}/${totaleDomande} questions</p>`;
  divTest.appendChild(quanteSbagliate);
  console.log("Sbagliate " + sbagliate);
  console.log("Giuste " + giuste);

  const divRisposteDate = document.createElement("div");
  for (let i = 0; i < arrayRisposte.length; i++) {
    if (arrayRisposte[i].type === `multiple`) {
      const divRisposta = document.createElement("div");
      divRisposta.id = "divRisposta";
      divRisposta.innerHTML = `<div class="casellaQuestionAnswer">
    <h1 class="h1Question">${arrayRisposte[i].question}</h1>
    <div class=rigaRisposte>
    <p class="CasellaRisposta">${checkRispostaVX(
        arrayRisposte[i].answer,
        arrayRisposte[i].correctAnswer,
        arrayRisposte[i].all_answer[0]
      )}  ${arrayRisposte[i].all_answer[0]
        }</p><p class="CasellaRisposta">${checkRispostaVX(
          arrayRisposte[i].answer,
          arrayRisposte[i].correctAnswer,
          arrayRisposte[i].all_answer[1]
        )} ${arrayRisposte[i].all_answer[1]}</p>
    </div>    
    <div class=rigaRisposte>
    <p class="CasellaRisposta">${checkRispostaVX(
          arrayRisposte[i].answer,
          arrayRisposte[i].correctAnswer,
          arrayRisposte[i].all_answer[2]
        )}  ${arrayRisposte[i].all_answer[2]
        }</p><p class="CasellaRisposta">${checkRispostaVX(
          arrayRisposte[i].answer,
          arrayRisposte[i].correctAnswer,
          arrayRisposte[i].all_answer[3]
        )} ${arrayRisposte[i].all_answer[3]}</p>
    </div>
    </div>`;

      divRisposteDate.appendChild(divRisposta);
    } else {
      const divRisposta = document.createElement("div");
      divRisposta.id = "divRisposta";
      divRisposta.innerHTML = `<div div class="casellaQuestionAnswer">
      <h1 class="h1Question">${arrayRisposte[i].question}</h1>
      <div class=rigaRisposte>
      <p class="CasellaRisposta">${checkRispostaVX(
        arrayRisposte[i].answer,
        arrayRisposte[i].correctAnswer,
        arrayRisposte[i].all_answer[0]
      )}  ${arrayRisposte[i].all_answer[0]
        }</p><p class="CasellaRisposta">${checkRispostaVX(
          arrayRisposte[i].answer,
          arrayRisposte[i].correctAnswer,
          arrayRisposte[i].all_answer[1]
        )} ${arrayRisposte[i].all_answer[1]}</p>
      </div></div>`;
      divRisposteDate.appendChild(divRisposta);
    }
  }

  divResultleaderboard.appendChild(divRisposteDate);

  //////////////////////////////////////////////////////////////////////////////////////CONTINUA QUY
};

let arrayDomande = [];

const rispostaVuota = async function () {
  let risposta = {
    type: currentQuestion.type,
    question: currentQuestion.question,
    answer: "Non ho risposto",
    all_answer: currentQuestion.arrayRispostePresentate,
    correctAnswer: currentQuestion.correct_answer,
  };

  arrayRisposte.push(risposta);

  console.log(
    "Lunghezza array risposte: " +
    arrayRisposte.length +
    " lunghezza array domande: " +
    arrayDomande.length
  );

  renderizzaDomande();
};

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
  currentQuestion = obgDomanda;

  await fermaTicToc();

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
  return divRitorno;
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

  if (arrayDomande.length === arrayRisposte.length) {
    divTest.innerHTML = ``;
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
