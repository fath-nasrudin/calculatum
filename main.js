const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber = null;
let secondNumber = null;
let operator = null;

const operate = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
    default:
      return 'Something went wrong!';
  }
};

// simple test
// console.log(operate('*', 2, 5) === 10);
// console.log(operate('/', -20, 5) === -4);
// console.log(operate('+', 2, 5) === 7);
// console.log(operate('-', 2, 5) === -3);
