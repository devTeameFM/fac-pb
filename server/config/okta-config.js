const OktaJwtVerifier =require('@okta/jwt-verifier');

const oktaConfig = () => {
  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER,
    assertClaims: {
      aud: process.env.OKTA_AUD
      // cid: process.env.OKTA_CID
    }
  });
  

  return oktaJwtVerifier;
};

module.exports = {
  oktaConfig
};

