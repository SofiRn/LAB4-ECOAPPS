async function register() {
  const username = document.getElementById('username').value.trim();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();

  const user = { username, name, password };

  try {
      const response = await fetch('http://localhost:5050/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      });

      const messageDiv = document.getElementById('message');
      if (response.ok) {
          messageDiv.textContent = 'Registration successful!';
          setTimeout(() => (window.location.href = '../Login/login.html'), 1000);

      } else {
          const data = await response.json();
          messageDiv.textContent = data.message;
      }
  } catch (error) {
      console.error(error);
  }
}

