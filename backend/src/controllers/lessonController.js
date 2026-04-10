import Lesson from '../models/Lesson.js';

export const getLessons = async (_req, res) => {
  const lessons = await Lesson.find().select('-quizQuestions.correctAnswer');
  res.json(lessons);
};

export const getLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  res.json(lesson);
};

export const createLesson = async (req, res) => {
  const lesson = await Lesson.create(req.body);
  res.status(201).json(lesson);
};

export const updateLesson = async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  res.json(lesson);
};
