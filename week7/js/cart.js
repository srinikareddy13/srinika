// js/cart.js
// Manages cart data + persistence + emits 'cartUpdated' on changes
const STORAGE_KEY = 'bookstore_cart';
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/** persist cart to localStorage */
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/** notify UI and other listeners */
function emitUpdate() {
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

export function addToCart(book) {
  // push a shallow copy to avoid accidental external mutation
  cart.push({ ...book });
  saveCart();
  emitUpdate();
}

export function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart();
    emitUpdate();
  }
}

export function getCart() {
  // return a shallow copy so callers can't mutate internal array
  return cart.slice();
}

export function calculateTotal() {
  return cart.reduce((sum, book) => sum + Number(book.price || 0), 0);
}

export function clearCart() {
  cart.length = 0;
  saveCart();
  emitUpdate();
}