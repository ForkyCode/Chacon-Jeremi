export async function addGame(gameImage, gameTitle, gamePrice) {
  const reader = new FileReader();
  reader.onload = async function (e) {
    const imageData = e.target.result;
    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          title: gameTitle,
          price: gamePrice,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to add game:', error);
      throw error;
    }
  };
  reader.readAsDataURL(gameImage);
}


