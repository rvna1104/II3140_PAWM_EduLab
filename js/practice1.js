// const options = document.querySelectorAll('input[name="quiz"]');
// const correctAnswer = document.querySelector('.correct-answer');
// const wrongAnswer = document.querySelector('.wrong-answer');
// const nextBtn = document.querySelector('.next-btn');

// options.forEach(option => {
//   option.addEventListener('change', () => {
//     options.forEach(opt => opt.disabled = true);
//     if (option.value === '1') {
//         correctAnswer.style.display = 'block';
//         nextBtn.style.display = 'inline-block';
//     }
//     if (option.value === '0') {
//         wrongAnswer.style.display = 'block';
//         nextBtn.style.display = 'inline-block';
//     }
//   });
// });

// // Quiz Progress
// const username = sessionStorage.getItem('username');

// // Memeriksa status kuis sebelum membuka halaman kuis
// const checkQuizStatus = (quizId, elementId) => {
//   fetch(`/check-quiz-status?username=${username}&quizId=${quizId}`)
//     .then(res => res.json())
//     .then(data => {
//       const element = document.getElementById(elementId);
//       if (data.isCompleted) {
//         element.href = `/results.html?quizId=${quizId}`;
//         element.querySelector('p2').innerText += " (Selesai)";
//       } else {
//         element.href = `/main/practice${quizId}.html`;
//       }
//     });
// };

// const getQuizProgress = () => {
//   // Mengambil token dari sessionStorage
//   const token = sessionStorage.getItem('token');

//   // Fetch untuk mendapatkan progress kuis
//   fetch('/get-quiz-progress', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': token // Mengirim token untuk verifikasi
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => console.error('Error fetching quiz progress:', error));
// };

// checkQuizStatus(1, 'week1');
// checkQuizStatus(2, 'week2');
// checkQuizStatus(3, 'week3');
// checkQuizStatus(4, 'week4');
// checkQuizStatus(5, 'week5');

// const saveQuizProgress = (username, quizId, questionNumber, answer, totalQuestions) => {
//   fetch('/save-quiz-progress', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username,
//       quizId,
//       questionNumber,
//       answer,
//       totalQuestions
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       console.log('Progress berhasil disimpan');
//       if (data.isCompleted) {
//         alert('Kuis telah selesai! Anda akan diarahkan ke halaman utama.');
//         window.location.href = '/main/practice.html';
//       }
//     } else {
//       alert(data.message);
//     }
//   })
//   .catch(() => alert('Error saat menyimpan progress'));
// };

// Mengambil elemen DOM
// const username = sessionStorage.getItem('username');
// const quizFileName = window.location.pathname.split('/').pop(); // Misal: 'practice1.html'
// const questionNumber = 3; // Ganti sesuai dengan nomor soal yang sedang dikerjakan
// const options = document.querySelectorAll('input[name="quiz"]');
// const correctAnswer = document.querySelector('.correct-answer');
// const wrongAnswer = document.querySelector('.wrong-answer');
// const nextBtn = document.querySelector('.next-btn');

// // Event listener untuk setiap opsi jawaban
// options.forEach(option => {
//   option.addEventListener('change', () => {
//     options.forEach(opt => opt.disabled = true);
//     saveQuizProgress(username, quizFileName, questionNumber, totalQuestions);

//     if (option.value === '1') {
//       correctAnswer.style.display = 'block';
//     } else {
//       wrongAnswer.style.display = 'block';
//     }

//     nextBtn.style.display = 'inline-block';
//   });
// });

// const answeredQuestions = JSON.parse(localStorage.getItem(`${username}-quiz-${quizId}`)) || [];

// if (answeredQuestions.includes(questionNumber)) {
//   alert('Anda sudah menjawab pertanyaan ini. Jawaban tidak dapat diubah.');
//   options.forEach(opt => opt.disabled = true);
// } else {
//   options.forEach(option => {
//     option.addEventListener('change', () => {
//       options.forEach(opt => opt.disabled = true);
//       saveQuizProgress(username, quizId, questionNumber, option.value, totalQuestions);

//       // Simpan questionNumber ke dalam localStorage
//       answeredQuestions.push(questionNumber);
//       localStorage.setItem(`${username}-quiz-${quizId}`, JSON.stringify(answeredQuestions));

//       if (option.value === '1') {
//         correctAnswer.style.display = 'block';
//       } else {
//         wrongAnswer.style.display = 'block';
//       }

//       nextBtn.style.display = 'inline-block';
//     });
//   });
// }

// // Fungsi untuk menyimpan progress kuis
// const saveQuizProgress = (username, quizFileName, questionNumber, answer) => {
//   fetch('/save-quiz-progress', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username,
//       quizFileName,
//       questionNumber,
//       answer
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       console.log('Progress berhasil disimpan');
//       if (data.isCompleted) {
//         alert('Kuis telah selesai!');
//       }
//     } else {
//       alert(data.message);
//     }
//   })
//   .catch(() => alert('Error saat menyimpan progress'));
// };

