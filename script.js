const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const result = document.getElementById('result');
const playerInput = document.getElementById('playerInput');
const inputForm = document.getElementById('inputForm');
const correctSound = document.getElementById('correct');
const worngSound = document.getElementById('wrong');
const levelButtons = document.querySelectorAll('.level');
const operations = ['+','-','&times;'];

window.onload = ()=>{
    playerInput.value = null;
    playerInput.setAttribute('disabled', true)
}
const randomNumber = (x)=>{
    return Math.floor(Math.random() * x) 
}

let number1 = '...', number2,_operation = '&times;',_result,playerInputValue
const reset = ()=>{
    number2 = randomNumber(10),
    num1.innerHTML = number1
    num2.innerHTML = number2
    operation.innerHTML = _operation
    result.innerHTML = '?'
    result.style.borderColor='#778899'
    playerInput.focus()
    playerInput.value = null
}
reset();
const calculation = (n1,n2,o)=>{
    let result;
    switch(o){
        case operations[0]: result = n1 + n2
        break;
        case operations[1]: result = n1 - n2
        break;
        case operations[2]: result = n1 * n2
        break;
        case operations[3]: result = n1 / n2
        break
        default: result = null
        break
    }
    return result
}


inputForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    playerInputValue = playerInput.value
    _result = calculation(number1,number2,_operation)
    if(+playerInputValue === _result){
        result.style.borderColor = 'green'
        correctSound.play()
    }
    else{
        result.style.borderColor = 'red'
        worngSound.play()
    } 

    result.innerHTML = _result

    setTimeout(() => {
        reset();
    }, 2000);
})

levelButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        levelButtons.forEach(b=> b.classList.remove('apply'));
        button.classList.add('apply');
        number1 = Number(button.textContent)
        num1.innerHTML = number1
        playerInput.removeAttribute('disabled')
        reset();
    })
})

