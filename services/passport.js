const passport = require("passport");
const User = require("../models/User");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // Check  for validity of email & password
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // ensure stored passwords and submitted passwords match
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Set up options for JWT
// tell passport where to look for the token
// and pass it the secret to decode the token
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// Create the jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call  done with that
  // otherwise, call done without a user object

  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    // first props in done(null, user || false) is an error
    // In else case no user was found so return false to let
    // passport know that auth failed
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use the strategy jwtLogin which uses jwtOptions
passport.use(jwtLogin);
passport.use(localLogin);