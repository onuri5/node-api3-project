const express = require('express');

const server = express();

const usersRouter = require('./users/users-router');

const { logger } = require('../api/middleware/middleware');

// remember express by default cannot parse JSON in request bodies
server.use(express());
// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
