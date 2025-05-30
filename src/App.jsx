import { useEffect, useState, useRef } from 'react';
import ExamPage from './ExamPage.jsx';
import Result from './Result.jsx';

const DEADLINE = new Date('2025-06-01T00:00:00'); // June 1, 2025 midnight

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    fetch('/react_questions.json')
      .then(res => res.json())
      .then(data => {
        console.log("Loaded questions:", data);
        setQuestions(data);
      });
  }, []);

  useEffect(() => {
    const now = new Date();
    if (now >= DEADLINE) {
      alert("Deadline has passed. Exam is closed.");
      setSubmitted(true);
      return;
    }

    const secondsUntilDeadline = Math.floor((DEADLINE - now) / 1000);
    setTimeLeft(Math.min(3600, secondsUntilDeadline));

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (submitted) {
    return <Result questions={questions} userAnswers={userAnswers} />;
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Exam Info</h2>
        <div className="deadline">
       <h3>Deadline</h3>
         <p>June 1, 2025, 11:59 PM</p>
        </div>
        <div className="timer-container">
          <h3>Time Remaining</h3>
          <p className={`timer-text ${timeLeft <= 60 ? 'warning' : ''}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </aside>
      <main className="exam-content">
        <ExamPage
          questions={questions}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          onSubmit={() => setSubmitted(true)}
        />
      </main>
    </div>
  );
}

export default App;
