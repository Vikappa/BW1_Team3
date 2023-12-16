///////////////////////////////////////////////// Variabili comuni ai metodi della pagina //////////////////////////////////////////////
const apiUrl = "https://opentdb.com/api.php?amount=50&category=18";
const body = document.getElementsByName("body")[0];
const dinamicStage = document.getElementById("dinamicStage");
const arrayLeaderBoard = []
const arrayRisposte = [];
const arrayDomande = [];

let nDomandeFatte = 0;
let username


///////////////////////////////////////////////// Metodi comuni ai metodi della pagina /////////////////////////////////////////////////
const fermaTicToc = async function () {
    console.log("Fermato");
    clearInterval(intervalloUnico);
};

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

///////////////////////////////////////// GRAFICO CIAMBELLA ////////////////////////////////////////

const graficoCiambella = function (giuste, sbagliate, stage) {
    const risposteGiustePercentuale = Math.floor((giuste / (giuste + sbagliate)) * 100);
    const risposteSbagliatePercentuale = 100 - risposteGiustePercentuale;

    const canvas = document.createElement("canvas");
    canvas.id = "graficoCiambella";
    canvas.style = "width: 700px; height: 500px;";
    let etichette = ["% risposte sbagliate", "% risposte giuste"];
    let data = [risposteSbagliatePercentuale, risposteGiustePercentuale];

    let color = ["#D20094", "#00FFFF"];
    const ciambella = new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: etichette,
            datasets: [{
                borderWidth: 0,
                backgroundColor: color,
                data: data,
            }],
        },
        options: {
            cutoutPercentage: 70,
            radius: "90%",
            legend: {
                display: false,
            },
            animation: {
                duration: 1000,
            }
        },
    });

    stage.appendChild(ciambella.canvas)
}




graficoCiambella(22, 30, dinamicStage)