const resultDisplay = document.querySelector('#result');
const operationDisplay = document.querySelector('#operations');
const numbersBtn = document.querySelectorAll('.number');
const operatorsBtn = document.querySelectorAll('.operator');
const dotBtn = document.getElementById('dot')
const clearBtn = document.getElementById('clear');
const backBtn = document.getElementById('back');
const equalBtn = document.getElementById('equal');


function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
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
            return divide(a / b);
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
function thereIsOperator(str) {
    return str !== null && str.match(/[+-/*]/g) !== null;
}
function setOperationDisplay(simbol, number1, number2) {

    if (number1 !== null && simbol !== null && number2 != null) {
        operationDisplay.textContent = number1 + " " + simbol + " " + number2;
    } else if (number1 !== null && simbol !== null && number2 === null) {
        operationDisplay.textContent = number1 + " " + simbol + " ";
    } else if (number1 !== null && simbol === null && number2 === null) {
        operationDisplay.textContent = number1 + " ";
    } else {
        return operationDisplay.textContent = 'A';
    }
}
/*
function getFirstOperands (str){ 
    return str.split(" ")[0];
}
function getSecondOperands (str){
    return str.split(" ")[2];
}
function getOperator(str){
    return str.split(" ")[1];
}
function isOperator(str){
    if(str === "+"){
        return true;
    }else if(str === "-"){
        return true;
    }else if(str === "*"){
        return true
    }else if(str === "/"){
        return true;
    }else{
        return false;
    }
}

function isPreviusOperator(str){
    return isOperator(str.charAt(str.length -1));
}

function main(){
    const result = document.querySelector('#result');
    const operation = document.querySelector('#operations');
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const clear = document.getElementById('clear');
    const back = document.querySelector('#back');
    const equal = document.querySelector('#equal')
    let lastInput = null;

    numbers.forEach(button => {
        button.addEventListener('click', () =>{
            if(lastInput === '='){
                operation.textContent = button.textContent;  
            }else if(isPreviusOperator(operation.textContent)){
                operation.textContent +=" " + button.textContent;
            }else{
                operation.textContent += button.textContent;  
            }
            lastInput = button.textContent;
        })
    })

    operators.forEach(operator =>{
        
        operator.addEventListener('click', () =>{
            if(thereIsOperator(operation.textContent) && isOperator(lastInput) ){
                let operator = getOperator(operation.textContent);
                let operand1 = getFirstOperands(operation.textContent)
                let operand2 = getSecondOperands(operation.textContent)
                result.textContent = operate(operator,+operand1, +operand2)
                operation.textContent = result.textContent;
                lastInput = operator.textContent;
            }else if(!isOperator(lastInput)){
                operation.textContent +=" "+ operator.textContent;
                lastInput = operator.textContent;
            }
            
        })
    })

    


    clear.addEventListener('click', reset);
    back.addEventListener('click', () =>{
        operation.textContent = operation.textContent.slice(0,-1);
    })
    equal.addEventListener('click',() =>{
        let operator = getOperator(operation.textContent);
        let operand1 = getFirstOperands(operation.textContent)
        let operand2 = getSecondOperands(operation.textContent)
        result.textContent = operate(operator,+operand1, +operand2)
        lastInput = equal.textContent;
    })
}
*/
function main() {
    let operand1 = null;
    let operand2 = null;
    let operator = null;

    numbersBtn.forEach(button => {
        button.addEventListener('click', () => {
            if (!thereIsOperator(operator)) {
                if (operand1) {
                    operand1 += button.textContent
                } else {
                    operand1 = button.textContent
                }
            } else {
                if (operand2) {
                    operand2 += button.textContent
                } else {
                    operand2 = button.textContent
                }
            }
            console.log(operator, operand1, operand2);
            setOperationDisplay(operator, operand1, operand2);
        })
    })
    operatorsBtn.forEach(op => {
        op.addEventListener('click', () => {
            if (!thereIsOperator(operator) && operand1) {
                operator = op.textContent;
            } else if (thereIsOperator(operator) && operand1 !== null && operand2 !== null) {
                operand1 = operate(operator, +operand1, +operand2);
                operator = op.textContent;
                operand2 = null;
            }
            console.log(operator, operand1, operand2);
            setOperationDisplay(operator, operand1, operand2);
        })
    })
    equalBtn.addEventListener('click', () => {
        if (thereIsOperator(operator) && operand1 !== null && operand2 !== null) {
            resultDisplay.textContent = operate(operator, +operand1, +operand2);
            operator = null;
            operand1 = null;
            operand2 = null;
        }

    })
    dotBtn.addEventListener('click', () =>{
        
    })







    clear.addEventListener('click', reset);
}


main();

