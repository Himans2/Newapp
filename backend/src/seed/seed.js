import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Lesson from '../models/Lesson.js';
import { lessonSeedData } from '../dataDummy.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Lesson.deleteMany({});
  await Lesson.insertMany(lessonSeedData);
  console.log('Lessons seeded');
  process.exit(0);
};

seed();
