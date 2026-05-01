import express from 'express';
import Info from '../models/Info.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/info
// @desc    Get site info (singleton)
// @access  Public
router.get('/', async (req, res) => {
  try {
    let info = await Info.findOne();
    if (!info) {
      info = await Info.create({});
    }
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/info
// @desc    Update site info (upsert)
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    let info = await Info.findOne();
    if (!info) {
      info = await Info.create(req.body);
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
