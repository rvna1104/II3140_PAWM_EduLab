const options = document.querySelectorAll('input[name="quiz"]');
const correctAnswer = document.querySelector('.correct-answer');
const wrongAnswer = document.querySelector('.wrong-answer');
const nextBtn = document.querySelector('.next-btn');

options.forEach(option => {
  option.addEventListener('change', () => {
    if (option.value === '1') {
        correctAnswer.style.display = 'block';
        nextBtn.style.display = 'inline-block';
    }
    if (option.value === '0') {
        wrongAnswer.style.display = 'block';
        nextBtn.style.display = 'inline-block';
    }
  });
});