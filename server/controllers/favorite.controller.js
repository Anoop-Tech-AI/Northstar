const Favorite = require('../models/Favorite');

async function getFavorites(req, res, next) {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: favorites });
  } catch (err) {
    next(err);
  }
}

async function addFavorite(req, res, next) {
  try {
    const { name, region, country, latitude, longitude, customName } = req.body;
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    const existing = await Favorite.findOne({
      userId: req.user._id,
      latitude: { $gte: lat - 0.02, $lte: lat + 0.02 },
      longitude: { $gte: lon - 0.02, $lte: lon + 0.02 }
    });

    if (existing) {
      return res.status(409).json({ success: false, error: 'Location is already in favorites' });
    }

    const count = await Favorite.countDocuments({ userId: req.user._id });

    const fav = new Favorite({
      userId: req.user._id,
      name: name.trim(),
      region: (region || '').trim(),
      country: (country || '').trim(),
      latitude: lat,
      longitude: lon,
      customName: (customName || '').trim(),
      order: count
    });

    await fav.save();
    res.status(201).json({ success: true, data: fav });
  } catch (err) {
    next(err);
  }
}

async function deleteFavorite(req, res, next) {
  try {
    const fav = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!fav) {
      return res.status(404).json({ success: false, error: 'Favorite location not found' });
    }

    res.json({ success: true, message: 'Favorite removed successfully' });
  } catch (err) {
    next(err);
  }
}

async function updateFavorite(req, res, next) {
  try {
    const { customName, order } = req.body;
    const update = {};
    if (typeof customName === 'string') update.customName = customName.trim();
    if (typeof order === 'number') update.order = order;

    const fav = await Favorite.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: update },
      { new: true }
    );

    if (!fav) {
      return res.status(404).json({ success: false, error: 'Favorite location not found' });
    }

    res.json({ success: true, data: fav });
  } catch (err) {
    next(err);
  }
}

async function syncFavorites(req, res, next) {
  try {
    const { favorites } = req.body;
    if (!Array.isArray(favorites)) {
      return res.status(400).json({ success: false, error: 'Expected an array of favorites' });
    }

    const saved = [];
    for (const item of favorites) {
      if (!item.name || typeof item.latitude !== 'number' || typeof item.longitude !== 'number') continue;
      const lat = parseFloat(item.latitude);
      const lon = parseFloat(item.longitude);

      const exists = await Favorite.findOne({
        userId: req.user._id,
        latitude: { $gte: lat - 0.02, $lte: lat + 0.02 },
        longitude: { $gte: lon - 0.02, $lte: lon + 0.02 }
      });

      if (!exists) {
        const fav = new Favorite({
          userId: req.user._id,
          name: item.name.trim(),
          region: (item.region || '').trim(),
          country: (item.country || '').trim(),
          latitude: lat,
          longitude: lon,
          customName: (item.customName || '').trim(),
          order: saved.length
        });
        await fav.save();
        saved.push(fav);
      }
    }

    const all = await Favorite.find({ userId: req.user._id }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: all, syncedCount: saved.length });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFavorites, addFavorite, deleteFavorite, updateFavorite, syncFavorites };
