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

  function aggiornaTimer(timer1) {
    if (timer >= 0) {
      document.getElementById("countdown").innerHTML = `
      <p>Second</p>
      <p>${timer}</p>
      <p>Remaing</p> `;
      console.log(timer);
      timer--;
    } else {
      clearInterval(intervallo);
    }
  }
  /*CLASSI CERCHIO */
  const intervallo = setInterval(aggiornaTimer, 1000);
};
timer("easy");

//
//
//
//
//
//

//GRAFICO A CIAMBELLA - FRANCESCO
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
    cutoutPercentage: 30,
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
