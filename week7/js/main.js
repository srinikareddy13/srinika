// js/main.js
import { fetchBooks } from './books.js';
import { renderBooks, setupBookListListener, renderCart, setupCartListener } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const books = await fetchBooks();
    renderBooks(books);
    setupBookListListener(books);
    setupCartListener();
    renderCart();

    // Re-render cart whenever cart changes
    window.addEventListener('cartUpdated', () => {
      renderCart();
    });
  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML('afterbegin', `<p style="color:red">Failed to load app: ${err.message}</p>`);
  }
});