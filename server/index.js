const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const eureka =require('./config/eureka.js');

const createMiddleware = require('swagger-express-middleware');
const path = require('path');


const server = express();
server.use(cors());
server.use(express.json());
server.use('/api', routes);




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

*7
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
