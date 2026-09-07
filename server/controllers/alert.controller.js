const Alert = require('../models/Alert');

async function getAlerts(req, res, next) {
  try {
    const alerts = await Alert.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: alerts });
  } catch (err) {
    next(err);
  }
}

async function addAlert(req, res, next) {
  try {
    const { alertType, threshold, location, enabled } = req.body;
    const alert = new Alert({
      userId: req.user._id,
      alertType,
      threshold: parseFloat(threshold),
      location: {
        name: location.name.trim(),
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude)
      },
      enabled: enabled !== false
    });

    await alert.save();
    res.status(201).json({ success: true, data: alert });
  } catch (err) {
    next(err);
  }
}

async function deleteAlert(req, res, next) {
  try {
    const alert = await Alert.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert rule not found' });
    }

    res.json({ success: true, message: 'Alert rule deleted successfully' });
  } catch (err) {
    next(err);
  }
}

async function toggleAlert(req, res, next) {
  try {
    const { enabled } = req.body;
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { enabled: Boolean(enabled) } },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert rule not found' });
    }

    res.json({ success: true, data: alert });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAlerts, addAlert, deleteAlert, toggleAlert };
