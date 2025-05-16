let cart = [];
let tipPercent = 0;

function addToCart(button) {
  const itemDiv = button.closest('.menu-item');
  const name = itemDiv.dataset.name;
  const price = parseFloat(itemDiv.dataset.price);

  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  // Cart Icon Update
  cartCount++;
  const countEl = document.getElementById("cart-count");
  const cartIcon = document.getElementById("cart-icon");

  countEl.textContent = cartCount;

  // Trigger bounce animation
  cartIcon.classList.remove("bounce");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("bounce");
  
  updateCart();
}


function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  // Recalculate cart count
  cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update cart count display
  const countEl = document.getElementById("cart-count");
  const cartIcon = document.getElementById("cart-icon");

  countEl.textContent = cartCount;

  // Trigger bounce animation
  cartIcon.classList.remove("bounce");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("bounce");
  
  updateCart();
}


function setTip(percent) {
  tipPercent = percent;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.quantity} × ${item.name} - $${(item.price * item.quantity).toFixed(2)}</span>
      <div class="cart-controls">
        <button onclick="changeQuantity('${item.name}', -1)">−</button>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
      </div>
    `;

    cartList.appendChild(li);
  });

  updateTotal();
}

function updateTotal() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const tip = subtotal * tipPercent;
  const total = subtotal + tax + tip;

  document.getElementById('tip').innerText = tip.toFixed(2);
  document.querySelectorAll('#total').forEach(el => {
    el.innerText = total.toFixed(2);
  });
}

function submitOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orderSummary = "Order submitted!\n\n";
  cart.forEach((item, i) => {
    orderSummary += `${i + 1}. ${item.quantity} × ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const tip = subtotal * tipPercent;
  const total = subtotal + tax + tip;

  orderSummary += `\nSubtotal: $${subtotal.toFixed(2)}`;
  orderSummary += `\nTax (7%): $${tax.toFixed(2)}`;
  orderSummary += `\nTip: $${tip.toFixed(2)}`;
  orderSummary += `\nTotal: $${total.toFixed(2)}`;

  
  alert(orderSummary);

  let pickUpInfo = "Pick up your order at Dandelion Cafe\n123 Green Street, Hometown, USA";
  
  const now = new Date();
  const future = new Date(now.getTime() + 25 * 60000); 
  const hours = future.getHours().toString().padStart(2, '0');
  const minutes = future.getMinutes().toString().padStart(2, '0');

  pickUpInfo += `\n\nEstimated Pickup Time: ${hours}:${minutes}`;
  
  alert(pickUpInfo);
  
  cart = [];
  tipPercent = 0;
  updateCart();
}



//Cart Icon Section//

let cartCount = 0;


function scrollToCart() {
  const cartSection = document.getElementById("cart");
  if (cartSection) {
    cartSection.scrollIntoView({ behavior: "smooth" });
  }
}
