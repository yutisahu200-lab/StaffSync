import { Router } from 'express';
import LeaveRequest from '../models/LeaveRequest.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', async (req, res) => {
  const filter = req.user.role === 'Employee' ? { employee: req.user._id } : {};
  const leaves = await LeaveRequest.find(filter).populate('employee', 'name email department').populate('reviewedBy', 'name').sort({ createdAt: -1 });
  res.json(leaves);
});
router.post('/', allowRoles('Employee'), async (req, res) => {
  try {
    const { type, startDate, endDate, reason } = req.body;
    if (!type || !startDate || !endDate || new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ message: 'Provide a valid leave type and date range' });
    }
    const leave = await LeaveRequest.create({ employee: req.user._id, type, startDate, endDate, reason });
    res.status(201).json(leave);
  } catch { res.status(400).json({ message: 'Could not submit leave request' }); }
});
router.patch('/:id/review', allowRoles('HR Admin', 'Manager'), async (req, res) => {
  const { status } = req.body;
  if (!['Approved', 'Rejected'].includes(status)) return res.status(400).json({ message: 'Status must be Approved or Rejected' });
  const leave = await LeaveRequest.findByIdAndUpdate(req.params.id, { status, reviewedBy: req.user._id }, { new: true, runValidators: true });
  if (!leave) return res.status(404).json({ message: 'Leave request not found' });
  res.json(leave);
});
export default router;