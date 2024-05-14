const menu = document.getElementById("menu") 
const cartBtn = document.getElementById("cart-btn") // botao do footer 
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items") // items dentro do carrinho
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn") // botao finalizar pedido
const closeModalBtn = document.getElementById("close-modal-btn")  // botao fechar
const cartCounter= document.getElementById("cart-count") // numero do carrinho de quantidade
const addressInput= document.getElementById("address")
const addressWarn= document.getElementById("address-warn")

let cart = [];


// abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updtadeCartModal();
    cartModal.style.display = "flex"
})

//fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target == cartModal){
        cartModal.style.display = "none"
    }
   
})

//Botao fechar 
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
   
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        addToCart(name,price)
    }
})

//funcao para adicionar no carrinho

function addToCart(name,price){

  const existingItem = cart.find(item => item.name === name)

  if(existingItem){
    existingItem.quantity += 1;
   
  }else{

    cart.push({
      name,
      price,
      quantity : 1,
    })
    
  }

  
  updtadeCartModal()

}

//atualiza carrinho

function updtadeCartModal(){
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement("div")
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

    

    cartItemElement.innerHTML = `<div class="flex items-center justify-between">
    <div>
        <p class="font-medium">${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
    </div>
        <button class="remove-btn" data-name="${item.name}" >
        remover
        </button>
    
</div>`;

total += item.price * item.quantity; 


    cartItemsContainer.appendChild(cartItemElement)
  })

  cartTotal.textContent = total.toLocaleString("pt-BR",{
    style : "currency",
    currency: "BRL"
  }); 

  cartCounter.innerHTML = cart.length;
}

// funcao para remover o item do carrinho

cartItemsContainer.addEventListener("click", function(event){
  if(event.target.classList.contains("remove-btn") ){
    const name  = event.target.getAttribute("data-name")

    removeItemCard(name);
  }
})

function removeItemCard(name){
  const index = cart.findIndex(item => item.name === name);

  if(index  !== -1){
    const item = cart[index];

    if(item.quantity > 1){
      item.quantity -= 1;
      updtadeCartModal();
      return;
    }

    cart.splice(index, 1);
    updtadeCartModal();
  }


}

addressInput.addEventListener("input", function(event){
  let imputValue = event.target.value;

  if(imputValue !== ""){
    addressWarn.classList.add("hidden")
  }
})



checkoutBtn.addEventListener("click", function(){

  const isOpen = checkRestauranteOpen();
  if(!isOpen){
   
    Toastify({
      text: "Restaurante Fechado",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast()

    return;
  }

  if(cart.length === 0) return;
  if(addressInput.value === ""){
  addressWarn.classList.remove("hidden")
  return;
}

//Enviar para o whatsapp
const  cartItems = cart.map((item) => {
  return(
    `${item.name} Quantidade: (${item.quantity}) Preço: R$ ${item.price} | `

  )
}).join("")

  const message = encodeURIComponent(cartItems)
  const phone = "5581993575588"

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")


  cart.length = 0;
  updtadeCartModal()
})

//verificar a hora
function checkRestauranteOpen(){
 const data = new Date();
 const hora = data.getHours();
 return hora >= 17 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestauranteOpen();

if(isOpen){
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
}else{
  spanItem.classList.remove("bg-green-500");
  spanItem.classList.add("bg-red-500");
}








