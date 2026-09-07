const express = require('express');
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
  updateFavorite,
  syncFavorites
} = require('../controllers/favorite.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const { validateFavorite } = require('../middleware/validate.middleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', getFavorites);
router.post('/', validateFavorite, addFavorite);
router.post('/sync', syncFavorites);
router.delete('/:id', deleteFavorite);
router.patch('/:id', updateFavorite);

module.exports = router;
