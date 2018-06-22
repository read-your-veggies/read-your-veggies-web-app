const passport = require('passport');
const fbStrategy = require('passport-facebook');
require('dotenv').config();

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,   // These are not yet defined in .env file
    clientSecret: process.env.APP_SECRET,
    callbackURL: process.env.CALLBACK_URL},
    function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
));

module.exports = passport;