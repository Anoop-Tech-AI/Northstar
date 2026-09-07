const Preference = require('../models/Preference');

async function getPreferences(req, res, next) {
  try {
    let pref = await Preference.findOne({ userId: req.user._id });
    if (!pref) {
      pref = new Preference({ userId: req.user._id });
      await pref.save();
    }
    res.json({ success: true, data: pref });
  } catch (err) {
    next(err);
  }
}

async function updatePreferences(req, res, next) {
  try {
    const { tempUnit, windUnit, theme, dashboardSections, defaultLocation } = req.body;
    const update = {};

    if (['celsius', 'fahrenheit'].includes(tempUnit)) update.tempUnit = tempUnit;
    if (['kmh', 'mph'].includes(windUnit)) update.windUnit = windUnit;
    if (['light', 'dark', 'system'].includes(theme)) update.theme = theme;
    if (dashboardSections && typeof dashboardSections === 'object') update.dashboardSections = dashboardSections;
    if (defaultLocation && typeof defaultLocation === 'object' && defaultLocation.name) {
      update.defaultLocation = {
        name: String(defaultLocation.name).trim(),
        latitude: parseFloat(defaultLocation.latitude) || 51.5072,
        longitude: parseFloat(defaultLocation.longitude) || -0.1276
      };
    }

    const pref = await Preference.findOneAndUpdate(
      { userId: req.user._id },
      { $set: update },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: pref });
  } catch (err) {
    next(err);
  }
}

module.exports = { getPreferences, updatePreferences };
