document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const name = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, password })
      });
  
      const result = await response.json();
      alert(result.message);
  
      if (response.ok) {
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering user');
    }
  });
  