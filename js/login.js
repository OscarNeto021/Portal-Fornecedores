const form = document.querySelector('form');
const messageDiv = document.querySelector('#message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = form.elements.email.value;
  const password = form.elements.password.value;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      messageDiv.textContent = 'Login realizado com sucesso.';
    } else {
      const data = await response.json();
      messageDiv.textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
  }
});
