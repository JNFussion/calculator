const resultDisplay = document.querySelector('#result');
const operationDisplay = document.querySelector('#operations');
const numbersBtn = document.querySelectorAll('.number');
const operatorsBtn = document.querySelectorAll('.operator');
const dotBtn = document.getElementById('dot')
const clearBtn = document.getElementById('clear');
const backBtn = document.getElementById('back');
const equalBtn = document.getElementById('equal');
let operand1 = null;
let operand2 = null;
let operator = null;


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
function add(a, b) {

    return round(a + b, 4);
}
function subtract(a, b) {

    return round(a - b, 4);
}
function multiply(a, b) {

    return round(a * b, 4);
}
function divide(a, b) {
    return round(a / b, 4);
}
function operate(operator, a, b) {

    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b)
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        if (b !== 0) {
            return divide(a, b);
        } else {
            alert("Cannot divide by 0");
            reset();
        }
    } else {
        reset;
        return alert("bad operator");
    }
}
function reset() {
    location.reload();
}
function isThereOperator(str) {
    return str !== null && str.match(/[+-/*]/g) !== null;
}
function isThereDot(str) {
    return str !== null && str.match(/[.]/g) !== null;
}
function setOperationDisplay(simbol, number1, number2) {

    if (number1 !== null && simbol !== null && number2 != null) {
        operationDisplay.textContent = number1 + " " + simbol + " " + number2;
    } else if (number1 !== null && simbol !== null && number2 === null) {
        operationDisplay.textContent = number1 + " " + simbol + " ";
    } else if (number1 !== null && simbol === null && number2 === null) {
        operationDisplay.textContent = number1 + " ";
    } else {
        return operationDisplay.textContent = '';
    }
}
function addNumber(btn) {
    if (!isThereOperator(operator)) {
        if (operand1) {
            operand1 += btn.textContent
        } else {
            operand1 = btn.textContent
        }
    } else {
        if (operand2) {
            operand2 += btn.textContent
        } else {
            operand2 = btn.textContent
        }
    }
    setOperationDisplay(operator, operand1, operand2);
}
function addOperator(btn) {
    if (!isThereOperator(operator) && operand1) {
        operator = btn.textContent;
    } else if (isThereOperator(operator) && operand1 !== null && operand2 !== null) {
        operand1 = operate(operator, +operand1, +operand2);
        operator = btn.textContent;
        operand2 = null;
    }
    setOperationDisplay(operator, operand1, operand2);
}
function addDot(btn) {
    if (!isThereOperator(operator) && operand1 !== null &&
        !isThereDot(operand1)) {
        operand1 += btn.textContent;
    } else {
        if (operand2 !== null && !isThereDot(operand2)) {
            operand2 += btn.textContent;
        }
    }
    setOperationDisplay(operator, operand1, operand2)
}
function undo() {
    if (!isThereOperator(operator) && operand1 !== null) {
        operand1 = operand1.slice(0, -1);
        if (operand1 === '') {
            operand1 = null;
        }
    } else {
        if (operand2 !== null) {
            operand2 = operand2.slice(0, -1);

            if (operand2 === '') {
                operand2 = null;
            }
        } else {
            operator = null;
        }
    }
    setOperationDisplay(operator, operand1, operand2);
}
function equal() {
    if (isThereOperator(operator) && operand1 !== null && operand2 !== null) {
        resultDisplay.textContent = operate(operator, +operand1, +operand2);
        operator = null;
        operand1 = null;
        operand2 = null;
    }
}
function main() {

    //Adds events to all the buttons

    numbersBtn.forEach(button => {
        button.addEventListener('click', () => {
            addNumber(button)
        })
    })
    operatorsBtn.forEach(op => {
        op.addEventListener('click', () => {
            addOperator(op);
        })
    })
    dotBtn.addEventListener('click', () => {
        addDot(dotBtn);
    })


    equalBtn.addEventListener('click', equal);
    backBtn.addEventListener('click', undo);
    clear.addEventListener('click', reset);


    //Adds input by keyboards

    window.addEventListener('keydown', function (e) {
        const button = document.querySelector(`button[data-key="${e.key}"]`);
        if (!button) {
            return;
        }

        if (button.className === "number") {
            addNumber(button);
        } else if (button.className === "operator") {
            addOperator(button);
        } else {
            switch (button.getAttribute('id')) {
                case 'dot':
                    addDot(button);
                    break;
                case 'equal':
                    equal();
                    break;
                case 'back':
                    undo();
                    break;
            }
        }
    })

    // Adds border of color white when hover over buttons

    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => btn.addEventListener('mouseenter', () => {
        if (btn.className === 'operator') {
            btn.classList.add('border-white-operators')
        } else {
            btn.classList.add('border-white-numbers')
        }


    }))
    allButtons.forEach(btn => btn.addEventListener('mouseleave', () => {
        if (!btn.className.search('operator')) {
            btn.classList.remove('border-white-operators')
        } else {
            btn.classList.remove('border-white-numbers')
        }
    }))
}


main();

