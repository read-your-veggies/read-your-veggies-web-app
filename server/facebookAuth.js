const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const {User} = require('../db/schemas.js')
const getPolRatio = require('./getRegionalPolitics.js');

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
    profileFields: ['email', 'birthday', 'location', 'displayName', 'hometown', 'age_range']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick( () => {
      User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebookId = profile.id;
          newUser.name = profile.displayName;
          newUser.emails = profile._json.email;
          newUser.facebookUrl = profile.profileUrl;
          newUser.location = profile._json.location.name;
          newUser.locPolRatio = 0; // We will run the getPolRatio function as a daily worker to fill this field in properly
          newUser.hometown = profile._json.hometown.name;
          newUser.homePolRatio = 0; // Will run getPolRatio func as a daily worker for this.
          newUser.age_range = JSON.stringify(profile._json.age_range);

          console.log('new user to be saved', newUser);
          newUser.save( (err) => {
            if (err) {
              console.log(err);
            }
            return done(null, newUser);
          })
        }
      })
    })
  }
));

module.exports = passport;