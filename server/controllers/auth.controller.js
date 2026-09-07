const User = require('../models/User');
const Preference = require('../models/Preference');
const { signToken } = require('../utils/jwt');
const { getDbStatus } = require('../config/db');

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

async function register(req, res, next) {
  try {
    if (getDbStatus() !== 'connected') {
      return res.status(503).json({ success: false, error: 'Database service unavailable. Please try again later.' });
    }

    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email address already exists' });
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: password
    });

    await user.save();

    const preference = new Preference({ userId: user._id });
    await preference.save();

    const token = signToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    if (getDbStatus() !== 'connected') {
      return res.status(503).json({ success: false, error: 'Database service unavailable. Please try again later.' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    setAuthCookie(res, token);

    res.json({
      success: true,
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ success: true, message: 'Logged out successfully' });
}

function getMe(req, res) {
  res.json({ success: true, data: { user: req.user } });
}

module.exports = { register, login, logout, getMe };
