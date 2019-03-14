function evaluateMultiplyOrDivision() {
  if (inputOperators.length >= 1 && inputNumbers.length >= 2) {
    let operator = inputOperators[inputOperators.length - 1];
    let result = null;

    if (operator === `*` || operator === `/`) {
      let second = parseInt(inputNumbers.pop());
      let first = parseInt(inputNumbers.pop());

      if (operator === `*`) {
        result = first * second;
      } else if (operator === `/`) {
        if (second === 0) {
          return undefined;
        }

        result = first / second;
      }
  
      if (result !== null) {
        inputOperators.pop();
        inputNumbers.push(result);
      }

    }
  }
  return true;
}

function evaluateRestOfValues() {
  while (inputNumbers.length != 1 && inputOperators.length != 0) {
    let operator = inputOperators[inputOperators.length - 1];
    let second = parseInt(inputNumbers.pop());
    let first = parseInt(inputNumbers.pop());
    let result;

    if (operator === `+`) {
      result = first + second;
    } else if (operator === `-`){
      result = first - second;
    } else if (operator === `/`) {
      if (second === 0) {
        infinityResponse();
        return;
      } else {
        result = first / second;
      }
    } else {
      result = first * second;
    }
    inputOperators.pop();
    inputNumbers.push(result);
  }

  if (inputNumbers.length === 1) {
    display = [Math.round(inputNumbers[0] * 10) / 10];
  }
}

function showDisplay() {
  displayElement.textContent = display.toLocaleString().replace(/,/g, ``);
}

function reset() {
  display = [];
  inputNumbers = [];
  inputOperators = [];
}

function infinityResponse() {
  reset();
  alert("No dividing by 0. Calculator has been reset.");
}

function listenToButtonClick(e) {
  let input = e.target.textContent.charAt(0);

  if (input === `+` || input === `-` || input === `/` || input === `*`) {
    if (inputNumbers.length - 1 === inputOperators.length && inputNumbers.length != 0) {
      if (multiplyOrDivide) {
        if (!evaluateMultiplyOrDivision()) {
          infinityResponse();
        }
        multiplyOrDivide = false;
      }
      display.push(input);
      inputOperators.push(input);

      if (input === `/` || input === `*`) {
        multiplyOrDivide = true;
      }
    }
  } else if (input === `c`) {
    reset();
  } else if (input == `=`) {
    evaluateRestOfValues();
  } else {
    if (display.length === 0 || isNaN(parseInt(display[display.length - 1]))) {
      display.push(input);
      inputNumbers.push(input);
    } else {
      let previousNumber = display.pop() + input;
      inputNumbers.pop();
      
      inputNumbers.push(previousNumber);
      display.push(previousNumber);
    }
  }

  showDisplay();
}

const displayElement = document.querySelector(".display");
let display = [];
let inputNumbers = [];
let inputOperators = [];
let multiplyOrDivide = true;

const buttonElements = Array.from(document.querySelectorAll(".button"));
buttonElements.forEach((buttonElement) =>
  buttonElement.addEventListener(`click`, listenToButtonClick));