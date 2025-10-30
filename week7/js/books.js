// js/books.js
export async function fetchBooks() {
  const res = await fetch('./books.json');
  if (!res.ok) throw new Error('Failed to load books.json');
  return await res.json();
}