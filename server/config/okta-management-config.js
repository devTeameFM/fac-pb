import okta from '@okta/okta-sdk-nodejs';

const oktaManagementConfig = () => {
  const client = new okta.Client({
    orgUrl: process.env.OKTA_M_ORGURL,
    token: process.env.OKTA_M_TOKEN
  });

  return client;
};

export default oktaManagementConfig;
