const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIG
  const date = new Date();
  console.log(req.method, req.url, date.toLocaleTimeString());
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Users.getById(req.params.id)
    .then(possibleId => {
      if(possibleId) {
        req.user = possibleId;
        next();
      } else {
        next({status: 404,  message: "user not found" });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if(
    name &&
    name.trim().length >= 3 &&
    typeof name === 'string' && 
    name.length < 20
  ) {
    next();
  } else {
    next({status: 400, message: "missing required name field"});
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if(
    text &&
    text.trim().length >= 3 &&
    typeof text === 'string' && 
    text.length < 1000
  ) {
    next();
  } else {
    next({status: 400, message: "missing required text field" });
  }
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