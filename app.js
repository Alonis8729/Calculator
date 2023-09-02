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
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") this.operate();
        switch (operator) {
            case "power":
                this.operator = "^";
                break;
            case "add":
                this.operator = "+";
                break;
            case "multiply":
                this.operator = "×";
                break;
            case "subtract":
                this.operator = "-";
                break;
            case "divide":
                this.operator = "÷";
                break;
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
            this.previousInputElement.innerText = "";

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
        if (afterDecimal != null)
            return `${numberDisplay}.${afterDecimal}`
        else
            return numberDisplay;
    }

    //arithmetic calculations functions
    add(a, b) {
        const result = a + b;
        return this.roundIfLong(result);
    }
    subtract(a, b) {
        const result = a - b;
        return this.roundIfLong(result);
    }
    multiply(a, b) {
        const result = a * b;
        return this.roundIfLong(result);
    }
    divide(a, b) {
        if (b === 0) {
            alert("Cannot divide by zero")
            return
        }
        const result = a / b;
        return this.roundIfLong(result);
    }

    power(a, b) {
        const result = a ** b;
        return this.roundIfLong(result);
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


    operate() {
        let result;
        let prevNum = parseFloat(this.previousOperand);
        let currNum = parseFloat(this.currentOperand);
        switch (this.operator) {
            case "+":
                result = this.add(prevNum, currNum);
                break;
            case "-":
                result = this.subtract(prevNum, currNum);
                break;
            case "÷":
                result = this.divide(prevNum, currNum);
                break;
            case "×":
                result = this.multiply(prevNum, currNum);
                break;
            case "^":
                result = this.power(prevNum, currNum);
                break;
        }

        this.previousOperand = "";
        this.currentOperand = result;
        this.operator = undefined;
    }
}




//variables
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('equals');
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

equalsButton.addEventListener('click', () => {
    calculator.operate()
    calculator.getDisplay();
})

//keyboard support