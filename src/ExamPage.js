import { useState } from 'react';
import Question from './Question.jsx';

function ExamPage({ questions, userAnswers, setUserAnswers, onSubmit }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(prev => Math.min(prev + 1, questions.length - 1));
  const prev = () => setCurrent(prev => Math.max(prev - 1, 0));

  return (
    <div>
      <Question
        data={questions[current]}
        answer={userAnswers[questions[current].id]}
        onAnswer={ans => setUserAnswers({ ...userAnswers, [questions[current].id]: ans })}
      />
      <div>
        <button onClick={prev} disabled={current === 0}>Previous</button>
        <button onClick={next} disabled={current === questions.length - 1}>Next</button>
      </div>
      {current === questions.length - 1 && (
        <button onClick={onSubmit}>Submit Exam</button>
      )}
    </div>
  );
}

export default ExamPage;
