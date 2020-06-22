let cards = document.querySelectorAll('.memoryCard')
// window.localStorage.clear()
// window.localStorage.setItem('bestScore', 10000)
console.log(localStorage)
let flipped =false
let first
let second
let start, end
let cont
let record = JSON.parse(window.localStorage.getItem('bestScore'))
document.getElementById("score").innerHTML += `O melhor tempo é: ${record} seg`

async function play(){  
  start = Date.now()
  end = 0
  cont = 0
  cards.forEach(card => {
      let ramdom = Math.floor(Math.random() * 16);
      card.style.order = ramdom
    }) 
    await new Promise(r => setTimeout(r,2000))       
    cards.forEach(card=> card.classList.toggle('flip'))     
    //document.getElementById("btn").desable = true  
}
cards.forEach(card => card.addEventListener('click', flip))

function flip() {
  this.classList.toggle('flip')
  if(flipped == false){
    flipped =true    
    first = this    
  }else{
    if (this == first) {
      second = 1111
      flipped = false
    }else{
      second = this    
      flipped = false
    } 
    check()
  }
} 

async function check(){
  if(first.dataset.card === second.dataset.card){
    first.removeEventListener('click', flip)
    second.removeEventListener('click', flip)
    console.log("é igual")
    cont = cont + 1 
    console.log(cont)  
    endGame()
  } 
  else{
    await new Promise(r => setTimeout(r,1000))     
    first.classList.toggle('flip')
    second.classList.toggle('flip')
  }
}

function endGame(){
  if(cont == 8){
    
    end = Date.now()
    let result = (end - start)/1000
    document.getElementById("timer").innerHTML += ` ${result}`
    let bestScore = JSON.parse(window.localStorage.getItem('bestScore'))
    console.log(bestScore)
    if(bestScore > result){
      alert("parabens!! você quebrou o record!!")
      window.localStorage.clear()
      window.localStorage.setItem('bestScore', result);
    }
    console.log(bestScore)
    // alert('Fim de jogo!!')
  }
} 