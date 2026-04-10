import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true }
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['Basics of Insurance', 'Premiums', 'Claims', 'Fraud Awareness'],
      required: true
    },
    example: { type: String, required: true },
    quizQuestions: { type: [quizQuestionSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Lesson', lessonSchema);
