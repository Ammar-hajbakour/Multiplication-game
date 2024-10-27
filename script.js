const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const result = document.getElementById('result');
const container = document.querySelector('.container')
const playerInput = document.getElementById('playerInput');
const inputForm = document.getElementById('inputForm');
const correctSound = document.getElementById('correct');
const worngSound = document.getElementById('wrong');
const winerSound = document.getElementById('winerSound');
const loserSound = document.getElementById('loserSound');
const levelButtons = document.querySelectorAll('.level');
const problemCount = document.getElementById('total');
const correctCount = document.getElementById('true');
const wrongCount = document.getElementById('false');
const operations = ['+','-','&times;'];

let pCount = 0,cCount=0,wCount=0;
problemCount.textContent = pCount
    correctCount.textContent = cCount
    wrongCount.textContent = wCount
window.onload = ()=>{
    playerInput.value = null;
    playerInput.setAttribute('disabled', true)
}
const randomNumber = (x)=>{
    return Math.round(Math.random() * x) 
}

let number1, number2,_operation = '&times;',_result,playerInputValue,buttonContent,lastNum2
const reset = ()=>{
    number1 = '...'
    num1.innerHTML = number1
    while(lastNum2 === number2){
        number2 = randomNumber(10);
    }
    lastNum2 = number2
    num2.innerHTML = number2
    operation.innerHTML = _operation
    result.innerHTML = '?'
    result.style.borderColor='#555'
    playerInput.focus()
    playerInput.value = null

    if(buttonContent === undefined) return
    switch(buttonContent){
        case '1-5': number1 = randomNumber(5)
        break;
        case '6-10':
            x = randomNumber(10)
            number1 = x > 5 ? x : x + 5
            break;
        default: number1 = Number(buttonContent)
        break;
    }
    num1.innerHTML = number1
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
        result.style.borderColor = 'rgb(0, 128, 79)'
        correctSound.play()
        cCount++;
    }
    else{
        result.style.borderColor = 'rgb(255, 0, 0)'
        worngSound.play()
        wCount++
    } 
    pCount++;
    result.innerHTML = _result
    problemCount.textContent = pCount
    correctCount.textContent = cCount
    wrongCount.textContent = wCount
    if(pCount >= 5){
        const res = (cCount*100)/pCount
        if( res >= 70){
            winerSound.play() 
        }
        else {
            loserSound.play()  
        }
        container.innerHTML = `<h1><span style="color:${res >= 70 ? 'rgb(0, 128, 79)' : 'rgb(255, 0, 0)'};">${res.toFixed(0)}</span> / 100</h1>`
        playerInput.innerHTML = ''
        setTimeout(()=> location.reload(), 5000)
        return 
    }
    setTimeout(() => {
        reset();
    }, 2000);
})

levelButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        levelButtons.forEach(b=> {
            b.classList.remove('apply')
            b.style.animation = 'none'
        });
        button.classList.add('apply');
        buttonContent = button.textContent
        playerInput.removeAttribute('disabled')
        reset();
    })
})

