import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js'; // Thêm dòng này

const router = express.Router();

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
});

// Đăng nhập người dùng
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 🌟 Thêm route này để lấy thông tin user
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Không trả password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Cập nhật các trường
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;
    user.birthday = req.body.birthday || user.birthday;

    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

export default router;
