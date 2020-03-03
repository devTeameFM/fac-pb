const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const eureka =require('./config/eureka.js');

const createMiddleware = require('swagger-express-middleware');
const path = require('path');

const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['../routes/index.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);


const server = express();
server.use(cors());
server.use(express.json());
server.use('/api', routes);

// Serve swagger docs the way you like (Recommendation: swagger-tools)
server.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});



//eureka.eureka();
//const e = eureka();
/*
eureka()
  .then(instance => {
    instance.logger.level('debug');
    instance.start((error) => {
      console.log('status', error || 'complete');
    });
  });

*/
/*
// Or, if you're not using a transpiler:
const Eureka = require('eureka-js-client').Eureka;
const uuidv4=require('uuid/v4');
let instance = null;
 
// example configuration
const client = new Eureka({
  // application instance information
  instance: {
    instanceId: `${process.env.APP_NAME}:${uuidv4()}`,
    app: process.env.APP_NAME,
    hostName: process.env.APP_URL,
    ipAddr: '127.0.0.1',
    statusPageUrl: `https://${process.env.APP_URL}`,
    homePageUrl: `https://${process.env.APP_URL}`,
    vipAddress: process.env.APP_NAME,
    port: {
      $: 80,
      '@enabled': 'true'
    },
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    },
    registerWithEureka: true,
    fetchRegistry: true
  },
  eureka: {
    host: process.env.REGISTRY_URL,
    port: 80,
    servicePath: '/eureka/apps/'
  },
  requestMiddleware: (requestOpts, done) => {
    // eslint-disable-next-line no-param-reassign
    requestOpts.auth = {
      user: process.env.REGISTRY_USER,
      password: process.env.REGISTRY_PW
    };
    done(requestOpts);
  }
});

function connectToEureka() {              
  client.logger.level('debug');  
  client.start(function(error) {
  console.log('########################################################');
  console.log(JSON.stringify(error) || 'Eureka registration complete');   }); }

connectToEureka();
*/

module.exports = server;
