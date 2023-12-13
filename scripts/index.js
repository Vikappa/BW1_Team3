// const checkboxChange = function () {
//   let checkbox = document.getElementById('checkbox');
//   let button = document.getElementById('button');
//   button.disabled === !checkbox.checked;
// };
// document.getElementById('checkbox').addEventListener('change', checkboxChange);

// const buttonClick = function () {
//   window.open('../questions.html');
// };
// button = document.getElementById('button');
// button.addEventListener('click', buttonClick);

const miaCheckbox = document.getElementById('checkbox');
let button = document.getElementById('button');

checkbox.addEventListener('click', function () {
  if (checkbox.checked) {
    button.disabled = false;
  } else {
   .disabled = true;
  }
});
