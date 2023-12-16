const buttonClick = function () {
    console.log("Prova")
    window.location.href = "";
};

button = document.getElementById('buttonProceed');

checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
        console.log('true');
        button.disabled = false;
    } else {
        button.disabled = true;
        console.log('false');
    }
});