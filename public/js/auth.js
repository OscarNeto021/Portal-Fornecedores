const token = localStorage.getItem('token');
const cd_forn = localStorage.getItem('CD_FORN');
const userId2 = localStorage.getItem('userId');
console.log("Token recuperado do localStorage:", token);
console.log("cd_forn recuperado do localStorage:", cd_forn);
fetch(`/dashboard`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
