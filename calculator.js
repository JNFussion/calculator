function add (a, b){
    return a + b;
}
function subtract (a, b){
    return a - b;
}
function multiply (a, b){
    return a * b;
}
function divide (a, b){
    return a / b;
}
function operate(operator, a, b){

    if (operator === "+"){
        return add(a,b);
    }else if (operator === "-"){
        return subtract(a,b)
    }else if (operator === "*"){
        return multiply(a, b);
    }else if(operator === "/"){
        return divide(a/b);
    }else{
        reset;
        return alert("bad operator");
    }
}
function reset(){
    location.reload();
}
function getFirstOperands (str){ 
    return str.split(" ")[0];
}
function getSecondOperands (str){
    return str.split(" ")[2];
}
function getOperator(str){
    return str.split(" ")[1];
}
function isPreviusOperator(str){
    if(str.charAt(str.length -1) === "+"){
        return true;
    }else if(str.charAt(str.length - 1) === "-"){
        return true;
    }else if(str.charAt(str.length -1) === "*"){
        return true
    }else if(str.charAt(str.length -1) === "/"){
        return true;
    }else{
        return false;
    }
}
function thereIsOperator(str){
    return str.match(/[+-/*]/g) !== null;
}
function main(){
    const result = document.querySelector('#result');
    const operation = document.querySelector('#operations');
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const clear = document.getElementById('clear');
    const back = document.querySelector('#back');
    const equal = document.querySelector('#equal')
    

    numbers.forEach(button => {
        button.addEventListener('click', () =>{
            if(result.textContent !== ''){
                
            }else if(isPreviusOperator(operation.textContent)){
                operation.textContent +=" " + button.textContent;
            }else{
                operation.textContent += button.textContent;  
            }
           
        })
    })

    operators.forEach(operator =>{
        
        operator.addEventListener('click', () =>{
            if(thereIsOperator(operation.textContent)){
                let operator = getOperator(operation.textContent);
                let operand1 = getFirstOperands(operation.textContent)
                let operand2 = getSecondOperands(operation.textContent)
                result.textContent = operate(operator,+operand1, +operand2)
                operation.textContent = result.textContent;
            }
            operation.textContent +=" "+ operator.textContent;
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
    })
}
main();

