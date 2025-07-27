import { renderListWithTemplate } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

// 📦 Template for each cart item
function CardTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <label for="qty-${item.Id}">Qty:</label>
    <input type="number" class="cart-qty" id="qty-${item.Id}" data-id="${item.Id}" value="${item.quantity}" min="1">
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <p class="cart-card__subtotal">Subtotal: $${(item.quantity * item.FinalPrice).toFixed(2)}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.cartTotal = getLocalStorage("so-cart-total") || 0;
    this.element = document.querySelector(".product-list");
  }

  async init() {
    this.render();
    this.addQuantityListener();
  }

  render() {
    renderListWithTemplate(CardTemplate, this.element, this.cartItems, "afterBegin", true);
    document.querySelector(".cart-total").innerHTML = "Total: $" + this.cartTotal.toFixed(2);
  }

  addQuantityListener() {
    this.element.addEventListener("change", (e) => {
      if (e.target.classList.contains("cart-qty")) {
        const itemId = e.target.dataset.id;
        const newQty = parseInt(e.target.value);
        this.updateQuantity(itemId, newQty);
      }
    });
  }

  updateQuantity(itemId, newQty) {
    const item = this.cartItems.find(product => product.Id === itemId);
    if (item) {
      if (isNaN(newQty) || newQty < 1) {
        // ⛔ Reset invalid inputs
        document.querySelector(`#qty-${item.Id}`).value = item.quantity;
        return;
      }

      item.quantity = newQty;

      // 🔄 Recalculate total
      this.cartTotal = this.cartItems.reduce((sum, item) => {
        return sum + item.quantity * item.FinalPrice;
      }, 0);

      // 💾 Sync to localStorage
      localStorage.setItem("so-cart", JSON.stringify(this.cartItems));
      localStorage.setItem("so-cart-total", this.cartTotal);

      this.render(); // Refresh UI
    }
  }
}