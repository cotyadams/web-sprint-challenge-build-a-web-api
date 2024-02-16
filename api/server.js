const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');
const { logger } = require('./projects/projects-middleware.js');
// Configure your server here
server.use(express.json());
server.use(logger);
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);
// Build your actions router in /api/actions/actions-router.js

// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
