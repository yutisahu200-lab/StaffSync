import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['HR Admin', 'Manager', 'Employee'], default: 'Employee' },
  department: { type: String, default: 'Unassigned' },
  jobTitle: { type: String, default: 'Team member' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('User', userSchema);