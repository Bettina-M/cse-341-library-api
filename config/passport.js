const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = function(passportInstance) {
  // Serialize / deserialize for session
  passportInstance.serializeUser((user, done) => done(null, user.id));
  passportInstance.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user)).catch(done);
  });

  // Local strategy (email + password)
  passportInstance.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email or password' });
      if (user.provider !== 'local') return done(null, false, { message: 'Use OAuth provider to login' });

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) return done(null, false, { message: 'Incorrect email or password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Google OAuth 2.0
  passportInstance.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] && profile.emails[0].value;
      let user = await User.findOne({ googleId: profile.id });
      if (!user && email) user = await User.findOne({ email });

      if (user) {
        // If user exists but doesn't have googleId, attach it
        if (!user.googleId) {
          user.googleId = profile.id;
          user.provider = 'google';
          await user.save();
        }
        return done(null, user);
      }

      const newUser = new User({
        provider: 'google',
        googleId: profile.id,
        email,
        name: profile.displayName
      });
      await newUser.save();
      done(null, newUser);
    } catch (err) {
      done(err);
    }
  }));
};