// // Fungsi untuk mengambil progress kuis
// const loadQuizProgress = () => {
//   fetch(`/get-quiz-progress?username=${username}&quizFileName=${quizFileName}&questionNumber=${questionNumber}`)
//     .then(res => res.json())
//     .then(data => {
//       if (data.answer !== null) {
//         // Tampilkan jawaban yang sudah dipilih sebelumnya
//         options.forEach(option => {
//           if (option.value === data.answer) {
//             option.checked = true;
//           }
//           option.disabled = true; // Kunci opsi jika sudah dijawab
//         });

//         // Tampilkan feedback
//         if (data.answer === '1') {
//           correctAnswer.style.display = 'block';
//         } else {
//           wrongAnswer.style.display = 'block';
//         }
//       }
//     })
//     .catch(() => console.error('Gagal memuat progress'));
// };

// // Event listener untuk setiap opsi jawaban
// options.forEach(option => {
//   option.addEventListener('change', () => {
//     const selectedAnswer = option.value;
//     saveQuizProgress(username, quizFileName, questionNumber, selectedAnswer);

//     // Tampilkan feedback
//     if (selectedAnswer === '1') {
//       correctAnswer.style.display = 'block';
//     } else {
//       wrongAnswer.style.display = 'block';
//     }

//     // Disable semua opsi setelah memilih jawaban
//     options.forEach(opt => opt.disabled = true);
//   });
// });

// // Penanganan tombol Next Question
// nextBtn.addEventListener('click', () => {
//   const nextQuestionNumber = questionNumber + 1;

//   // Jika ada soal berikutnya, arahkan ke halaman soal berikutnya
//   if (nextQuestionNumber <= totalQuestions) {
//     window.location.href = `../main/practice${nextQuestionNumber}.html`;
//   } else {
//     // Jika sudah di akhir kuis, arahkan ke halaman hasil atau menu utama
//     alert('Anda telah menyelesaikan semua soal dalam kuis ini.');
//     window.location.href = '/main/practice.html';
//   }
// });

// document.querySelector('.next-btn').addEventListener('click', () => {
//   const nextUrl = document.querySelector('.next-btn').getAttribute('href');
//   fetch(`/check-quiz-progress?username=${username}&quizFile=${nextUrl}`)
//       .then(res => res.json())
//       .then(data => {
//           if (data.isAnswered) {
//               window.location.href = nextUrl;
//           } else {
//               alert('Anda belum menyelesaikan soal sebelumnya.');
//           }
//       });
// });


// // Panggil fungsi untuk memuat progress saat halaman dibuka
// loadQuizProgress();

// Mengambil elemen DOM
// const username = localStorage.username;
// const quizFileName = window.location.pathname.split('/').pop(); // Misal: 'practice1.html'
// const questionNumber = 3; // Ganti sesuai dengan nomor soal yang sedang dikerjakan
// const totalQuestions = 3; // Ganti dengan jumlah total soal yang ada
// const options = document.querySelectorAll('input[name="quiz"]');
// const correctAnswer = document.querySelector('.correct-answer');
// const wrongAnswer = document.querySelector('.wrong-answer');
// const nextBtn = document.querySelector('.next-btn');

// // Event listener untuk setiap opsi jawaban
// options.forEach(option => {
//   option.addEventListener('change', () => {
//     options.forEach(opt => opt.disabled = true);
//     saveQuizProgress(username, quizFileName, questionNumber, option.value);

//     // Simpan progress kuis
//     saveQuizProgress(username, quizFileName, questionNumber, option.value);

//     // Tampilkan feedback
//     if (option.value === '1') {
//       correctAnswer.style.display = 'block';
//     } else {
//       wrongAnswer.style.display = 'block';
//     }

//     nextBtn.style.display = 'inline-block';
//   });
// });

// // Fungsi untuk menyimpan progress kuis
// const saveQuizProgress = (username, quizFileName, questionNumber, answer) => {
//   fetch('/save-quiz-progress', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       username,
//       quizFileName,
//       questionNumber,
//       answer
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       console.log('Progress berhasil disimpan');
//       if (data.isCompleted) {
//         alert('Kuis telah selesai!');
//       }
//     } else {
//       alert(data.message);
//     }
//   })
//   .catch(() => alert('Error saat menyimpan progress'));
// // };

// // // Fungsi untuk mengambil progress kuis
// // const loadQuizProgress = () => {
// //   fetch(`/get-quiz-progress?username=${username}&quizFileName=${quizFileName}&questionNumber=${questionNumber}`)
// //     .then(res => res.json())
// //     .then(data => {
// //       if (data.answer !== null) {
// //         // Tampilkan jawaban yang sudah dipilih sebelumnya
// //         options.forEach(option => {
// //           if (option.value === data.answer) {
// //             option.checked = true;
// //           }
// //           option.disabled = true; // Kunci opsi jika sudah dijawab
// //         });

