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
