const menu = [
  { id: 1, name: "Latte", zh: "拿铁", price: 4.50, icon: "☕", desc: "浓缩咖啡 + 绵密奶泡" },
  { id: 2, name: "Americano", zh: "美式咖啡", price: 3.50, icon: "🫘", desc: "醇厚浓缩 + 清爽热水" },
  { id: 3, name: "Cappuccino", zh: "卡布奇诺", price: 4.80, icon: "🥛", desc: "浓缩咖啡 + 丰厚奶泡" },
  { id: 4, name: "Mocha", zh: "摩卡", price: 5.20, icon: "🍫", desc: "咖啡 + 巧克力 + 牛奶" }
];

let cart = JSON.parse(localStorage.getItem("helloCoffeeCart") || "[]");
let orders = JSON.parse(localStorage.getItem("helloCoffeeOrders") || "[]");

const menuGrid = document.getElementById("menuGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const successModal = document.getElementById("successModal");
const orderNumber = document.getElementById("orderNumber");
const modalTotal = document.getElementById("modalTotal");

function money(value) {
  return `$${value.toFixed(2)}`;
}

function renderMenu() {
  menuGrid.innerHTML = menu.map(item => `
    <article class="menu-card">
      <div class="coffee-image">${item.icon}</div>
      <h3>${item.zh}</h3>
      <p>${item.desc}</p>
      <div class="price-row">
        <span class="price">${money(item.price)}</span>
        <button class="add-button" onclick="addToCart(${item.id})">＋ 加入</button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const item = menu.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: item.id, qty: 1 });
  }

  saveCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(x => x.id !== id);
  }

  saveCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function saveCart() {
  localStorage.setItem("helloCoffeeCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="orders-empty">
        购物车还是空的 ☕<br><br>
        去菜单选择一杯咖啡吧！
      </div>`;
  } else {
    cartItems.innerHTML = cart.map(cartItem => {
      const item = menu.find(x => x.id === cartItem.id);
      return `
        <div class="cart-item">
          <div class="cart-item-top">
            <span class="cart-item-name">${item.zh}</span>
            <span class="cart-item-price">${money(item.price * cartItem.qty)}</span>
          </div>
          <div class="qty-controls">
            <button onclick="changeQty(${item.id}, -1)">−</button>
            <span>${cartItem.qty}</span>
            <button onclick="changeQty(${item.id}, 1)">＋</button>
            <button class="remove-button" onclick="removeItem(${item.id})">删除</button>
          </div>
        </div>
      `;
    }).join("");
  }

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, cartItem) => {
    const item = menu.find(x => x.id === cartItem.id);
    return sum + item.price * cartItem.qty;
  }, 0);

  cartCount.textContent = count;
  cartTotal.textContent = money(total);
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

function checkout() {
  if (cart.length === 0) {
    alert("购物车是空的，请先选择咖啡。");
    return;
  }

  const total = cart.reduce((sum, cartItem) => {
    const item = menu.find(x => x.id === cartItem.id);
    return sum + item.price * cartItem.qty;
  }, 0);

  const nextNumber = orders.length
    ? Math.max(...orders.map(o => o.number)) + 1
    : 1001;

  const order = {
    number: nextNumber,
    time: new Date().toLocaleString("zh-CN"),
    items: cart.map(x => ({ ...x })),
    total
  };

  orders.unshift(order);
  localStorage.setItem("helloCoffeeOrders", JSON.stringify(orders));

  orderNumber.textContent = `#${nextNumber}`;
  modalTotal.textContent = money(total);

  cart = [];
  saveCart();
  closeCart();
  renderOrders();

  successModal.classList.remove("hidden");
}

function renderOrders() {
  const container = document.getElementById("orderHistory");

  if (orders.length === 0) {
    container.className = "orders-empty";
    container.textContent = "还没有订单。点一杯咖啡吧 ☕";
    return;
  }

  container.className = "";

  container.innerHTML = orders.slice(0, 5).map(order => {
    const names = order.items.map(cartItem => {
      const item = menu.find(x => x.id === cartItem.id);
      return `${item.zh} × ${cartItem.qty}`;
    }).join("，");

    return `
      <div class="order-card">
        <div>
          <small>${order.time}</small>
          <strong>订单 #${order.number}</strong>
          <div>${names}</div>
        </div>
        <strong>${money(order.total)}</strong>
      </div>
    `;
  }).join("");
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("overlay").addEventListener("click", closeCart);
document.getElementById("checkoutButton").addEventListener("click", checkout);

document.getElementById("continueButton").addEventListener("click", () => {
  successModal.classList.add("hidden");
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

renderMenu();
renderCart();
renderOrders();
