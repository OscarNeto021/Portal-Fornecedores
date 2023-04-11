const form = document.querySelector('form');
const messageDiv = document.querySelector('#message');

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

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
      localStorage.setItem('CD_FORN', data.cd_forn);
      console.log('Token stored:', data.token);
      console.log('User ID stored:', data.userId);
      console.log('cd_forn stored:', data.cd_forn);
      setTimeout(() => {
        window.location.href = "/dashboard"; // usar data.userId em vez de userId
      }, 5000);
    } else {
      const data = await response.json();
      messageDiv.textContent = data.msg;
    }
  } catch (error) {
    console.error(error);
  }
});
