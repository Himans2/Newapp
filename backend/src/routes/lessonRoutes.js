import express from 'express';
import { createLesson, getLessonById, getLessons, updateLesson } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);

// Basic admin endpoints (no role checks for starter implementation)
router.post('/', createLesson);
router.put('/:id', updateLesson);

export default router;
