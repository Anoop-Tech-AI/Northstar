function validateRegister(req, res, next) {
  const { name, email, password } = req.body || {};
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 60) {
    return res.status(400).json({ success: false, error: 'Name must be between 2 and 60 characters' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required' });
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long' });
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body || {};
  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }
  next();
}

function validateCoordinates(lat, lon) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  if (isNaN(latitude) || latitude < -90 || latitude > 90) return false;
  if (isNaN(longitude) || longitude < -180 || longitude > 180) return false;
  return true;
}

function validateFavorite(req, res, next) {
  const { name, latitude, longitude } = req.body || {};
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Location name is required' });
  }
  if (!validateCoordinates(latitude, longitude)) {
    return res.status(400).json({ success: false, error: 'Valid latitude (-90 to 90) and longitude (-180 to 180) are required' });
  }
  next();
}

function validateAlert(req, res, next) {
  const { alertType, threshold, location } = req.body || {};
  const validTypes = ['rain', 'temp_high', 'temp_low', 'wind', 'aqi'];
  if (!validTypes.includes(alertType)) {
    return res.status(400).json({ success: false, error: 'Valid alert type is required' });
  }
  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({ success: false, error: 'Threshold must be a valid number' });
  }
  if (!location || !location.name || !validateCoordinates(location.latitude, location.longitude)) {
    return res.status(400).json({ success: false, error: 'Valid alert location with coordinates is required' });
  }
  next();
}

module.exports = { validateRegister, validateLogin, validateCoordinates, validateFavorite, validateAlert };
