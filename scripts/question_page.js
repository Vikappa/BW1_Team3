//TIMER
const timer = function (difficolta) {
  let timer;
  if (difficolta === "easy") {
    timer = 30;
  } else if (difficolta === "medium") {
    timer = 60;
  } else if (difficolta === "hard") {
    timer = 120;
  }

  function aggiornaTimer() {
    if (timer >= 0) {
      document.getElementById("timer").innerHTML = `<p>${timer}</p> `;
      timer--;
    } else {
      clearInterval(intervallo);
    }
  }

  const intervallo = setInterval(aggiornaTimer, 1000);
};
timer("easy");

//GRAFICO
const graficoCiambella = function (sbagliate, giuste) {
  const ctx = document.getElementById("graficoCiambella").getContext("2d");

  // Dati del grafico
  const dati = {
    datasets: [
      {
        data: [sbagliate, giuste], // Valori percentuali per i segmenti del grafico
        backgroundColor: ["#D20094", "#00FFFF"], // Colori dei segmenti
        borderColor: "white", // Colore del bordo
        borderWidth: 2, // Spessore del bordo
      },
    ],
    labels: ["SBAGLIATE", "GIUSTE"], // Etichette dei segmenti
  };

  // Configurazione del grafico
  const options = {
    cutoutPercentage: 30, // Percentuale di spazio vuoto nel centro (30% crea un anello più stretto)
    responsive: false, // Rendi il grafico non reattivo per evitare ridimensionamenti automatici
  };

  // Crea il grafico a ciambella
  const donutChart = new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: options,
  });
};
graficoCiambella(13, 6);
