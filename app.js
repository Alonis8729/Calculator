class Calculator {
    constructor(previousInputElement, currentInputElement) {
        this.previousInputElement = previousInputElement;
        this.currentInputElement = currentInputElement;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addOperator(operator) {
        if (this.currentOperand === "" || this.previousOperand !== "") return
        switch (operator) {
            case "power":
                this.operator = "^";
            case "add":
                this.operator = "+";
            case "multiply":
                this.operator = "*";
            case "subtract":
                this.operator = "-";
            case "divide":
                this.operator = "÷";

        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNum(num) {
        if (num === '.' && this.currentOperand.includes('.')) return; //avoid multiple decimals
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    getDisplay() {
        this.currentInputElement.innerText = this.getNumberDisplay(this.currentOperand);
        if (this.operator != null)
            this.previousInputElement.innerText = `${this.getNumberDisplay(this.previousOperand)} ${this.operator}`;
        else
            this.previousInputElement.innerText = '';
    }

    getNumberDisplay(num) {
        const stringNum = num.toString();
        const beforeDecimal = parseFloat(stringNum.split('.')[0]);
        const afterDecimal = stringNum.split('.')[1];
        let numberDisplay;
        if (isNaN(beforeDecimal))
            numberDisplay = "";
        else
            numberDisplay = beforeDecimal.toLocaleString('en', { maximumFractionDigits: 0 });
        if (afterDecimal)
            return `${numberDisplay}.${afterDecimal}`
        else
            return numberDisplay;
    }

    add(a, b) {
        const result = a + b;
        return roundIfLong(result);
    }
    subtract(a, b) {
        const result = a - b;
        return roundIfLong(result);
    }
    multiply(a, b) {
        const result = a * b;
        return roundIfLong(result);
    }
    divide(a, b) {
        if (b === 0)
            return "Cannot divide by zero"
        result = a / b;
        return roundIfLong(result);
    }

    power(a, b) {
        const result = a ** b;
        return roundIfLong(result);
    }

    roundIfLong(result) {
        let stringNumber = result.toString();
        if (stringNumber.includes('.')) {
            const decimalPartLength = stringNumber.split('.')[1].length;
            if (decimalPartLength > 4)
                return parseFloat(result.toFixed(4));
        }
        return result;
    }


    operate(firstNum, operator, secondNum) {
        switch (operator) {
            case "add":
                return add(firstNum, secondNum);
            case "subtract":
                return subtract(firstNum, secondNum);
            case "divide":
                return divide(firstNum, secondNum);
            case "multiply":
                return multiply(firstNum, secondNum);
            case "power":
                return power(firstNum, secondNum);
        }
    }
}




//variables

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const previousInputElement = document.querySelector('[data-previous-input]');
const currentInputElement = document.querySelector('[data-current-input]');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('del');

const calculator = new Calculator(previousInputElement, currentInputElement);
//click events
numberButtons.forEach((button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.getDisplay();
    })
}))

operatorButtons.forEach((button => {
    button.addEventListener('click', () => {
        calculator.addOperator(button.id);
        calculator.getDisplay();
    })
}))


deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.getDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.getDisplay()
})

