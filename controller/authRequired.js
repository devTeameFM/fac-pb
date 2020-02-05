const OktaJwtVerifier = require('@okta/jwt-verifier');
const request = require('request-promise');
const eureka = require('../server/config/eureka.js');

const getServiceInstance = async (serviceAppId) => {
  try {
    const eurekaInstance = await eureka();
    const instances = eurekaInstance.getInstancesByAppId(serviceAppId);

    let instanceName = null;
    if (instances && instances.length > 0) {
      instanceName = instances.shift().hostName;
    }
    return instanceName;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getLodgingsByPlaceId = async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/i);

    console.log(`Header: ${JSON.stringify(authHeader)}`);

    if (!match) {
      res.status(401);
      return next('Unauthorized');
    }

    const accessToken = match[1];
    opt = {
      "authorization" : accessToken,
      "placeId" : 1234
    }
    const { authorization, placeId } = opt;

    const hostname = await getServiceInstance(process.env.APP_ID_WORKPLACE);
    console.log('hostname: ', hostname);
    const resource = '/api/lodging-businesses';
    const options = {
      uri: `https://${hostname}${resource}`,
      headers: { Authorization: authorization },
      qs: { },
      method: 'GET',
      json: true
    };
      // console.log('options: ', options);
    return request(options);
  } catch (error) {
    console.log('error retrieve organization service', error);
    throw error;
  }
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/i);

  console.log(`Header: ${JSON.stringify(authHeader)}`);

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];
  const oktaJwtVerifier =new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER,
    assertClaims: {
      aud: process.env.OKTA_AUD
      // cid: process.env.OKTA_CID
    }
  });

  oktaJwtVerifier.verifyAccessToken(accessToken)
.then(jwt => {
  // the token is valid (per definition of 'valid' above)
  console.log('OK');
  console.log(`jwt: ${JSON.stringify(jwt)}`);
  req.jwt = jwt;

  
  

  res.status(200).send(jwt);
  next();
})
.catch(err => {
  console.log(`ERRORE${JSON.stringify(err)}`);

  res.status(401).send(err.message)
});



};


module.exports = {
  verify,
  getLodgingsByPlaceId,
  getServiceInstance
};

