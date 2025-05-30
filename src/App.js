import { useEffect, useState } from 'react';
import ExamPage from './components/ExamPage.jsx';
import Result from './components/Result.jsx';

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/react_questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  if (submitted) {
    return <Result questions={questions} userAnswers={userAnswers} />;
  }

  return (
    <ExamPage
      questions={questions}
      userAnswers={userAnswers}
      setUserAnswers={setUserAnswers}
      onSubmit={() => setSubmitted(true)}
    />
  );
}

export default App;