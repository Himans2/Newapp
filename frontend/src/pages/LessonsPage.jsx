import { useEffect, useState } from 'react';
import { api } from '../api/client';
import LessonCard from '../components/LessonCard';

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    api.get('/lessons').then((res) => setLessons(res.data));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Learning Modules</h1>
      <div className="grid gap-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson._id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
