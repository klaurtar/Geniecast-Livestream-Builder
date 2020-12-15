// Put this in script tags https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js
const PAGE_URL = 'http://localhost:8080';
console.log(PAGE_URL + '/api/v1/users/login');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: PAGE_URL + '/videos/admin/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('logged in successfully');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 1500);
    }

    console.log(res);
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();

  const $email = document.getElementById('email').value;
  const $password = document.getElementById('password').value;

  login($email, $password);
});
