// Basic calculator functions
function add(a, b) {
  return a + b
}
function subtract(a, b) {
  return a - b
}
function multiply(a, b) {
  return a * b
}
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }
  return a / b
}
function operate(operation, a, b) {
  try {
    switch (operation) {
      case '+':
        return add(a, b)
      case '-':
        return subtract(a, b)
      case '*':
        return multiply(a, b)
      case '/':
        return divide(a, b)
      default:
        throw new Error('Invalid operation')
    }
  } catch (e) {
    return e.message
  }
}

function formatResult(result) {
  return String(result)
}

// populate the calculator display
let displayValue = '0'
let shouldResetDisplay = false
const display = document.getElementById('display')

function updateDisplay() {
  display.textContent = displayValue
}

function inputDigit(digit) {
  if (waitingForSecondOperand || shouldResetDisplay) {
    displayValue = digit
    waitingForSecondOperand = false
    shouldResetDisplay = false
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit
  }
  updateDisplay()
}

const numberButtons = document.querySelectorAll('[data-number]')
numberButtons.forEach((btn) => {
  btn.addEventListener('click', () => inputDigit(btn.dataset.number))
})

//make the calculator work with operators
let firstOperand = null
let operatorSelected = null
let waitingForSecondOperand = false

function handleError(message) {
  displayValue = 'Error'
  updateDisplay()
  firstOperand = null
  operatorSelected = null
  waitingForSecondOperand = false
}

//operator buttons logic
function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue)

  if (operatorSelected && waitingForSecondOperand) {
    operatorSelected = nextOperator
    return
  }

  if (firstOperand === null) {
    firstOperand = inputValue
  } else if (operatorSelected) {
    // A pair is already waiting — evaluate it NOW, before starting the next one.
    const result = operate(operatorSelected, firstOperand, inputValue)

    if (typeof result === 'string') {
      handleError(result)
      return
    }

    displayValue = formatResult(result)
    firstOperand = result
    updateDisplay()
  }

  waitingForSecondOperand = true
  operatorSelected = nextOperator
}

function handleEqual() {
  if (operatorSelected === null || waitingForSecondOperand) return

  const inputValue = parseFloat(displayValue)
  const result = operate(operatorSelected, firstOperand, inputValue)

  if (typeof result === 'string') {
    handleError(result)
    return
  }

  displayValue = formatResult(result)
  updateDisplay()
  firstOperand = result
  operatorSelected = null
  waitingForSecondOperand = false
  shouldResetDisplay = true
}

const operatorButtons = document.querySelectorAll('[data-operator]')
operatorButtons.forEach((btn) => {
  btn.addEventListener('click', () => handleOperator(btn.dataset.operator))
})

document
  .querySelector("[data-action='equals']")
  .addEventListener('click', handleEqual)

function handleClear() {
  displayValue = '0'
  firstOperand = null
  operatorSelected = null
  waitingForSecondOperand = false
  updateDisplay()
}

function handleBackspace() {
  displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0'
  updateDisplay()
}

function handleDecimal() {
  if (waitingForSecondOperand) {
    displayValue = '0.'
    waitingForSecondOperand = false
  } else if (!displayValue.includes('.')) {
    displayValue += '.'
  }
  updateDisplay()
}

document
  .querySelector("[data-action='clear']")
  .addEventListener('click', handleClear)
document
  .querySelector("[data-action='backspace']")
  .addEventListener('click', handleBackspace)
document
  .querySelector("[data-action='decimal']")
  .addEventListener('click', handleDecimal)

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key)
  else if (e.key === '.') handleDecimal()
  else if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key)
  else if (e.key === 'Enter' || e.key === '=') handleEqual()
  else if (e.key === 'Backspace') handleBackspace()
  else if (e.key === 'Escape') handleClear()
})

/*   Altrnative code for same functionality or activity 

 const buttonsEl = document.querySelectorAll('button')
const displayEl = document.getElementById('display')

for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener('click', () => {
    const button = buttonsEl[i]

    if (button.dataset.action === 'clear') {
      clearResult()
    } else if (button.dataset.action === 'backspace') {
      displayEl.textContent = displayEl.textContent.slice(0, -1) || '0'
    } else if (button.dataset.action === 'equals') {
      calculateResult()
    } else if (button.dataset.action === 'decimal') {
      appendValue('.')
    } else {
      appendValue(button.dataset.number || button.dataset.operator)
    }
  })
}

function clearResult() {
  displayEl.textContent = '0'
}

function calculateResult() {
  displayEl.textContent = eval(displayEl.textContent)
}

function appendValue(buttonValue) {
  const isOperator = ['+', '-', '*', '/'].includes(buttonValue)

  displayEl.textContent =
    displayEl.textContent === '0' && !isOperator
      ? buttonValue
      : displayEl.textContent + buttonValue
}

*/
