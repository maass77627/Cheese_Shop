
const apiKey = "49dddcc0dc104b41af87dbe0cd34cca7"

cartItems = []
 
// const container = document.querySelector(".products");

 document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
   const container = document.querySelector(".products");
    const aboutModal = new bootstrap.Modal(document.getElementById("owner-modal"))
    const wineModal = new bootstrap.Modal(document.getElementById("staticBackdrop"))
 

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
  
  

  let aboutSelect = document.getElementById("shopfour")
  aboutSelect.addEventListener("change", (e) => { 
    console.log("changed about")
    loadAboutModal(e)
  })

  let reviewSelect = document.getElementById("shoptwo")
  reviewSelect.addEventListener("change", (e) => {
    console.log(e.target.value)
    console.log("changed")
    fetchReviewData(e)
   })

  let locationSelect = document.getElementById("shopthree")
  locationSelect.addEventListener("change", (e) => {
    console.log(e.target)
    console.log("changed")
    loadLocationSelect(e)

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
     console.log(cartItems)
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

     let reviewButton =  document.createElement("i")
      reviewButton.className="fa-solid fa-pen-to-square review-button"
     reviewButton.addEventListener("click", () => writeReview())

        let button = document.createElement("button")
        button.className = "product-btn"
        button.innerText = "Add to Cart"
        button.addEventListener('click', () => {
          console.log("clicked cart")
          addToCart(product, cartItems)})
          card.appendChild(reviewButton)
        card.appendChild(winebtn)
        card.appendChild(button)
        container.appendChild(card);

       }

  
    
    function addToCart(product) {
      let offCanvas = document.getElementById("body")
      console.log(cartItems)
     let item = cartItems.find(item => item.id === product.id)
      if (item) {
        item.quantity += 1 
      } else {
      product = {...product, quantity: 1}
      cartItems.push(product)
      let cartCard = document.createElement("div")
      cartCard.className = "cart-card"
      cartCard.innerHTML = `
     <h3 class="cart-name">${product.name}</h3>
     <p class="cart-price">$${product.price}</p>
      `;

       let image = document.createElement("img")
       image.src= product.image
       image.alt="pic"
       image.className = "cart-img"
        let imgwrap = document.createElement("div")
        imgwrap.className = "cart-imgwrap"
    
        let wrapper = document.createElement("div")
        wrapper.className = "cart-wrap"
        let minus = document.createElement("button")
        minus.addEventListener("click", (e) => { 
          input.value > 0 ? input.value = Number(input.value) - 1 : input.value
          console.log(cartItems)
           incrementDecrementQuantity(e, product, cartItems)
        })
    
        minus.innerHTML = "-"
        minus.className = "minus"
        let input = document.createElement("input")
        input.id = "input"
        input.value = 1
        input.type = "text"
        let plus = document.createElement("button")
        plus.className = "plus"
        plus.innerHTML = "+"
        plus.addEventListener("click", (e) => {
          input.value = Number(input.value) + 1;
          incrementDecrementQuantity(e, product, cartItems)
        })
        
        let trash = document.createElement("i")
        trash.className=("fa-regular fa-trash-can cart-trash")
        trash.addEventListener('click', (e) => deleteCartItem(e, product))
        
        wrapper.appendChild(plus)
        wrapper.appendChild(input)
        wrapper.appendChild(minus)
        wrapper.appendChild(trash)
        imgwrap.appendChild(image)
       
        offCanvas.appendChild(cartCard)
        cartCard.appendChild(imgwrap)
        cartCard.appendChild(wrapper)
        document.getElementById("count").textContent = getCartTotal(cartItems);
      }

    }

    

    
   function incrementDecrementQuantity(e, product) {
    if (e.target.innerText == "+") {
    let newCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          let newquantity = item.quantity + 1
            item = {...item, quantity: newquantity}
           return item
        } else {
          return item
        }
      })
      
      cartItems = newCartItems
      updateCartTotal(newCartItems)

    } else {
       let newerCartItems = cartItems.map((item) => {
        if (item.id === product.id && item.quantity > 0) {
          let newquantity = item.quantity - 1
            item = {...item, quantity: newquantity}
           return item
        } else {
          return item
        }
      })
      
       cartItems = newerCartItems
      updateCartTotal(newerCartItems)
      }
    }

   function updateCartTotal(cartItems) {
      const total = getCartTotal(cartItems)
      document.getElementById("count").textContent = ` Cart Total : ${total.toFixed(2)}`

    }
    
  
    function deleteCartItem(e, product) {
       e.target.parentNode.parentNode.remove()
       cartItems = cartItems.filter((item) => item.id !== product.id)
       updateCartTotal(cartItems)
     
    }

   function getCartTotal(cartItems) {
      let totals = cartItems.map((item) => {
        let quantity = item.quantity
        let itemTotal = item.price * quantity
        return itemTotal
      })
      let cartTotal = totals.reduce((acc, total) => acc + total, 0)
      console.log(cartTotal)
      return cartTotal
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
       console.log(e.target.value)
      //  let aboutModal = document.getElementById("owner-modal")
      //  let aboutDialog = document.getElementById("modal-dialog")
      //  let aboutContent = document.getElementById("modal-content")
      //  let modalTitle = document.createElement("h5")
      //  modalTitle.className="modal-title"
      //  let modalText = document.createElement("p")
      //  modalText.id="about-owner"
      //  let modalImage = document.createElement("img")
      //  modalImage.id="modal-image"
      //  modalImage.src="public/people.jpg"
      //  modalImage.alt = "owner"

      //  if (e.target.value === "Owners") {
      //   modalTitle.innerText = "About the Owner"
      //   modalText.innerText = `The owners are a group of many multi-talented friends.
      //   They all joined together wanting to create a spot in their 
      //   neighborhood where people could come together and build community.
      //   They thought a charcuterie shop would be a great place for people
      //   to enjoy eachothers company as well as the many delicious treats available.
      //   In the group are farmers, gardeners, chefs etc and they love to use fresh 
      //   self-grown ingredients in their products.`

      //  } else if (e.target.value === "Contact") {
      //   modalTitle.innerText = "Contact Us"
      //   modalText.innerText = `Phone: 1-555-467-3288
      //   email: "thepairinghouse@gmail.com"
      //   `

      //  } else {
      //   aboutModal.classList.add("hidden")

      //  }

      //  aboutContent.appendChild(modalTitle)
      //  aboutContent.appendChild(modalText)
      //  aboutContent.appendChild(modalImage)
      
        
         aboutModal.show()
     }



   function createWineModal(pairing) {
      let header = document.getElementById("wine-title")
      let p = document.getElementById("wine-text")
      let span = document.getElementById("wine-span")
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
       carousel.innerHTML = ""
     for (let i = 0; i < reviews.length; i++) {
      let review = reviews[i]

      let carouselItem = document.createElement("div")
    carouselItem.className = "carousel-item"

    if (i === 0) {
      carouselItem.classList.add("active")
    }

    carouselItem.id = `slide-${i}`

    let card = document.createElement("div")
    card.className = "review-card"

    let h1 = document.createElement("h1")
    let p = document.createElement("p")
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
          staricons.forEach((star, index) => {
            if (index < rating) {
          star.classList.add("filled")
            } else {
      star.classList.remove("filled")
    }
    })
    return stars
      }
        


      function loadLocationSelect(e) {
          fetch("http://localhost:3000/locations")
         .then((response) => response.json())
         .then((json)=> {
          let locations = json
          createLocationAccordion(e, locations)
         })
      }

      function createLocationAccordion(e, locations) {
        console.log(e.target.value)
        console.log(locations)

      
         let accordion = document.getElementById("myFirstAccordion")
            accordion.innerHTML = ""
         for (let i=0; i < locations.length; i++) {
          let location = locations[i]

           let accordionItem = document.createElement("div")
               accordionItem.className = "accordion-item"

          let accordionHeader = document.createElement("h2")
              accordionHeader.className="accordion-header"
              accordionHeader.id=`heading-${i}`

          let accordionButton = document.createElement("button")
          accordionButton.className = "accordion-button collapsed"
          
          accordionButton.setAttribute("type", "button")
          accordionButton.setAttribute("data-bs-toggle", "collapse")
          accordionButton.setAttribute("data-bs-target", `#collapse-${i}`)
          accordionButton.setAttribute("aria-expanded", "false")
          accordionButton.setAttribute("aria-controls", `collapse-${i}`)
          
          accordionButton.innerText=`${location.city}, ${location.state} `


          let accordionCollapse = document.createElement("div")
          accordionCollapse.id=`collapse-${i}`
          accordionCollapse.className="accordion-collapse collapse"
          if (e.target.value === "Austin" && i === 0) {
            accordionCollapse.classList.add("show")
          } else if (e.target.value === "Georgetown" && i === 1) {
            accordionCollapse.classList.add("show")

          }
          accordionCollapse.setAttribute("aria-labelledby", `heading-${i}`)
          

          let accordionBody = document.createElement("div")
          accordionBody.className="accordion-body"

          let accordionText = document.createElement("p")
          accordionText.className = "accordion-text"
          accordionText.innerText = location.address

          let accordionTextTwo = document.createElement("p")
          accordionTextTwo.className = "accordion-text"
          accordionTextTwo.innerText = location.hours

          let accordionTextThree = document.createElement("p")
          accordionTextThree.className = "accordion-text"
          accordionTextThree.innerText = location.phone

          let accordionTextFour = document.createElement("p")
          accordionTextFour.className = "accordion-text"
          accordionTextFour.innerText = location.description


          
          accordionHeader.appendChild(accordionButton)
          accordionItem.appendChild(accordionHeader)
          accordionBody.appendChild(accordionText)
          accordionBody.appendChild(accordionTextTwo)
          accordionBody.appendChild(accordionTextThree)
          accordionBody.appendChild(accordionTextFour)
          accordionCollapse.appendChild(accordionBody)
          accordionItem.appendChild(accordionCollapse)


          accordion.appendChild(accordionItem)

         }

       if (accordion.classList.contains("hidden")) {
            accordion.classList.remove("hidden")
        } else {
            accordion.classList.add("hidden")
        }

      }
       
        
function writeReview() {
  let form = document.getElementById("review-form")
  console.log(form)
  let stars = document.getElementsByClassName("click-stars")
  console.log(stars)

}

      
      


    



  
   


  });