// //         // Tampilkan feedback
// //         if (data.answer === '1') {
// //           correctAnswer.style.display = 'block';
// //         } else {
// //           wrongAnswer.style.display = 'block';
// //         }
// //       }
// //     })
// //     .catch(() => console.error('Gagal memuat progress'));
// // };

// // // Panggil fungsi untuk memuat progress saat halaman dibuka
// // loadQuizProgress();

// // // Penanganan tombol Next Question
// // nextBtn.addEventListener('click', () => {
// //   const nextQuestionNumber = questionNumber + 1;

// //   // Jika ada soal berikutnya, arahkan ke halaman soal berikutnya
// //   if (nextQuestionNumber <= totalQuestions) {
// //     window.location.href = `../main/practice${nextQuestionNumber}.html`;
// //   } else {
// //     // Jika sudah di akhir kuis, arahkan ke halaman hasil atau menu utama
// //     alert('Anda telah menyelesaikan semua soal dalam kuis ini.');
// //     window.location.href = '/main/practice.html';
// //   }
// // });

// // const saveQuizProgress = (username, quizId, questionNumber, answer, totalQuestions) => {
// //   fetch('/save-quiz-progress', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({
// //       username,
// //       quizId,
// //       questionNumber,
// //       answer,
// //       totalQuestions
// //     })
// //   })
// //   .then(res => res.json())
// //   .then(data => {
// //     if (data.success) {
// //       console.log('Progress berhasil disimpan');
// //       if (data.isCompleted) {
// //         alert('Kuis telah selesai! Anda akan diarahkan ke halaman utama.');
// //         window.location.href = '/main/frontpage.html';
// //       }
// //     } else {
// //       alert(data.message);
// //     }
// //   })
// //   .catch(() => alert('Error saat menyimpan progress'));
// // };

// // // Mengambil elemen DOM
// const options = document.querySelectorAll('input[name="quiz"]');
// const correctAnswer = document.querySelector('.correct-answer');
// const wrongAnswer = document.querySelector('.wrong-answer');
// const nextBtn = document.querySelector('.next-btn');

// // Mendapatkan informasi kuis
// const questionNumber = window.location.pathname.split('/').pop().replace('.html', '');
// const quizId = 1; // Asumsi ID kuis
// const username = sessionStorage.getItem('username');
// const totalQuestions = 5; // Misalnya, jika ada 5 soal

// // Event listener untuk setiap opsi jawaban
// options.forEach(option => {
//   option.addEventListener('change', () => {
//     options.forEach(opt => opt.disabled = true);
//     saveQuizProgress(username, quizId, questionNumber, option.value, totalQuestions);

//     if (option.value === '1') {
//       correctAnswer.style.display = 'block';
//     } else {
//       wrongAnswer.style.display = 'block';
//     }

//     nextBtn.style.display = 'inline-block';
//   });
// });

const saveQuizProgress = (username, quizId, questionNumber, answer, totalQuestions) => {
  fetch('/save-quiz-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      quizId,
      questionNumber,
      answer,
      totalQuestions
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Progress berhasil disimpan');
      if (data.isCompleted) {
        alert('Kuis telah selesai! Anda akan diarahkan ke halaman utama.');
        location.href = '/main/practice.html';
      }
    } else {
      alert(data.message);
    }
  })
  .catch(() => alert('Error saat menyimpan progress'));
};

// const checkQuizStatus = (quizId, username) => {
//   fetch(`/check-quiz-status?quizId=${quizId}&username=${username}`)
//     .then(response => response.json())
//     .then(data => {
//       if (data.isCompleted) {
//         // Jika kuis sudah dikerjakan, tampilkan alert
//         alert(data.message); // Menampilkan pesan "Kuis sudah dikerjakan"
//       } 
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       alert('Terjadi kesalahan. Coba lagi.');
//     });
// };


// Mengambil elemen DOM
const options = document.querySelectorAll('input[name="quiz"]');
const correctAnswer = document.querySelector('.correct-answer');
const wrongAnswer = document.querySelector('.wrong-answer');
const nextBtn = document.querySelector('.next-btn');

// Mendapatkan informasi kuis
const questionNumber = window.location.pathname.split('/').pop().replace('.html', '');
const quizId = 1; // Asumsi ID kuis
const username = sessionStorage.getItem('username');
const totalQuestions = 3; // Misalnya, jika ada 5 soal

// Event listener untuk setiap opsi jawaban
options.forEach(option => {
  option.addEventListener('change', () => {
    options.forEach(opt => opt.disabled = true);
    saveQuizProgress(username, quizId, questionNumber, option.value, totalQuestions);

    if (option.value === '1') {
      correctAnswer.style.display = 'block';
    } else {
      wrongAnswer.style.display = 'block';
    }

    nextBtn.style.display = 'inline-block';
  });
});
