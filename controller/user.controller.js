
import oktaManagement from '../../config/okta-management-config';


const getCurrentUser = async (req, res, next) => {
  try {
    const user = await oktaManagement().getUser(req.jwt.claims.uid);
    const prof = user.profile;
    console.log(`PROFILO ${JSON.stringify(prof)}`);
    try {
      const userLocal = await User.findOne({
        email: (user.profile.email).toLowerCase().trim()
      });
      if (!userLocal) {
        let userL = new User({
          provider: 'okta',
          providerId: user.id,
          login: user.profile.login,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          email: user.profile.email
        });

        console.log(`user local: ${userL}`);
        try {
          userL = await userL.save();
          req.user = userL;
          next();
        } catch (err) {
          console.log('error: ', err);
          res.jsonp({
            message: 'error'
          });
        }
      } else {
        try {
          userLocal.provider = 'okta';
          userLocal.providerId = user.id;
          userLocal.firstName = user.profile.firstName;
          userLocal.lastName = user.profile.lastName;

          await userLocal.save();
          req.user = userLocal;
          next();
        } catch (err) {
          console.log('error: ', err);
          return res.status(400).send({
          });
        }
      }
    } catch (err) {
      console.log(`err: ${err}`);
      res.json({
        message: 'error'
      });
    }
  } catch (error) {
    console.log(`error: ${error}`);
    res.json({
      message: 'error'
    });
  }
};

const printUserResult = async (req, res) => {
  if (req.user) {
    const { user } = req;
    const result = {
      _id: user.providerId,
      created: user.created,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      clientIds: user.clientIds
    };

    res.json(result);
  } else {
    return res.status(400).send({});
  }
};

const update = async (req, res, next) => {
  console.log(`body: ${JSON.stringify(req.body)}`);

  try {
    let user = await User.findOne({
      _id: req.user._id
    });
    console.log('user: ', user);
    if (!user) {
      res.status(500).send({});
    } else {
      try {
        user.clientIds = req.body.clientIds;
        user = await user.save();

        req.user = user;
        next();
      } catch (error) {
        console.log(error);
        return res.status(400).json();
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
};

export default {
  getCurrentUser,
  update,
  printUserResult
};
