import Lesson from '../models/Lesson.js';

export const getUserProgress = async (req, res) => {
  const totalLessons = await Lesson.countDocuments();
  const completed = req.user.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  res.json({
    name: req.user.name,
    email: req.user.email,
    points: req.user.points,
    badges: req.user.badges,
    completedLessons: req.user.completedLessons,
    totalLessons,
    progressPercent
  });
};
