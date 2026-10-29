const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

// Attach event listeners to all buttons using a loop
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        const value = this.textContent;
        handleInput(value);
    });
}

function handleInput(value) {
    if (value === 'C') {
        clearCalculator();
    } else if (value === '=') {
        calculate();
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        setOperator(value);
    } else if (value === '.') {
        appendDecimal();
    } else {
        appendNumber(value);
    }
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0.';
        shouldResetScreen = false;
        updateDisplay();
        return;
    }

    // Check if decimal already exists using a loop
    let hasDecimal = false;
    for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === '.') {
            hasDecimal = true;
            break;
        }
    }

    if (!hasDecimal) {
        currentInput += '.';
        updateDisplay();
    }
}

function setOperator(op) {
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) {
        return;
    }

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result = 0;

    // Perform calculation using if-else statements and arithmetic operators
    if (operator === '+') {
        result = prev + curr;
    } else if (operator === '-') {
        result = prev - curr;
    } else if (operator === '*') {
        result = prev * curr;
    } else if (operator === '/') {
        if (curr === 0) {
            currentInput = 'Error';
            operator = null;
            previousInput = '';
            shouldResetScreen = true;
            updateDisplay();
            return;
        } else {
            result = prev / curr;
        }
    }

    currentInput = String(Math.round(result * 100000000) / 100000000);
    operator = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function updateDisplay() {
    if (operator !== null) {
        if (shouldResetScreen) {
            display.textContent = previousInput + ' ' + operator;
        } else {
            display.textContent = previousInput + ' ' + operator + ' ' + currentInput;
        }
    } else {
        display.textContent = currentInput;
    }
}
