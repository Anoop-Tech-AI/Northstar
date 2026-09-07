const express = require('express');
const { getPreferences, updatePreferences } = require('../controllers/preference.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getPreferences);
router.put('/', updatePreferences);

module.exports = router;
