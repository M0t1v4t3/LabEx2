function Result({ questions, userAnswers }) {
  let score = 0;

  questions.forEach(q => {
    const correct = q.answer.toString().toLowerCase();
    const user = (userAnswers[q.id] || "").toString().toLowerCase();
    if (correct === user) score++;
  });

  return (
    <div>
      <h2>Exam Completed!</h2>
      <p>Your Score: {score} / {questions.length}</p>
    </div>
  );
}

export default Result;
