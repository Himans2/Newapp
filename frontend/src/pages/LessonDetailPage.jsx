import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';

const LessonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/lessons/${id}`).then((res) => setLesson(res.data));
  }, [id]);

  const submitQuiz = async () => {
    const payload = {
      lessonId: lesson._id,
      answers: lesson.quizQuestions.map((_, idx) => Number(answers[idx]))
    };

    const res = await api.post('/quiz/submit', payload);
    setResult(res.data);
  };

  if (!lesson) return <div className="p-4">Loading lesson...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p className="text-sm text-blue-600">{lesson.category}</p>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
        <p className="text-slate-700">{lesson.content}</p>
        <p className="text-sm italic">Example: {lesson.example}</p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <h2 className="font-bold">Quick Quiz</h2>
        {lesson.quizQuestions.map((q, qIdx) => (
          <div key={q.question} className="border rounded-lg p-3">
            <p className="font-medium">{qIdx + 1}. {q.question}</p>
            <div className="mt-2 space-y-2">
              {q.options.map((option, optIdx) => (
                <label key={option} className="block text-sm">
                  <input
                    type="radio"
                    name={`q-${qIdx}`}
                    value={optIdx}
                    onChange={(e) => setAnswers({ ...answers, [qIdx]: e.target.value })}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={submitQuiz} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
          Submit Quiz
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
          <p className="font-bold">Score: {result.score}/{result.total}</p>
          <p className={result.passing ? 'text-emerald-600' : 'text-red-600'}>
            {result.passing ? 'Great job! You passed.' : 'Almost there. Try next lesson too!'}
          </p>
          <p className="text-sm">Points earned: +{result.earnedPoints}</p>
          <button onClick={() => navigate('/dashboard')} className="text-blue-600 text-sm">
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonDetailPage;
