const commonQuestions = document.querySelectorAll(".question-item");
commonQuestions.forEach(question => {
  question.addEventListener('click', ()=>{
    const answer = question.querySelector(".answer-text");

    document.querySelectorAll('.question-item').forEach(item => {
      if (item !== question){
        item.classList.remove('open');
        item.querySelector(".answer-text").style.maxHeight = null;
      }
    })

    if (question.classList.contains('open')){
      answer.style.maxHeight = null;
      question.classList.remove('open');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      question.classList.add('open');
    }
  })
})