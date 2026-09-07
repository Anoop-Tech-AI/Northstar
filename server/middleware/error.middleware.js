function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
}

function errorHandler(err, req, res, next) {
  console.error('Server error:', err.message);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, error: 'A resource with this key already exists' });
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'An unexpected server error occurred' : err.message
  });
}

module.exports = { notFoundHandler, errorHandler };
