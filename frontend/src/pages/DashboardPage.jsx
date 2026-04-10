import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { AuthContext } from '../context/AuthContext';
import BadgePill from '../components/BadgePill';
import ProgressBar from '../components/ProgressBar';

const DashboardPage = () => {
  const [progress, setProgress] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    api.get('/user/progress').then((res) => setProgress(res.data));
  }, []);

  if (!progress) return <div className="p-4">Loading dashboard...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold">Welcome, {progress.name}</h2>
        <p className="text-sm text-slate-500">Track your insurance learning journey.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat label="Total Points" value={progress.points} />
        <Stat label="Lessons Done" value={`${progress.completedLessons.length}/${progress.totalLessons}`} />
        <Stat label="Badges" value={progress.badges.length} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
        <p className="font-semibold">Progress</p>
        <ProgressBar value={progress.progressPercent} />
        <p className="text-sm text-slate-500">{progress.progressPercent}% complete</p>
      </div>

      <div className="flex flex-wrap gap-2">{progress.badges.map((badge) => <BadgePill key={badge} label={badge} />)}</div>

      <div className="flex gap-3">
        <Link to="/lessons" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Continue Learning
        </Link>
        <button onClick={logout} className="bg-slate-200 px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-xs uppercase text-slate-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default DashboardPage;
