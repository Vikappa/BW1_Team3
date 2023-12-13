const buttonClick = function () {
  window.open('../questions.html');
};
button = document.getElementById('button');
button.addEventListener('click', buttonClick);

// const miaCheckbox = document.getElementById('checkbox');
// const button = document.getElementById('button');

checkbox.addEventListener('click', function () {
  if (checkbox.checked) {
    console.log('true');
    button.innerHTML = `<button onclick="button" id="buttonProceed">
    PROCEED
  </button>`;
  } else {
    button.innerHTML = `<button onclick="button" id="buttonProceed" disabled>
    PROCEED
  </button>`;
    console.log('false');
  }
});
