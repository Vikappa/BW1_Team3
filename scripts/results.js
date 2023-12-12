const superatoOno = function (pass) {
  if (pass === "superato") {
    let canvas = document.getElementById("canvas");
    let contenuto = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let coriandoli = [];
    let coriandoliSetting = {
      count: 500,
      gravity: 0.05,
      wave: 0,
    };

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const numeroRandom = function (min, max) {
      return Math.random() * (max - min) + min;
    };

    function Coriandolo() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.area = numeroRandom(12, 15);
      this.dimension = numeroRandom(9, 24); // Nuovo campo per la dimensione
      this.tilt = numeroRandom(-4, 4);
      this.tiltAngle = 0;
      this.color = `rgb(${numeroRandom(0, 255)}, ${numeroRandom(
        0,
        255
      )}, ${numeroRandom(0, 255)})`;
    }

    Coriandolo.prototype.draw = function () {
      contenuto.beginPath();
      contenuto.lineJoin = "round"; // Smusso degli angoli
      contenuto.lineCap = "round"; // Smusso delle estremità
      contenuto.lineWidth = this.dimension; // Utilizza la dimensione
      contenuto.strokeStyle = this.color;
      this.x = this.x + this.tilt;
      contenuto.moveTo(this.x + this.dimension / 5, this.y);
      contenuto.lineTo(this.x, this.y + this.tilt + this.dimension / 30);
      contenuto.stroke();
    };

    const creaCoriandoli = function () {
      while (coriandoli.length < coriandoliSetting.count) {
        let coriandolo = new Coriandolo();
        coriandoli.push(coriandolo);
      }
    };

    let startTime = null;
    let duration = 3000; // Durata in millisecondi
    let tempoCorrente = 0; // Tempo corrente di animazione

    const inizia = (timestamp) => {
      const tempoTrascorso = timestamp - startTime;

      if (!startTime) {
        startTime = timestamp;
      }

      tempoCorrente = timestamp - startTime; // Aggiornamento del tempo corrente

      contenuto.clearRect(0, 0, width, height);

      for (let i = 0; i < coriandoli.length; i++) {
        coriandoliSetting.wave += 0.4;
        coriandoli[i].tiltAngle += numeroRandom(0.1, 0.2);
        coriandoli[i].y +=
          (Math.sin(coriandoliSetting.wave) +
            coriandoli[i].area +
            coriandoliSetting.gravity) *
          0.38;
        coriandoli[i].tilt = Math.cos(coriandoli[i].tiltAngle) * 0.325;

        coriandoli[i].draw();

        if (tempoCorrente < duration) {
          tempoCorrente = timestamp - startTime; // Aggiornamento del tempo corrente
        } else {
          // Animazione terminata, i coriandoli possono scendere fuori dal canvas
          coriandoli[i].y += 10; // Modifica la velocità di caduta al termine del tempo
        }

        if (coriandoli[i].y > height) {
          coriandoli.splice(i, 1);
          i--; // Decrementa l'indice dopo la rimozione dell'elemento
        }
      }

      if (coriandoli.length > 0 && tempoCorrente < duration) {
        window.requestAnimationFrame(inizia);
      }
    };

    window.onload = () => {
      canvas.width = width;
      canvas.height = height;

      // Attendi 600 millisecondi (0.6 secondi) prima di chiamare creaCoriandoli()
      setTimeout(() => {
        creaCoriandoli();
        window.requestAnimationFrame(inizia);
      }, 600);

      // Chiamata per avviare la riproduzione dell'audio
      const audio = document.getElementById("audioPlayer");
      function playAudio() {
        audio.play();
      }
      playAudio();
    };
  } else {
    document.getElementById("messaggioErrore").style.display = "block";
  }
};
superatoOno("superato");
