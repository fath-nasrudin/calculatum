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

const webUI = {
  displayValue: 0,
  getDisplayValue() {
    return this.displayValue;
  },
  setDisplayValue(value) {
    this.displayValue = value;
  },
  addLastDisplayValue(newValue) {
    let displayValue = this.getDisplayValue();
    if (displayValue === 0) {
      this.setDisplayValue(newValue);
    } else {
      this.setDisplayValue(displayValue + newValue);
    }
  },
  uiUpdateDisplayValue() {
    const calculatorDisplay = document.querySelector('#calculatorDisplay');
    calculatorDisplay.textContent = this.getDisplayValue();
  },
  uiSetAndUpdateDisplayValue(value) {
    this.setDisplayValue(value);
    this.uiUpdateDisplayValue();
  },
  keypadHandler(e) {
    this.addLastDisplayValue(e.currentTarget.value);
    this.uiUpdateDisplayValue();
  },
  equalButtonHandler(e) {
    const result = calculator.calculate(this.getDisplayValue());
    this.uiSetAndUpdateDisplayValue(result);
  },
  clearHandler(e) {
    this.uiSetAndUpdateDisplayValue(0);
  },
  populateKeypadListeners(e) {
    const keyNumbers = document.querySelectorAll(
      '.key-num, .add-operator, .subtract-operator, .multiply-operator, .divide-operator'
    );
    Array.from(keyNumbers).forEach((keyNum) => {
      keyNum.addEventListener('click', this.keypadHandler.bind(webUI));
    });

    const equalButton = document.querySelector('.equal-operator');
    equalButton.addEventListener('click', this.equalButtonHandler.bind(webUI));

    const clearButton = document.querySelector('.clear-operator');
    console.log(clearButton);
    clearButton.addEventListener('click', this.clearHandler.bind(webUI));
  },
};

webUI.uiUpdateDisplayValue();
webUI.populateKeypadListeners();
