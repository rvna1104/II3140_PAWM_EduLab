// Toggle & Responsive Navigation
const navSlide = () => {
  const bar = document.querySelector(".bar");
  const navLists = document.querySelector("nav");

  if (bar) {
    bar.addEventListener("click", () => {
      navLists.classList.toggle("nav-active");
      bar.classList.toggle("toggle");
    });
  }
};

// Function to go back to previous page
function goBack() {
  window.history.back();
}

// Close button handler
const closeButtonHandler = () => {
  const closeBtn = document.getElementById('closeBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      location.href = '/';
    });
  }
};

// Function for handling form submission
const formHandler = () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const errorMessage = document.getElementById('error-message');
  
// Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message'); // Penanganan error message

      // Reset pesan error
      errorMessage.textContent = '';

      // Fetch untuk login
      fetch('/login-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then(res => res.json())
        .then(data => {
          // Cek apakah data mengandung pesan error
          if (data.success) {
            // Menyimpan token dan username di sessionStorage
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', data.username);
            alert('Login berhasil');
            location.href = '/main/frontpage.html';
          } else {
            errorMessage.textContent = data.message; // Menampilkan pesan error
          }
        })
        .catch(() => {
          errorMessage.textContent = 'Error during login';
        });
    });
  }


// Signup Form
  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const errorMessage = document.getElementById('error-message'); // Penanganan error message

      // Reset pesan error
      errorMessage.textContent = '';

      // Validasi password dan konfirmasi password
      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
      }

      // Fetch untuk signup
      fetch('/signup-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, confirmPassword })
      })
        .then(res => res.json())
        .then(data => {
          // Cek apakah data mengandung pesan error
          if (typeof data === 'string') {
            errorMessage.textContent = data; // Menampilkan pesan error dari server
          } else {
            if (!data.username) {
              alertBox(data);
            } else {
              sessionStorage.username = data.username;
              location.href = '/main/login.html';
            }
          }
        })
        .catch(() => {
          errorMessage.textContent = 'Error during signup';
        });
    });
  }
}

// window.onload = () => {
//   if(!sessionStorage.username) {
//     location.href = '/';
//   } else {
//     location.href = '/frontpage.html';
//   }
// }

// Validate Data Function
// const validateData = (data) => {
//   if (!data.username) {
//     alertBox(data);
//   } else {
//     sessionStorage.username = data.username;
//     window.location.href = '/main/frontpage.html';
//   }
// };

// Alert Box Function
const alertBox = (data) => {
  const alertContainer = document.querySelector('.alert-box');
  const alertMsg = document.querySelector('.alert');
  alertMsg.innerHTML = data;

  alertContainer.style.top = '5%';
  setTimeout(() => {
    alertContainer.style.top = null;
  }, 5000);
};

// Function to handle logout
const logoutHandler = () => {
  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear(); // Menghapus data sesi
      location.href = '/'; // Redirect ke halaman utama
    });
  }
};

// Initialize all event listeners
const init = () => {
  navSlide();
  closeButtonHandler();
  formHandler();
  logoutHandler();
};

// Check session storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  
  // Redirect jika user sudah login dan berada di halaman login/signup
  if (sessionStorage.getItem('token') && 
      (currentPath.includes('login.html') || currentPath.includes('signup.html'))) {
    location.href = '/main/frontpage.html';
  }

  init();
});
