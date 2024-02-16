const minusBtn = document.querySelector(".minus-quantity");
const plusBtn = document.querySelector(".plus-quantity");
const quantityInput = document.querySelector(".quantity-input");
let quantity = parseInt(quantityInput.textContent);
const priceInput = document.querySelector(".price-input");
const olderPriceInput = document.querySelector(".older-price");
const cartBtn = document.querySelector(".cart-btn");
const cartBag = document.querySelector(".cart-user svg");
const cartBox = document.querySelector(".cart-box");
const emptyCartMsg = document.querySelector(".empty-cart-msg");
const cartItem = document.querySelector(".cart-item");

minusBtn.addEventListener("click", updateQuantity);
plusBtn.addEventListener("click", updateQuantity);

function updateQuantity() {
  if (this === minusBtn && quantity > 1) {
    quantity--;
  } else if (this === plusBtn) {
    quantity++;
  }

  quantityInput.textContent = quantity;
  updatePrice();
}

function updatePrice() {
  let price = 125;
  let olderPrice = 250;
  const totalPrice = price * quantity;
  const totalOldPrice = olderPrice * quantity;
  priceInput.textContent = "$" + totalPrice.toFixed(2);
  olderPriceInput.textContent = "$" + totalOldPrice.toFixed(2);
}

const thumbnilImgSrc = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

const lightboxImg = document.querySelector(".lightbox-img");
const previousIcon = document.querySelector(".icon-previous");
const nextIcon = document.querySelector(".icon-next");

let currentIndex = 0;

// Set initial image
lightboxImg.src = thumbnilImgSrc[currentIndex];

// Function to handle changing image
function changeImage(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % thumbnilImgSrc.length;
  } else {
    currentIndex =
      (currentIndex - 1 + thumbnilImgSrc.length) % thumbnilImgSrc.length;
  }
  lightboxImg.src = thumbnilImgSrc[currentIndex];
}

// Event listeners for previous and next icons
previousIcon.addEventListener("click", () => {
  changeImage("previous");
});

nextIcon.addEventListener("click", () => {
  changeImage("next");
});

const thumbnilIMg = document.querySelectorAll(".product-thumbnil div");
const productImg = document.querySelector(".product-image");
const lightbox = document.querySelector(".lightbox");

let selectedVarient = null;

function handleThumbnilClick(i) {
  if (selectedVarient) {
    selectedVarient.style.border = "none";
    selectedVarient.children[0].style.opacity = "1";
  }
  selectedVarient = thumbnilIMg[i];
  thumbnilIMg[i].style.border = "2px solid var(--Orange)";
  thumbnilIMg[i].style.height = "80px";
  thumbnilIMg[i].style.borderRadius = "10px";
  thumbnilIMg[i].children[0].style.opacity = "0.2";

  productImg.src = thumbnilImgSrc[i];
}

productImg.addEventListener("click", function () {
  lightbox.classList.remove("hidden");
});

document.querySelector(".icon-close").addEventListener("click", function () {
  lightbox.classList.add("hidden");
});

window.addEventListener("load", function () {
  handleThumbnilClick(0);
});

for (let i = 0; i < thumbnilIMg.length; i++) {
  thumbnilIMg[i].addEventListener("click", function () {
    handleThumbnilClick(i);
  });
}

cartBtn.addEventListener("click", function () {
  cartBag.insertAdjacentHTML(
    "afterend",
    `<span class="quantity">${quantity}</span>`
  );
  document.querySelector(".cartbox-product-quantity").textContent =
    "* " + quantity;
  document.querySelector(".cartbox-product-totalprice").textContent =
    "$" + 125 * quantity;
  cartItem.classList.remove("hidden");
  emptyCartMsg.classList.add("hidden");
});

cartBag.addEventListener("click", function () {
  cartBox.classList.toggle("hidden");

  if (cartItem.classList.contains("hidden")) {
    emptyCartMsg.classList.remove("hidden");
  } else {
    emptyCartMsg.classList.add("hidden");
  }
});

const deletIcon = document
  .querySelector(".delete-icon")
  .addEventListener("click", function (e) {
    const itemList = e.target.closest(".cart-item");
    const quantityBag = document.querySelector(".quantity");
    itemList.classList.add("hidden");
    quantityBag.remove();
    emptyCartMsg.classList.remove("hidden");
  });
