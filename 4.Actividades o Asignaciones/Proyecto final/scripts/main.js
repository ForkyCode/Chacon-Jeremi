// main.js
import { fetchGames, addGame } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const games = await fetchGames();
    displayGames(games);
  } catch (error) {
    console.error('Failed to load games:', error);
  }
});

const addGameBtn = document.getElementById('addGameBtn');
const gameForm = document.getElementById('gameForm');
const formContainer = document.getElementById('formContainer');
const gameCards = document.getElementById('gameCards');
const closeFormBtn = document.getElementById('closeFormBtn');

// Mostrar el formulario asi agregas validacion
if (addGameBtn) {
  addGameBtn.addEventListener('click', () => {
    formContainer.classList.remove('hidden');
  });
}

// Ocultar el formulario al hacer clic en la X roja
if(closeFormBtn){ 
  closeFormBtn.addEventListener('click', () => {
    formContainer.classList.add('hidden');
  });
  
}

if (gameForm) {
  gameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const gameImage = document.getElementById('gameImage').files[0];
    const gameTitle = document.getElementById('gameTitle').value;
    const gamePrice = document.getElementById('gamePrice').value;
  
    const reader = new FileReader();
    reader.onload = async function(e) {
      const imageUrl = e.target.result;
      const imageName = gameImage.name; // Obtener el nombre original del archivo
  
      const gameData = {
        image: imageName, // Guardar el nombre de la imagen
        title: gameTitle,
        price: gamePrice
      };
  
      try {
        const newGame = await addGame(gameData);
        addGameCard(newGame);
        gameForm.reset();
        formContainer.classList.add('hidden');
      } catch (error) {
        console.error('Failed to add game:', error);
      }
    };
    reader.readAsDataURL(gameImage); // Leer el archivo de imagen como URL base64
  });
}


function displayGames(games) {
  games.forEach(game => {
    addGameCard(game);
  });
}

function addGameCard(game) {
  const gameCard = document.createElement('div');
  gameCard.classList.add('gameCard');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = async () => {
    try {
      // Lógica para eliminar el juego del servidor
      const response = await fetch(`http://localhost:3000/api/games/${game.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        gameCards.removeChild(gameCard); // Eliminar visualmente el juego
      } else {
        console.error('Failed to delete game:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };
  gameCard.appendChild(deleteBtn);

  const img = document.createElement('img');
  img.src = `images/${game.image}`; // Asignar la URL de la imagen desde el servidor
  gameCard.appendChild(img);

  const title = document.createElement('h3');
  title.textContent = game.title;
  gameCard.appendChild(title);

  const price = document.createElement('p');
  price.textContent = `$${game.price}`;
  gameCard.appendChild(price);

  gameCards.appendChild(gameCard);
}

// Exporta la función toggleMenu para que pueda ser utilizada en el HTML
export function toggleMenu() {
  const menuDropdown = document.getElementById("menuDropdown");
  if (menuDropdown.style.display === "block") {
    menuDropdown.style.display = "none";
  } else {
    menuDropdown.style.display = "block";
  }
}

// Función para cerrar sesión
export async function logout() {
  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
    });
    if (response.ok) {
      window.location.href = 'index.html';
    } else {
      console.error('Error al cerrar sesión');
    }
  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
}



