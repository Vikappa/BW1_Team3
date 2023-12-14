//TIMER - FRANCESCO
const timer = function (difficolta) {
  let timer;
  if (difficolta === "easy") {
    timer = 30;
  } else if (difficolta === "medium") {
    timer = 60;
  } else if (difficolta === "hard") {
    timer = 120;
  }

  async function aggiornaTimer() {
    if (timer >= 0) {
      const divACaso = document.createElement("div");
      divACaso.id = "DivACaso";
      body.appendChild("DivACaso");
      const timerInHtml = document.getElementById("DivACaso");
      timerInHtml.innerHTML = `
      <p>Second</p>
      <p class="tempoHtml">${timer}</p>
      <p>Remaing</p> `;
      console.log(timer);
      timer--;
    } else {
      //rispostaVuota()
      clearInterval(intervallo);
    }
  }

  const intervallo = setInterval(aggiornaTimer, 1000);
};
timer("easy");

//
//
//
//
//
//

// GRAFICO A CIAMBELLA - FRANCESCO
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
    labels: ["SBAGLIATE", "GIUSTE"],
  };

  // Configurazione del grafico
  const options = {
    cutoutPercentage: 10,
    responsive: false,
    plugins: {
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
        },
        // Box shadow per etichette di dati
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      },
    },
  };

  // Crea il grafico a ciambella
  const donutChart = new Chart(ctx, {
    type: "doughnut",
    data: dati,
    options: options,
  });
};
graficoCiambella(1, 6);
