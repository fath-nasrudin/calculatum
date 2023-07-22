const calculator = {
  _add: (a, b) => a + b,
  _subtract: (a, b) => a - b,
  _multiply: (a, b) => a * b,
  _divide: (a, b) => a / b,
  _operate(operator, firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch (operator) {
      case '+':
        return this._add(firstNumber, secondNumber);
      case '-':
        return this._subtract(firstNumber, secondNumber);
      case '*':
        return this._multiply(firstNumber, secondNumber);
      case '/':
        return this._divide(firstNumber, secondNumber);
      default:
        return 'Something went wrong!';
    }
  },
  calculate(stringOperation) {
    const arrValue = helper.splitNumbersAndOperators(stringOperation);
    let result = null;
    while (arrValue.length > 0) {
      let firstNumber = result ? result : arrValue.shift();
      let operator = arrValue.shift();
      let secondNumber = arrValue.shift();
      result = this._operate(operator, firstNumber, secondNumber);
    }
    return result;
  },
};

const helper = {
  splitNumbersAndOperators: (string) => {
    return string.split(/([-+*/])/g);
  },
};
