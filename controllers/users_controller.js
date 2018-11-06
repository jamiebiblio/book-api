const User = require('../models/User');
const Institution = require('../models/Institution');
const jwt = require('jwt-simple');
const config = require('../config');

// Helper to create a JWT token for a user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.create = async (req, res) => {
  const { email, password, name } = req.body;
  const atIndex = email.indexOf('@');
  const emailDomain = email.slice(atIndex + 1);

  // Check if Insutution email domain exists
  let institution = await Institution.findOne({ emailDomain });

  // If email domain does not exist return with error
  if (!institution) {
    return res.status(409).send({
      status: 'fail',
      data: { Email: 'The email domain provided is not valid' }
    });
  }

  // If email domain exists check if user exists
  let existingUser = await User.findOne({ email });

  // if existing user with this email return with error
  if (existingUser) {
    return res.status(409).send({
      status: 'fail',
      data: { User: 'Unable to create user with this email' }
    });
  }

  // If all checks pass - create and save new user
  const newUser = new User({ name, email, password, institution });
  let user = await newUser.save();

  // Add user to the institute users array and save
  institution.users.push(user._id);
  institution.save();

  try {
    res.json({
      status: 'success',
      data: {
        token: tokenForUser(user),
        user: { email: user.email, _id: user._id }
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        user: 'unable to create a user for this email address'
      }
    });
  }
};

exports.signin = (req, res) => {
  // User is already authenticated by local strategy middleware in routes
  // we now need to create a token
  // passport sends through user object via req.user
  res.json({
    token: tokenForUser(req.user),
    user: { email: req.user.email, _id: req.user._id }
  });
};