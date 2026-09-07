const express = require('express');
const { getAlerts, addAlert, deleteAlert, toggleAlert } = require('../controllers/alert.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { validateAlert } = require('../middleware/validate.middleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getAlerts);
router.post('/', validateAlert, addAlert);
router.delete('/:id', deleteAlert);
router.patch('/:id', toggleAlert);

module.exports = router;
