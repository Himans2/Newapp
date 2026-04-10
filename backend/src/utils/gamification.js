export const LESSON_COMPLETION_POINTS = 20;
export const QUIZ_PASS_POINTS = 30;

export const calculateBadges = (completedLessonCount, totalLessonCount) => {
  const badges = [];

  if (completedLessonCount >= 1) badges.push('Beginner');
  if (completedLessonCount >= 5) badges.push('Smart Learner');
  if (totalLessonCount > 0 && completedLessonCount >= totalLessonCount) badges.push('Insurance Pro');

  return badges;
};
