// const apiKey = 49dddcc0dc104b41af87dbe0cd34cca7
let cartItems = []
//  let cartTotal = document.getElementById("count")
// let cartTotal = document.getElementById("count").textContent = getCartTotal();

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".products");
  let shopbtn = document.getElementById("shop")
  shopbtn.addEventListener("click", (e) => toggleCart(e))

  

  let selectForm = document.getElementById("shop")
  selectForm.addEventListener('change', (e) => {
    console.log(e.target.value)
    fetch(`http://localhost:3000/${e.target.value}`)
    .then((response) => response.json())
    .then((json) => renderProductCard(json))
  })

  let cartCanvas = document.getElementById("cartitems")


  // fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=49dddcc0dc104b41af87dbe0cd34cca7&food=cheddar`)
  // .then((response) => response.json())
  // .then((json) => console.log(json))




fetch("http://localhost:3000/cheeses")
  .then(res => res.json())
  .then(cheeses => {
    console.log(cheeses)
    cheeses.forEach(cheese => renderProductCard(cheese));
  });

  
  
  function renderProductCard(cheese) {
    const container = document.querySelector(".products");
    console.log(cheese)
    let winebtn = document.createElement("i");
    winebtn.classList.add("fa-solid", "fa-wine-glass", "glassbtn");
   
    winebtn.addEventListener('click', () => getPairing(cheese))
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${cheese.image}" class="product-img" />
    <h3 class="product-name">${cheese.name}</h3>
    <p class="product-description">${cheese.description}</p>
    <p class="product-price">$${cheese.price}</p>
  `;
        let button = document.createElement("button")
        button.className = "product-btn"
        button.innerText = "Add to Cart"
        button.addEventListener('click', (e) => addToCart(e, cheese))
        // const container = document.querySelector(".products");
        card.appendChild(winebtn)
        card.appendChild(button)
        container.appendChild(card);
        //  container.appendChild(button)
    }

    // <p class="cart-description">${cheese.description}</p>
    
    function addToCart(e, cheese) {
      cartItems.push(cheese)
      let cartCard = document.createElement("div")
      cartCard.className = "cart-card"
      cartCard.innerHTML = `
      <img src="${cheese.image}" class="cart-img" />
      <h3 class="cart-name">${cheese.name}</h3>
     
      <p class="cart-price">$${cheese.price}</p>
      `;
        let button = document.createElement('button')
        button.innerText = "delete"
        button.addEventListener('click', (e) => deleteCartItem(e, cheese))
        cartCard.appendChild(button)
        cartCanvas.appendChild(cartCard)
        document.getElementById("count").textContent = getCartTotal(cartItems);

    }

    
    
    function toggleCart(e) {
      console.log(e)
    }

    
    
    function deleteCartItem(e, cheese) {
      e.target.parentNode.remove()
      cartItems = cartItems.filter((item) => item.id !== cheese.id)
      updateCartTotal()
     
    }

    function updateCartTotal() {
      const total = getCartTotal(cartItems)
       document.getElementById("count").textContent = total.toFixed(2)

    }

    
    function getCartTotal(cartItems) {
     return cartItems.reduce((acc, item) => acc + item.price, 0)

    }

    function getPairing(cheese) {
      console.log(cheese.name)
       fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=49dddcc0dc104b41af87dbe0cd34cca7&food=${cheese.name}`)
        .then((response) => response.json())
        .then((json) => { 
          
          console.log(json)
          let pairing = json
         createWineModal(pairing)
        })
          
    }

    function createWineModal(pairing) {
        let winemodal = document.getElementById("wine-modal")
        winemodal.classList.remove("hidden")
        console.log(pairing)
        let description = document.getElementById("modal-description")
        description.innerText = pairing.pairingText
        console.log(pairing.pairingText)
        let wines = document.getElementById("modal-wines")
        wines.innerText = pairing.pairedWines
        console.log(pairing.productMatches[0])
        
        let product = document.getElementById("modal-product")
        product.innerText = pairing.productMatches[0].title
        let button = document.getElementById("close-btn")
        button.addEventListener("click", () => winemodal.classList.add("hidden"))


    }

   


  });