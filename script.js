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

//make the calculator work with operators
let firstOperand = null;
let operatorSelected = null;
let waitingForSecondOperand = false;

//operator buttons logic
function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operatorSelected && waitingForSecondOperand) {
    operatorSelected = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operatorSelected) {
    // A pair is already waiting — evaluate it NOW, before starting the next one.
    const result = operate(operatorSelected, firstOperand, inputValue);

    if (typeof result === "string") {
      handleError(result);
      return;
    }

    displayValue = formatResult(result);
    firstOperand = result;
    updateDisplay();
  }

  waitingForSecondOperand = true;
  operatorSelected = nextOperator;
}
