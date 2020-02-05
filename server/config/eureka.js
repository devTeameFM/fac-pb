const Eureka=require('eureka-js-client');
const uuidv4=require('uuid/v4');
const ngrok=require('ngrok');
const dotenv= require('dotenv');

let instance = null;

const eureka = async () => {
  if (!instance) {
    if (!process.env.APP_URL) {
      console.log('APP_URL not found');
      const url = await ngrok.connect({ proto: 'http', addr: 8000 });
      const address = url.match(/https:\/\/(.+)/);
      console.log('ngrok address: ', address[1]);
      [, process.env.APP_URL] = address;
    }

    instance = new Eureka({
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
  }
  return instance;
};

module.exports = {
 eureka
};

//module.export = eureka;
// eureka:
//   instance:
//     metadata-map:
//       zone: primary
//       profile: ${spring.profiles.active}
//       version: ${info.project.version:}
//       git-version: ${git.commit.id.describe:}
//       git-commit: ${git.commit.id.abbrev:}
//       git-branch: ${git.branch:}
