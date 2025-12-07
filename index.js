// const apiKey = 49dddcc0dc104b41af87dbe0cd34cca7

document.addEventListener("DOMContentLoaded", () => {
  let shopbtn = document.getElementById("cart-btn")
  shopbtn.addEventListener("click", (e) => toggleCart(e))

  let cartCanvas = document.getElementById("cart")


  fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=49dddcc0dc104b41af87dbe0cd34cca7&food=cheddar`)
  .then((response) => response.json())
  .then((json) => console.log(json))




fetch("http://localhost:3000/cheeses")
  .then(res => res.json())
  .then(cheeses => {
    console.log(cheeses)
    cheeses.forEach(cheese => renderCheeseCard(cheese));
  });

  function renderCheeseCard(cheese) {
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
        const container = document.querySelector(".products");
        card.appendChild(button)
         container.appendChild(card);
        //  container.appendChild(button)
    }

    
    
    function addToCart(e, cheese) {
      console.log(e)
      console.log(cheese)
      let cartCard = document.createElement("div")
      cartCard.className = "cart-card"
      cartCard.innerHTML = `
      <img src="${cheese.image}" class="cart-img" />
      <h3 class="cart-name">${cheese.name}</h3>
      <p class="cart-description">${cheese.description}</p>
      <p class="cart-price">$${cheese.price}</p>
      `;



      cartCanvas.appendChild(cartCard)
    }

    function toggleCart(e) {
      console.log(e)
    }






  });