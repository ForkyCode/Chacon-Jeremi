// utils.js
export async function fetchGames() {
  try {
    const response = await fetch('http://localhost:3000/api/games');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const games = await response.json();
    return games;
  } catch (error) {
    console.error('Failed to fetch games:', error);
    throw error;
  }
}

export async function addGame(gameData) {
  try {
    const response = await fetch('http://localhost:3000/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const game = await response.json();
    return game;
  } catch (error) {
    console.error('Failed to add game:', error);
    throw error;
  }
}