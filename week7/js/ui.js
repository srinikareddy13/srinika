// js/ui.js
import { addToCart, removeFromCart, getCart, calculateTotal, clearCart } from './cart.js';

/** Simple HTML-escape to avoid XSS when inserting dynamic text */
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Renders the grid/list of books */
export function renderBooks(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book, idx) => {
    const li = document.createElement('li');
    li.className = 'book-card';

    const inStock = String(book.availability).toLowerCase() === 'in stock';
    li.innerHTML = `
      <strong>${escapeHtml(book.title)}</strong>
      <div>by ${escapeHtml(book.author)}</div>
      <div>Price: $${Number(book.price).toFixed(2)}</div>
      <em>${escapeHtml(book.availability)}</em>
      <button ${inStock ? '' : 'disabled'} data-index="${idx}">
        ${inStock ? 'Add to Cart' : 'Out of stock'}
      </button>
    `;
    bookList.appendChild(li);
  });
}

/** Render the cart contents and total */
export function renderCart() {
  const cartList = document.getElementById('cart-list');
  const totalPrice = document.getElementById('total-price');
  const cart = getCart();

  cartList.innerHTML = '';
  cart.forEach((book, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${escapeHtml(book.title)} - $${Number(book.price).toFixed(2)}</span>
      <button data-index="${idx}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  totalPrice.textContent = `Total: $${calculateTotal().toFixed(2)}`;
}

/** Attach a single click listener to the books container (delegation).
 *  Call this once after initial renderBooks(books).
 */
export function setupBookListListener(books) {
  const bookList = document.getElementById('book-list');
  bookList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    if (Number.isInteger(idx) && books[idx]) {
      // Add to cart (book object from fetched books)
      addToCart(books[idx]);
    }
  });
}

/** Attach a single click listener to the cart container for "Remove" buttons */
export function setupCartListener() {
  const cartList = document.getElementById('cart-list');
  cartList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    if (Number.isInteger(idx)) {
      removeFromCart(idx);
    }
  });

  // checkout button (mock)
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    // Very simple mock checkout: show summary then clear cart
    const cart = getCart();
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    const summary = cart.map((b) => `${b.title} — $${Number(b.price).toFixed(2)}`).join('\n');
    const total = calculateTotal().toFixed(2);
    if (confirm(`Proceed to mock checkout?\n\nItems:\n${summary}\n\nTotal: $${total}`)) {
      clearCart();
      alert('Mock checkout complete. Thank you!');
    }
  });
}