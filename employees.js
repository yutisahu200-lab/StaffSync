import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', allowRoles('HR Admin', 'Manager'), async (_req, res) => {
  const users = await User.find({ isActive: true }).select('name email role department jobTitle createdAt').sort({ name: 1 });
  res.json(users);
});
router.post('/', allowRoles('HR Admin'), async (req, res) => {
  try {
    const { name, email, role, department, jobTitle } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
    // Invite flow should set a one-time password/reset token in a production system.
    const temporaryPassword = `${cryptoRandom()}Aa1!`;
    const passwordHash = await (await import('bcryptjs')).default.hash(temporaryPassword, 12);
    const user = await User.create({ name, email, role: ['Manager','Employee'].includes(role) ? role : 'Employee', department, jobTitle, passwordHash });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, jobTitle: user.jobTitle, temporaryPassword });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: 'Email already exists' });
    res.status(500).json({ message: 'Could not create employee' });
  }
});
function cryptoRandom(){ return Math.random().toString(36).slice(2, 12); }
export default router;