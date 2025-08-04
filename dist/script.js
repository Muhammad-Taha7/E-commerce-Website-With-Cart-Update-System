 const leftMenu = document.getElementById("leftMenu");
    const rightCart = document.getElementById("rightCart");

    document.getElementById("hamburgerBtn").addEventListener("click", () => {
      leftMenu.style.left = "0";
    });

    document.getElementById("cartBtn").addEventListener("click", () => {
      rightCart.style.right = "0";
    });

    function toggleLeftMenu() {
      leftMenu.style.left = "-100%";
    }

    function toggleRightCart() {
      rightCart.style.right = "-100%";
    }
const cart = [];
const cartCounter = document.querySelector("#cartBtn span");
const cartContainer = document.querySelector("#rightCart");
const cartContent = cartContainer.querySelector("div.text-center");
const cartBtn = document.getElementById("cartBtn");
const toastDuration = 2000;

cartBtn.addEventListener("click", () => toggleRightCart());

function toggleRightCart() {
  const rightCart = document.getElementById("rightCart");
  rightCart.style.right = rightCart.style.right === "0%" ? "-100%" : "0%";
}

function showToast(productName) {
  const toast = document.createElement("div");
 toast.textContent = `✅ Thanks! Product has been added to your cart.`;
  toast.className = "fixed top-5 right-5 bg-yellow-300 text-black px-4 py-2 rounded shadow-lg z-50";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), toastDuration);
}

document.querySelectorAll(".card1").forEach(card => {
  const btn = card.querySelector("button");
  btn.addEventListener("click", () => {
    const productName = card.querySelector(".description p").textContent.trim();
    const priceText = card.querySelector(".price span.text-yellow-300").textContent.trim();
    const price = parseInt(priceText.replace("R.S", "").trim());
    const imageSrc = card.querySelector("img").src;

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name: productName, price, quantity: 1, image: imageSrc });
    }

    updateCartUI();
    showToast(productName);
  });
});

function updateCartUI() {
  cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    cartContent.innerHTML = `<div class="text-center text-gray-300">Your cart is currently empty.</div>`;
    return;
  }

  const itemsHTML = cart.map((item, index) => {
    const subTotal = item.price * item.quantity;
    const tax = Math.round(subTotal * 0.1);
    const total = subTotal + tax;
    return `
      <div class="mb-4 flex gap-4 items-center border-b pb-3">
        <img src="${item.image}" class="w-16 h-16 object-contain border rounded" />
        <div class="flex-1">
          <h3 class="text-sm font-semibold">${item.name}</h3>
          <p class="text-xs">Price: ${item.price} R.S</p>
          <p class="text-xs">Quantity: ${item.quantity}</p>
          <p class="text-xs">Subtotal (10% tax): ${total} R.S</p>
          <button onclick="removeItem(${index})" class="mt-1 text-xs bg-red-600 text-white px-2 py-1 rounded">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity * 1.1, 0);

  cartContent.innerHTML = `
    <div class="text-left h-[70vh] overflow-y-auto pr-2">${itemsHTML}</div>
    <div class="mt-4 border-t pt-2 text-lg font-bold text-right">
      Total: ${Math.round(grandTotal)} R.S
    </div>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}
