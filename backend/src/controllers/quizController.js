import Lesson from '../models/Lesson.js';
import User from '../models/User.js';
import { LESSON_COMPLETION_POINTS, QUIZ_PASS_POINTS, calculateBadges } from '../utils/gamification.js';

export const submitQuiz = async (req, res) => {
  const { lessonId, answers } = req.body;
  const userId = req.user._id;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  let correctCount = 0;
  const feedback = lesson.quizQuestions.map((q, index) => {
    const isCorrect = answers[index] === q.correctAnswer;
    if (isCorrect) correctCount += 1;
    return {
      question: q.question,
      selected: answers[index],
      correctAnswer: q.correctAnswer,
      isCorrect
    };
  });

  const passing = correctCount >= Math.ceil(lesson.quizQuestions.length * 0.6);
  const user = await User.findById(userId);

  let earnedPoints = 0;
  if (!user.completedLessons.includes(lesson._id)) {
    user.completedLessons.push(lesson._id);
    earnedPoints += LESSON_COMPLETION_POINTS;
  }

  if (passing) {
    earnedPoints += QUIZ_PASS_POINTS;
  }

  user.points += earnedPoints;

  const totalLessons = await Lesson.countDocuments();
  user.badges = calculateBadges(user.completedLessons.length, totalLessons);

  await user.save();

  res.json({
    score: correctCount,
    total: lesson.quizQuestions.length,
    passing,
    earnedPoints,
    feedback,
    userProgress: {
      points: user.points,
      badges: user.badges,
      completedLessons: user.completedLessons
    }
  });
};
