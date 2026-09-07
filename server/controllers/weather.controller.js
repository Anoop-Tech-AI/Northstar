const { fetchWeather } = require('../services/weather.service');
const { validateCoordinates } = require('../middleware/validate.middleware');

async function getWeather(req, res, next) {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon || !validateCoordinates(lat, lon)) {
      return res.status(400).json({ success: false, error: 'Valid lat (-90 to 90) and lon (-180 to 180) query parameters are required' });
    }

    const data = await fetchWeather(lat, lon);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWeather };
