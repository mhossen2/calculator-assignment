// Basic calculator functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}   
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}
function calculate(operation, a, b) {
    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operation");
    }
}

// populate the calculator display
let displayValue = "0";
const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = displayValue;
}

function inputDigit(digit) {
  displayValue = displayValue === "0" ? digit : displayValue + digit;
  updateDisplay();
}

const numberButtons = document.querySelectorAll("[data-number]");
numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => inputDigit(btn.dataset.number));
});

