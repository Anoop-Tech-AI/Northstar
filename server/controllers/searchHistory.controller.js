const SearchHistory = require('../models/SearchHistory');

async function getSearchHistory(req, res, next) {
  try {
    const history = await SearchHistory.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(15);
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
}

async function addSearchHistory(req, res, next) {
  try {
    const { name, region, country, latitude, longitude } = req.body;
    if (!name || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ success: false, error: 'Valid location details required' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    await SearchHistory.deleteMany({
      userId: req.user._id,
      latitude: { $gte: lat - 0.02, $lte: lat + 0.02 },
      longitude: { $gte: lon - 0.02, $lte: lon + 0.02 }
    });

    const item = new SearchHistory({
      userId: req.user._id,
      name: name.trim(),
      region: (region || '').trim(),
      country: (country || '').trim(),
      latitude: lat,
      longitude: lon,
      timestamp: new Date()
    });

    await item.save();

    const count = await SearchHistory.countDocuments({ userId: req.user._id });
    if (count > 15) {
      const oldest = await SearchHistory.find({ userId: req.user._id })
        .sort({ timestamp: 1 })
        .limit(count - 15);
      const idsToDelete = oldest.map((doc) => doc._id);
      await SearchHistory.deleteMany({ _id: { $in: idsToDelete } });
    }

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

async function clearSearchHistory(req, res, next) {
  try {
    await SearchHistory.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: 'Search history cleared successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSearchHistory, addSearchHistory, clearSearchHistory };
