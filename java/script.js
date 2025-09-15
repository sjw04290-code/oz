const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentInput = "";
    shouldResetScreen = false;
  }
  if (number === "." && currentInput.includes(".")) return;

  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }
}

function chooseOperator(op) {
  if (operator !== null) calculate();
  firstOperand = parseFloat(currentInput);
  operator = op;
  shouldResetScreen = true;
}

function calculate() {
  if (operator === null || shouldResetScreen) return;

  const secondOperand = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "−":
      result = firstOperand - secondOperand;
      break;
    case "×":
      result = firstOperand * secondOperand;
      break;
    case "÷":
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  firstOperand = null;
}

function handleFunction(func) {
  switch (func) {
    case "C":
      currentInput = "0";
      firstOperand = null;
      operator = null;
      shouldResetScreen = false;
      break;
    case "±":
      currentInput = (parseFloat(currentInput) * -1).toString();
      break;
    case "%":
      currentInput = (parseFloat(currentInput) / 100).toString();
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      appendNumber(button.textContent);
    } else if (button.classList.contains("operator")) {
      if (button.textContent === "=") {
        calculate();
      } else {
        chooseOperator(button.textContent);
      }
    } else if (button.classList.contains("function")) {
      handleFunction(button.textContent);
    }
    updateDisplay();
  });
});

updateDisplay();
