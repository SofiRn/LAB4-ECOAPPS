async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const user = { username, password };

  try {
      const response = await fetch('http://localhost:5050/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      });

      const messageDiv = document.getElementById('message');
      if (response.ok) {
          const data = await response.json();
          messageDiv.textContent = 'Login successful!';
          localStorage.setItem('username', data.username); // Store username for future use
          setTimeout(() => (window.location.href = '../Home/home.html'), 1000);

      } else {
          const data = await response.json();
          messageDiv.textContent = data.message;
      }
  } catch (error) {
      console.error(error);
  }
}

