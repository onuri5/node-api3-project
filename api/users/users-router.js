const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// The middleware functions also need to be required

const{
  logger,
  validatePost,
  validateUser,
  validateUserId,
  handleError
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(userArr => {
      res.status(200).json(userArr);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
    Users.insert(req.body)
      .then(test => {
        console.log(test)
        res.status(201).json(test);
      })
      .catch(next);
  })

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then((updatedUser) => {
      res.status(200).json(updatedUser)
    })
    .catch(next);
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const user = await Users.getById(req.params.id);
  Users.remove(req.params.id) 
  .then(() => {
    res.status(200).json(user);
  })
  .catch(next);
});

router.get('/:id/posts', validateUserId,  (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use(handleError);

// do not forget to export the router
module.exports = router;