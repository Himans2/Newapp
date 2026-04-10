import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    completedLessons: { type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson', default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
