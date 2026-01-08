
const apiKey = "49dddcc0dc104b41af87dbe0cd34cca7"

let cartItems = []
 
const container = document.querySelector(".products");


  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
   
    
   const wineModal = new bootstrap.Modal(document.getElementById("staticBackdrop"))
   const myCarousel = document.querySelector('#review-carousel')
   const reviewCarousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,
    wrap: false
   })

   stars = document.createElement("div")
   stars.className = "star-rating"
   stars.innerHTML = `
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
    <i  class="fa-solid fa-star star"></i>
   `

   let cartbtn = document.getElementById("cart-btn")
  cartbtn.addEventListener("click", () => console.log("clicked"))
  
  // let button = document.getElementById("about-close")
  

  let aboutSelect = document.getElementById("shopfour")
  aboutSelect.addEventListener("change", (e) => { 
    console.log("changed about")
    loadAboutModal(e)
  })

  let reviewSelect = document.getElementById("shoptwo")
  reviewSelect.addEventListener("change", (e) => {
    console.log(e.target)
    console.log("changed")
    fetchReviewData(e)

  })

  

  

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
        button.addEventListener('click', () => {
          console.log("clicked cart")
          addToCart(product)})
        card.appendChild(winebtn)
        card.appendChild(button)
        container.appendChild(card);

       }

  
    
    function addToCart(product) {
      let offCanvas = document.getElementById("body")
      
     let item = cartItems.find(item => item.id === product.id)
      if (item) {
        item.quantity += 1 
      } else {
      product = {...product, quantity: 1}
      cartItems.push(product)
      let cartCard = document.createElement("div")
      cartCard.className = "cart-card"
      cartCard.innerHTML = `
      <img  src="${product.image}" class="cart-img" />
      <h3 class="cart-name">${product.name}</h3>
     <p class="cart-price">$${product.price}</p>
      `;
        let minus = document.createElement("button")
        minus.addEventListener("click", console.log("click minus"))
        minus.innerHTML = "-"
        let input = document.createElement("input")
        input.id = "input"
        input.value = 0
        input.type = "text"
        let plus = document.createElement("button")
        plus.innerHTML = "+"
        plus.addEventListener("click", () => handleQuantityChange())

        let buttontwo = document.createElement('button')
        buttontwo.innerText = "delete"
        buttontwo.addEventListener('click', (e) => deleteCartItem(e, product))
        cartCard.appendChild(plus)
        cartCard.appendChild(input)
        cartCard.appendChild(minus)
        cartCard.appendChild(buttontwo)
        offCanvas.appendChild(cartCard)
        document.getElementById("count").textContent = getCartTotal(cartItems);
      }

    }

    function handleQuantityChange() {
      let input = document.getElementById("input")
       let value = parseInt(input.value)
       console.log(value)
       value += 1
       console.log(value)
       input.value = value

    }

    
    

    
    
    function deleteCartItem(e, product) {
      // e.target.parentNode.remove()
      // cartItems = cartItems.filter((item) => item.id !== product.id)
      // updateCartTotal()
     
    }

    function updateCartTotal() {
      // const total = getCartTotal(cartItems)
      // // console.log(total.toFixed(2))
      //  document.getElementById("count").textContent = total.toFixed(2)

    }

    
    function getCartTotal(cartItems) {
    let total = cartItems.reduce((acc, item) => acc + item.price, 0)
    console.log(total)
      return total

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

    function loadAboutModal(e) {
       console.log(e.target)


     }



   function createWineModal(pairing) {
      let header = document.getElementById("title")
      let p = document.getElementById("text")
      let span = document.getElementById("span")
      if (pairing.pairedWines && pairing.pairingText && pairing.productMatches[0].title) {
      header.innerText = pairing.pairedWines
      p.innerText = pairing.pairingText
      span.innerText = pairing.productMatches[0].title
      } else {
        header.innerText = ""
        p.innerText = "No pairing Available at this Time"
        span.innerText = ""
      }
       console.log(pairing)
       wineModal.show()
    }


    function fetchReviewData() {
      fetch('http://localhost:3000/reviews')
      .then((response) => response.json())
      .then((json) => { 
        console.log(json)
        let reviews = json
        
        createReviewCarousel(reviews)

      })
    }

    function createReviewCarousel(reviews) {
      console.log(reviews)
      const carousel = document.querySelector(".carousel-inner")
    //  const carousel = document.querySelector("carousel-inner")
      for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i]
        // let carouselItem = document.getElementById(`slide-${i}`)
        let carouselItem = document.createElement("div")
        carouselItem.className = "carousel-item"
        carouselItem.id = `slide-${i}`
        console.log(carouselItem)
        let card = document.createElement("div")
        card.className = "review-card"
        let p = document.createElement("p")
        let h1 = document.createElement("h1")
        let image = document.createElement("img")
        h1.innerText = review.author
        p.innerText = review.comment
        image.src = review.image
        image.alt = "review"
        image.className = "review-image"
        
        card.appendChild(h1)
        card.appendChild(image)
        card.appendChild(p)
        let staricons = stars.querySelectorAll(".star")
        card.appendChild(loadStars(staricons, review.rating))
        carouselItem.appendChild(card)
        carousel.appendChild(carouselItem)


      }
    }

     function loadStars(staricons, rating) {
      
        rating = Number(rating)
         console.log(staricons)
      staricons.forEach((star, index) => {
        console.log(star)
        if (index < rating) {
      star.classList.add("filled")
       } else {
      star.classList.remove("filled")
    }
    })
    return stars
      }
        
       
        


      
      


    



  
   


  });