const checkboxChange = function () {
  let checkbox = document.getElementById('checkbox');
  let button = document.getElementById('button');
  button.disabled === !checkbox.checked;
};
document.getElementById('checkbox').addEventListener('change', checkboxChange);

const buttonClick = function () {
  alert('test');
};
button = document.getElementById('button');
button.addEventListener('click', buttonClick);
