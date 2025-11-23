// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

document.addEventListener("DOMContentLoaded", () => {



fetch("http://localhost:3000/cheeses")
  .then(res => res.json())
  .then(cheeses => {
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
        const container = document.querySelector(".products");
         container.appendChild(card);
    }

  });