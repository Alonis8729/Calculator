//calculator functions
function add(a, b) {
    const result = a + b;
    return roundIfLong(result);
}
function subtract(a, b) {
    const result = a - b;
    return roundIfLong(result);
}
function multiply(a, b) {
    const result = a * b;
    return roundIfLong(result);
}
function divide(a, b) {
    if (b === 0)
        return "Cannot divide by zero"
    result = a / b;
    return roundIfLong(result);
}

function power(a, b) {
    const result = a ** b;
    return roundIfLong(result);
}

function roundIfLong(result) {
    let stringNumber = result.toString();
    if (stringNumber.includes('.')) {
        const decimalPartLength = stringNumber.split('.')[1].length;
        if (decimalPartLength > 4)
            return parseFloat(result.toFixed(4));
    }
    return result;
}

function operate(firstNum, operator, secondNum) {
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


//variables
let firstNum = "";
let secondNum = "";
let operator = "";

