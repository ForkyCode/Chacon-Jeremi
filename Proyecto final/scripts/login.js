document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok) {
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
          usernameElement.textContent = result.username || 'Nombre de usuario no disponible';
        } else {
          console.error('Elemento con ID "username" no encontrado en el DOM.');
        }

       
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        } else {
          console.error('URL de redirección no especificada en la respuesta del servidor.');
        }
      } else {
        alert(result.message || 'Error desconocido al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  });
});
