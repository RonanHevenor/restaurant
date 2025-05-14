let cart = [];
let tipPercent = 0;

function addToCart(button) {
  const itemDiv = button.closest('.menu-item');
  const name = itemDiv.dataset.name;
  const price = parseFloat(itemDiv.dataset.price);

  // Check if item already in cart
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}


function removeFromCart(index) {
  cart.splice(index, 1);
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
      <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartList.appendChild(li);
  });

  updateTotal();
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

  cart = [];
  tipPercent = 0;
  updateCart();
}
