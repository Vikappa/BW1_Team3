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

  //Cerchio intorno al timer
  function cerchio() {
    const cerchioInHtml = document.getElementById("cerchio");

    switch (difficolta) {
      case "easy":
        cerchioInHtml.innerHTML = `    
          <svg>
            <circle id="circle30" r="18" cx="20" cy="20"></circle>
          </svg>`;
        break;
      case "medium":
        cerchioInHtml.innerHTML = `    
          <svg>
            <circle id="circle60" r="18" cx="20" cy="20"></circle>
          </svg>`;
        break;
      case "hard":
        cerchioInHtml.innerHTML = `    
          <svg>
            <circle id="circle120" r="18" cx="20" cy="20"></circle>
          </svg>`;
        break;
    }
  }
  cerchio();

  // Timer

  async function aggiornaTimer() {
    if (timer >= 0) {
      const timerInHtml = document.getElementById("time");
      timerInHtml.innerHTML = `
      <p>Second</p>
      <p>${timer}</p>
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
