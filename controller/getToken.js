import oktaVerifier from '../../../config/okta-config';


const read = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/i);

  console.log(`Header: ${JSON.stringify(authHeader)}`);

  if (!match) {
    req.jwt = false;
    return next();
  }

  const accessToken = match[1];

  return oktaVerifier().verifyAccessToken(accessToken)
    .then((jwt) => {
      console.log('OK');
      console.log(`jwt: ${JSON.stringify(jwt)}`);

      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      console.log('Jwt error: ', err);
      req.jwt = false;
      return next();
    });
};

export default {
  read
};
