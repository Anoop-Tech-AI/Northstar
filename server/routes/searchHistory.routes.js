const express = require('express');
const {
  getSearchHistory,
  addSearchHistory,
  clearSearchHistory
} = require('../controllers/searchHistory.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getSearchHistory);
router.post('/', addSearchHistory);
router.delete('/', clearSearchHistory);

module.exports = router;
