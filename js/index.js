const allClear = document.querySelector("[data-all-clear]");
const delInput = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equals]");
const operatorButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");
const prevText = document.querySelector("[data-previous-operand]");
const currentText = document.querySelector("[data-current-operand]");

allClear.addEventListener("click", button => {
    clear();
})

delInput.addEventListener("click", button => {
    del();
})


numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        dispNumber(e);
    });
})

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        operation(e);
    })
})

equalButton.addEventListener("click", e => {
    operator=prevText.innerHTML[prevText.innerHTML.length-1];
    currentText.innerHTML=compute(prevText.innerHTML.substring(0,prevText.innerHTML.length-1),currentText.innerHTML,operator);
    prevText.innerHTML="";
})



function clear(){
    prevText.innerHTML="";
    currentText.innerHTML="0";
}

function del(){
    if(prevText.innerHTML!="" || currentText.innerHTML!=""){
        if(prevText.innerHTML=="" && currentText.innerHTML!=""){
            if(currentText.innerHTML!="0"){
                if(currentText.innerHTML.length==1){
                    currentText.innerHTML="0";
                }
                else{
                    currentText.innerHTML=currentText.innerHTML.substring(0,currentText.innerHTML.length-1);
                }
            }
            prevText.innerHTML="";
        }
        else if(prevText.innerHTML!="" && currentText.innerHTML==""){
            if(prevText.innerHTML.length==1){
                currentText.innerHTML="0";
                prevText.innerHTML="";
            }
            else{
                currentText.innerHTML=prevText.innerHTML.substring(0,prevText.innerHTML.length-1);
            }
            prevText.innerHTML="";
        }
        else{
            currentText.innerHTML=currentText.innerHTML.substring(0,currentText.innerHTML.length-1);
        }
    }
}

function dispNumber(number){
    if(currentText.innerHTML=="" || currentText.innerHTML=="0"){
        currentText.innerHTML=number.target.innerHTML;
    }
    else{
        if(currentText.innerHTML.includes(".") && number.target.innerHTML=="."){
            currentText.innerHTML=currentText.innerHTML;
        }
        else{
            currentText.innerHTML=currentText.innerHTML.concat(number.target.innerHTML);
        }
    }
}

function operation(op){
    if(prevText.innerHTML=="" && currentText.innerHTML!=""){
        prevText.innerHTML=currentText.innerHTML.concat(op.target.innerHTML);
        currentText.innerHTML="0";
    }
    else if(prevText.innerHTML!=""){
        var ope = prevText.innerHTML[prevText.innerHTML.length-1];
        currentText.innerHTML=compute(prevText.innerHTML.substring(0,prevText.innerHTML.length-1),currentText.innerHTML,ope);
        prevText.innerHTML="";
    }
}

function compute(op1,op2,op){
    var x = parseFloat(op1);
    var y = parseFloat(op2);
    var res=0;
    switch(op){
        case "+": res=x+y;
        break;
        case "-": res=x-y;
        break;
        case "/": res=x/y;
        break;
        case "*": res=x*y;
        break;
        default:break;
    }
    return res.toLocaleString();
}