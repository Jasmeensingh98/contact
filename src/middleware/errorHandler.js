// Centralized error handler so API responses are consistent.
module.exports = function errorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  if (res.headersSent) return next(err);

  let statusCode = 500;
  let message = 'Server error';

  // Mongoose validation errors (required fields, email format, etc.)
  if (err && err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  // Invalid MongoDB ObjectId in routes like /api/contacts/:id
  if (err && err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Invalid contact id';
  }

  return res.status(statusCode).json({ message });
};

