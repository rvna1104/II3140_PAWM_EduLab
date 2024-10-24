function submitAnswer() {
    const answer = document.querySelector('.answer-box').value;
    if (answer.trim() === '') {
      alert('Please provide an answer before submitting.');
    } else {
      alert('Your answer has been submitted!');
      window.location.href = '../main/practice.html';
    }
}