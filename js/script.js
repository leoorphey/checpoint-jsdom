document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les produits
  const cards = document.querySelectorAll(".card");

  function updateTotal() {
    let total = 0;
    cards.forEach((card) => {
      const quantity = parseInt(card.querySelector(".quantity").textContent);
      const priceText = card.querySelector(".unit-price").textContent;
      const unitPrice = parseFloat(priceText.replace("$", ""));
      if (!card.classList.contains("removed")) {
        total += quantity * unitPrice;
      }
    });
    document.querySelector(".total").textContent = `${total} $`;
  }

  cards.forEach((card) => {
    const plusBtn = card.querySelector(".fa-plus-circle");
    const minusBtn = card.querySelector(".fa-minus-circle");
    const trashBtn = card.querySelector(".fa-trash-alt");
    const heartBtn = card.querySelector(".fa-heart");
    const quantityEl = card.querySelector(".quantity");

    // Incrémentation
    plusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityEl.textContent);
      quantity++;
      quantityEl.textContent = quantity;
      updateTotal();
    });

    // Décrémentation
    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(quantityEl.textContent);
      if (quantity > 0) {
        quantity--;
        quantityEl.textContent = quantity;
        updateTotal();
      }
    });

    // Suppression
    trashBtn.addEventListener("click", () => {
      card.classList.add("removed"); // Ajoute une classe pour ne plus compter dans le total
      card.parentElement.remove();   // Supprime visuellement le produit
      updateTotal();
    });

    // Aimer (toggle cœur rouge)
    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("liked");
      heartBtn.style.color = heartBtn.classList.contains("liked") ? "red" : "black";
    });
  });

  // Initialiser le prix total
  updateTotal();
});
