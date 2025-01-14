
const button2 = document.querySelector(".mensagem")
const modal2 = document. querySelector(".modalmensagem")
const buttonClose2 = document.querySelector(".modalmensagem .closemsm")

button2.onclick = function(){
    modal2.showModal()
}

buttonClose2.onclick = function (){
     modal2.close()
}



/* modalcart */
const button = document.querySelector(".bntcart")
const modal = document. querySelector(".modalcart")
const buttonClose = document.querySelector(".modalcart .cart-close")

button.onclick = function(){
    modal.showModal()
}

buttonClose.onclick = function (){
     modal.close()
}


