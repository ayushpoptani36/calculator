let expression="0";
let result=0;
let operand1="";
let operand2="";
let operator="";



const operators={
    '+':add,
    '-':subtract,
    '*':multiply,
    '/':divide,
    '=':'equals'
    };
const expDisplay=document.querySelector('.expression');
expDisplay.textContent=expression;
const resDisplay=document.querySelector('.result');
const clearButton=document.querySelector('#clear');
const buttons=document.querySelectorAll('.button');


buttons.forEach((button)=>{button.addEventListener('click',buttonClick);
button.addEventListener('transitionend',removeTransition);
});

clearButton.addEventListener('click',clearAll);


display();
function removeTransition(e){
    if(e.propertyName!== 'transform') return;
    e.target.classList.remove('clicked');
}

function buttonClick(e){
    e.target.classList.add('clicked');
    let cont=e.target.textContent;
    if(expression==="0"){
        expression="";
    }
    if(cont==="AC"){
        clearAll();
    }
    else if(cont in operators){
        if(operator!==""){
            result=Number(operators[operator](Number(operand1),Number(operand2)));
            result=Math.round(result * 100) / 100
            operand1=result;
            operand2="";
        }
        expression+=" ";
        expression+=cont;
        
        operator=cont==="="?"":cont;
        expression+=" ";
        if(cont==="="){
            expression+=result+' ';
        }
    }else if(cont==="Back"){
        if(operator!==""){
            if(operand2.length>=1){
                operand2=operand2.slice(0,-1);
                expression=expression.slice(0,-1);
            }
        }else{
            if(operand1.length>=1){
                operand1=operand1.slice(0,-1);
                expression=expression.slice(0,-1);
            }
        }
    }
    else{
        if(operator===""){
            operand1+=cont;
        }else{
            operand2+=cont
        }
    expression+=cont;
    }
    display();
}

function clearAll(){
    expression="0";
    result=0;
    operand1="";
    operand2="";
    operator="";

}
function display(){
    expDisplay.textContent=expression;
    resDisplay.textContent=result;
}
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

window.addEventListener('keydown',doKeyboardStuff);

function doKeyboardStuff(e){
    
    let but;
    if(e.shiftKey){
        if(e.keyCode===187){
            but=document.querySelector('#add');
        }else if(e.keyCode===56){
            but=document.querySelector('#multiply');
        }
        
    }else if(e.keyCode===13){
        but=document.querySelector('#equal');
    }
    else{
        but=document.querySelector(`div[data-key="${e.keyCode}"]`);
    }
    
    but.click();
}