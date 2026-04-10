import { Link } from 'react-router-dom';

const LessonCard = ({ lesson }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-slate-100">
      <p className="text-xs text-blue-500 font-semibold uppercase">{lesson.category}</p>
      <h3 className="text-lg font-bold mt-1">{lesson.title}</h3>
      <p className="text-slate-600 text-sm mt-2">{lesson.content}</p>
      <Link to={`/lessons/${lesson._id}`} className="inline-block mt-4 text-sm font-medium text-blue-600">
        Continue →
      </Link>
    </div>
  );
};

export default LessonCard;
