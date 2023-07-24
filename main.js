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
    stringOperation = helper.removeOperatorAtEnd(stringOperation);
    const arrValue = helper.splitNumbersAndOperators(stringOperation);
    let result = null;
    if (arrValue.length <= 1) return arrValue[0];

    while (arrValue.length > 0) {
      let firstNumber = result ? result : arrValue.shift();
      if (firstNumber === '-') firstNumber += arrValue.shift();
      let operator = arrValue.shift();
      let minus = null;
      // if there are minus as second operator, combine it with the secondNumber
      if (arrValue[0] === '-') minus = arrValue.shift();
      let secondNumber = minus ? minus + arrValue.shift() : arrValue.shift();
      result = this._operate(operator, firstNumber, secondNumber);
    }
    result = this.changeDecimalDigit(result);
    return result;
  },

  changeDecimalDigit(number, totalDecimalDigit = 5) {
    number = Number(number);
    let setter = Math.pow(10, totalDecimalDigit);
    return Math.round(number * setter) / setter;
  },
};

const helper = {
  splitNumbersAndOperators: (string) => {
    return string.split(/([-+*/])/g).filter((item) => item !== '');
  },

  isOperator: (char) => {
    return char === '+' || char === '-' || char === '*' || char === '/';
  },

  isPointAppear(string) {
    const arrayOfOperations = this.splitNumbersAndOperators(string);
    let lastNumber = arrayOfOperations[arrayOfOperations.length - 1];
    return lastNumber.search(/[.]/) >= 0;
  },

  removeOperatorAtEnd(string) {
    string = string.split('');
    let lastChar = string[string.length - 1];
    while (this.isOperator(lastChar)) {
      string.pop();
      lastChar = string[string.length - 1];
    }
    return string.join('');
  },
};

const webUI = {
  displayValue: '0',

  getDisplayValue() {
    return this.displayValue;
  },

  setDisplayValue(value) {
    this.displayValue = value.toString();
  },

  addLastDisplayValue(newValue) {
    let displayValue = this.getDisplayValue();
    let lastIndex = displayValue.length - 1;
    let lastChar = displayValue[lastIndex];
    let secondLastChar = displayValue[lastIndex - 1];
    const lastCharIsOperator = helper.isOperator(lastChar);
    const secondLastCharIsOperator = helper.isOperator(secondLastChar);
    const newValueIsOperator = helper.isOperator(newValue);
    if (displayValue === '0' && !newValueIsOperator && newValue !== '.') {
      this.setDisplayValue(newValue);
    } else {
      if (
        lastCharIsOperator &&
        secondLastCharIsOperator &&
        newValueIsOperator
      ) {
        return;
      }
      if (lastCharIsOperator && newValueIsOperator && newValue !== '-') {
        // change the last char into newValue
        displayValue = displayValue.split('');
        displayValue[lastIndex] = newValue;
        displayValue = displayValue.join('');
        this.setDisplayValue(displayValue);
        return;
      }
      if (newValue === '.' && helper.isPointAppear(displayValue)) {
        return;
      }
      if (newValue === '.' && lastCharIsOperator) newValue = `0${newValue}`;
      this.setDisplayValue(displayValue + newValue);
    }
  },

  removeLastDisplayValue() {
    let value = this.getDisplayValue().split('');
    value.pop();
    this.setDisplayValue(value.join(''));
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
    this.uiSetAndUpdateDisplayValue(result.toString());
  },

  clearHandler(e) {
    this.uiSetAndUpdateDisplayValue(0);
  },

  backspaceHandler(e) {
    if (this.getDisplayValue().length === 1) {
      this.uiSetAndUpdateDisplayValue(0);
      return;
    }
    this.removeLastDisplayValue();
    this.uiUpdateDisplayValue();
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
    clearButton.addEventListener('click', this.clearHandler.bind(webUI));

    const backspaceButton = document.querySelector('.key-backspace');
    backspaceButton.addEventListener(
      'click',
      this.backspaceHandler.bind(webUI)
    );
  },
  populateKeyboardListeners(e) {
    document.addEventListener('keydown', (e) => {
      if (/[0-9*/+-.]/.test(e.key)) {
        this.addLastDisplayValue(e.key);
        this.uiUpdateDisplayValue();
      } else if (e.key === '=' || e.key === 'Enter') {
        this.equalButtonHandler();
      } else if (e.key === 'Backspace') {
        this.removeLastDisplayValue();
        this.uiUpdateDisplayValue();
      } else if (e.key === 'Delete') {
        this.clearHandler();
      }
    });
  },
};

webUI.uiUpdateDisplayValue();
webUI.populateKeypadListeners();
webUI.populateKeyboardListeners();
