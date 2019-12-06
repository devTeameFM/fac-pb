const express = require('express');
const routes = require('../routes');
const cors = require('cors');

const createMiddleware = require('swagger-express-middleware');
const path = require('path');



const server = express();
server.use(cors());
server.use(express.json());
server.use('/api', routes);

/*
// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path.join(__dirname, 'myspot-playbook.yaml');
createMiddleware(swaggerFile, server, (err, middleware) => {

  // Add all the Swagger Express Middleware, or just the ones you need.
  // NOTE: Some of these accept optional options (omitted here for brevity)
  server.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock()
  );
});*/

module.exports = server;
