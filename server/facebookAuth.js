const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const {User} = require('../db/schemas.js')

require('dotenv').config();

passport.serializeUser( (user, done) => {
  done(null, user);
});

passport.deserializeUser( (user, done) => {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    profileFields: ['email', 'birthday', 'location']
  },
  function(accessToken, refreshToken, profile, done) {
    // Add to database here
    // console.log('User', User);
    process.nextTick( () => {    // This is a pretty new function for me.
      console.log('profile', profile);
      User.findOne({'user.id': profile.id}, (err, user) => {
        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.name = profile.name;
          newUser.facebook.emails = profile.emails;
          newUser.facebook.profileUrl = profile.profileUrl;

          newUser.save( (err) => {
            if (err) {
              console.log(err);
            }

            return done(null, newUser);
          })
        }
      })
    })
    // done(null, profile);
  }
));

module.exports = passport;