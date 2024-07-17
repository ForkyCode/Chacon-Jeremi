import { toggleMenu, logout } from '../scripts/main.js';
import { fetchGames } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const games = await fetchGames();
    displayGames(games);
  } catch (error) {
    console.error('Failed to load games:', error);
  }

  // Display the username
  const username = sessionStorage.getItem('username');
  if (username) {
    document.getElementById('userName').textContent = username;
  }
});

const gameCards = document.getElementById('gameCards');
const cartContainer = document.getElementById('cartContainer');
const cartList = document.createElement('ul');
cartContainer.appendChild(cartList);
const totalPriceEl = document.createElement('p');
totalPriceEl.id = 'totalPrice';
cartContainer.appendChild(totalPriceEl);
let total = 0;

// Crear el botón de compra
const buyButton = document.createElement('button');
buyButton.textContent = 'Comprar';
buyButton.id = 'buyButton';
buyButton.classList.add('buy-button');
buyButton.addEventListener('click', () => alert('Comprar'));
cartContainer.appendChild(buyButton);

// Mostrar el carrito de compras
export function toggleCart() {
  cartContainer.classList.toggle('hidden');
}

function displayGames(games) {
  // Limpia el contenedor de tarjetas antes de añadir nuevas tarjetas
  gameCards.innerHTML = '';
  games.forEach(game => {
    addGameCard(game);
  });
}

function addGameCard(game) {
  const gameCard = document.createElement('div');
  gameCard.classList.add('gameCard');

  const img = document.createElement('img');
  img.src = `images/${game.image}`;
  img.classList.add('game-img'); // Añadir clase para estilo específico de la imagen del juego
  gameCard.appendChild(img);

  const title = document.createElement('h3');
  title.textContent = game.title;
  gameCard.appendChild(title);

  const price = document.createElement('p');
  price.textContent = `$${game.price}`;
  gameCard.appendChild(price);

  const cartIcon = document.createElement('img');
  cartIcon.src = 'images/carrito2.png';
  cartIcon.classList.add('cart-icon');
  cartIcon.addEventListener('click', () => addToCart(game));
  gameCard.appendChild(cartIcon);

  gameCards.appendChild(gameCard);
}

function addToCart(game) {
  const cartItem = document.createElement('li');
  cartItem.classList.add('cart-item');

  const img = document.createElement('img');
  img.src = `images/${game.image}`;
  img.classList.add('cart-item-img');
  cartItem.appendChild(img);

  const title = document.createElement('span');
  title.textContent = game.title;
  cartItem.appendChild(title);

  const price = document.createElement('span');
  price.textContent = `$${game.price}`;
  cartItem.appendChild(price);

  cartList.appendChild(cartItem);

  total += game.price;
  updateTotalPrice();
}

function updateTotalPrice() {
  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

// Asignar la función toggleMenu al evento onclick del menú
document.getElementById('menu').addEventListener('click', toggleMenu);

// Asignar la función toggleCart al evento onclick del carrito
document.getElementById('carrito').addEventListener('click', toggleCart);

// Asignar la función logout al evento onclick del enlace de cerrar sesión
document.getElementById('logoutLink').addEventListener('click', logout);
