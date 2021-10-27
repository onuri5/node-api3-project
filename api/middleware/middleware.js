const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIG
  console.log(req.method, req.url, Date.now());
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
      message: err.message,
      prodMessage: 'something went really wrong!',
  });
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
  handleError
}