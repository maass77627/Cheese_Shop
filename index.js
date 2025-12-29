const apiKey = "49dddcc0dc104b41af87dbe0cd34cca7"

let cartItems = []
 
const container = document.querySelector(".products");
  

  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

  
  let button = document.getElementById("about-close")
  let aboutmodal = document.getElementById("about-modal")
  
  button.addEventListener("click", () => aboutmodal.classList.add("hidden") );  

   
  let select = document.getElementById("shopfour")
   select.addEventListener("click", () => { 
    console.log("changed") ;
    aboutmodal.classList.remove("hidden")
  })


  
   const reviewdropdown = document.getElementById("shoptwo")
   reviewdropdown.addEventListener("change", () => {
    console.log("change")
    loadReviewCarousel() })
  




  const container = document.querySelector(".products");
      let shopbtn = document.getElementById("shop")
      shopbtn.addEventListener("click", (e) => toggleCart(e))

  

  let selectForm = document.getElementById("shop")
      selectForm.addEventListener('change', (e) => {
      console.log(e.target.value)
    
    console.log(e.target)
    fetch(`http://localhost:3000/${e.target.value}`)
    .then((response) => response.json())
    .then((json) => {
      let products = json
      container.innerHTML = " "
      products.forEach((product) => renderProductCard(product))

    })
  })

  let cartCanvas = document.getElementById("cartitems")


  



fetch("http://localhost:3000/cheeses")
  .then(res => res.json())
  .then(cheeses => {
    console.log(cheeses)
    // container.innerHTML = " "
    cheeses.forEach(cheese => renderProductCard(cheese));
  });

  
  
  function renderProductCard(product) {
     console.log(product)
    let winebtn = document.createElement("i");
    winebtn.classList.add("fa-solid", "fa-wine-glass", "glassbtn");
   
    winebtn.addEventListener('click', () => getPairing(product, apiKey))

    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${product.image}" class="product-img" />
    <h3 class="product-name">${product.name}</h3>
    <p class="product-description">${product.description}</p>
    <p class="product-price">$${product.price}</p>

    <div class="star-rating">
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
  </div>
  `;

  
    let stars = card.querySelectorAll(".star")
  
    stars.forEach((star, index) => {
      console.log(index)
      console.log(product.rating)
      if (index < product.rating) {
        star.classList.add("filled");
      } else { 
        star.classList.remove("filled")
      }
      
     })

    
        let button = document.createElement("button")
        button.className = "product-btn"
        button.innerText = "Add to Cart"
        button.addEventListener('click', () => addToCart(product))
        card.appendChild(winebtn)
        card.appendChild(button)
        container.appendChild(card);

       }

  
    
    function addToCart(product) {
      cartItems.push(product)
      let cartCard = document.createElement("div")
      cartCard.className = "cart-card"
      cartCard.innerHTML = `
      <img  src="${product.image}" class="cart-img" />
      <h3 class="cart-name">${product.name}</h3>
     
      <p class="cart-price">$${product.price}</p>
      `;
        let button = document.createElement('button')
        button.innerText = "delete"
        button.addEventListener('click', (e) => deleteCartItem(e, product))
        cartCard.appendChild(button)
        cartCanvas.appendChild(cartCard)
        document.getElementById("count").textContent = getCartTotal(cartItems);

    }

    
    
    function toggleCart(e) {
      console.log(e)
    }

    
    
    function deleteCartItem(e, product) {
      e.target.parentNode.remove()
      cartItems = cartItems.filter((item) => item.id !== product.id)
      updateCartTotal()
     
    }

    function updateCartTotal() {
      const total = getCartTotal(cartItems)
       document.getElementById("count").textContent = total.toFixed(2)

    }

    
    function getCartTotal(cartItems) {
     return cartItems.reduce((acc, item) => acc + item.price, 0)

    }

    function getPairing(cheese, apiKey) {
      console.log(cheese.name)
      console.log(apiKey)
      fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=${apiKey}&food=${cheese.name}`)
        .then((response) => response.json())
        .then((json) => { 
          let pairing = json
         createWineModal(pairing)
        })
          
    }



    function createWineModal(pairing) {
        const winemodal = document.getElementById("wine-modal");
        winemodal.classList.remove("hidden");
        const description = document.getElementById("modal-description");
        const wines = document.getElementById("modal-wines")
        const product = document.getElementById("modal-product")
        description.innerText = pairing?.pairingText || "No pairing description available";
        wines.innerText = pairing?.pairedWines?.length ? pairing.pairedWines.join(", ") : "No wine recommendations available.";
        product.innerText = pairing?.productMatches?.[0]?.title || "No matching product found.";
        let button = document.getElementById("close-btn")
        button.addEventListener("click", () => winemodal.classList.add("hidden"));
}


function style(star) {
  star.classList.add("filled")
}

function loadReviewCarousel() {
  fetch(`http://localhost:3000/reviews`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  let reviews = json;
  reviews.forEach((review, index) => buildReviewCarousel(review, index))
  
})
}

function buildReviewCarousel(review, index) {
  console.log(review)
  let card = document.createElement("div")
  card.className = index === 0
    ? "carousel-item active"
    : "carousel-item"
  let carousel = document.getElementById("review-carousel-inner")
  let header = document.createElement("header")
  header.className = "review-name"
  header.innerHTML = review.author
  let p = document.createElement("p")
  p.innerText = review.comment
  let image = document.createElement("img")
  image.className = "review-image"
  image.src = review.image
  card.appendChild(header)
  card.appendChild(image)
  card.appendChild(p)
  card.appendChild(renderStars(review.rating))
  carousel.appendChild(card)
  
  }


  function renderStars(rating) {
    const ratingDiv = document.createElement("div")
    ratingDiv.className = "star-rating";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-star", "star");
      if (i <= rating) {
        star.classList.add("filled");
         star.classList.add("fa-solid");
      } else {
        star.classList.add("fa-solid")
        star.classList.remove("filled");
        // star.classList.add("fa-regular");
      }
      ratingDiv.appendChild(star);
    }
    return ratingDiv;
  }
   


  });