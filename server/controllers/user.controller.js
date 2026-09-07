const User = require('../models/User');

async function getProfile(req, res) {
  res.json({ success: true, data: { user: req.user } });
}

async function updateProfile(req, res, next) {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Name must be at least 2 characters' });
    }

    req.user.name = name.trim();
    await req.user.save();

    res.json({ success: true, data: { user: req.user } });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
