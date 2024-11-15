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

// Function to check quiz status
// const checkQuizStatus = (quizId, username) => {
//     const questionNumber = window.location.pathname.split('/').pop().replace('.html', '');
//     const quizId = 1; // Asumsi ID kuis
//     const username = sessionStorage.getItem('username');
//     const totalQuestions = 3;
    
//     if (data.isCompleted) {
//         // Jika kuis sudah dikerjakan, tampilkan alert
//         alert(data.message || "Kuis sudah dikerjakan");
//     } 

//     fetch(`/check-quiz-status?quizId=${quizId}&username=${username}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.isCompleted) {
//           // Jika kuis sudah dikerjakan, tampilkan alert
//           alert(data.message || "Kuis sudah dikerjakan");
//         } else {
//           // Jika kuis belum dikerjakan, lanjutkan ke halaman kuis
//           location.href = 'main/practice1.html';
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         alert('Terjadi kesalahan saat memeriksa status kuis. Coba lagi.');
//       });
// };
  
// // Panggil fungsi ini sebelum kuis dimulai
// checkQuizStatus(quizId, username);  // Gantilah quizId dan username sesuai dengan yang digunakan di aplikasi Anda

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

// Function to check quiz status before accessing practice page
// const checkQuizStatus = (quizId, username) => {
//     // Memanggil API untuk memeriksa status kuis
//     return fetch(`/check-quiz-status?quizId=${quizId}&username=${username}`)
//         .then(response => response.json())
//         .then(data => {
//             return data.isCompleted; // Mengembalikan status isCompleted
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Terjadi kesalahan saat memeriksa status kuis. Coba lagi.');
//             return true; // Menganggap kuis sudah dikerjakan jika ada error
//         });
// };

// // Event Listener untuk link menuju practice1.html
// document.getElementById('week1').addEventListener('click', async (event) => {
//     const quizId = 1; // Asumsi ID kuis untuk Week 1
//     const username = sessionStorage.getItem('username');

//     if (!username) {
//         alert('Silakan login terlebih dahulu.');
//         event.preventDefault(); // Mencegah redirect
//         window.location.href = '/login.html'; // Redirect ke login
//         return;
//     }

//     const isCompleted = await checkQuizStatus(quizId, username);

//     if (isCompleted) {
//         alert("Kuis sudah dikerjakan. Anda tidak dapat mengakses kuis ini lagi.");
//         event.preventDefault(); // Mencegah akses ke halaman practice1.html
//     }
// });

const init = () => {
    navSlide();
    // closeButtonHandler();
    // formHandler();
    logoutHandler();
  };