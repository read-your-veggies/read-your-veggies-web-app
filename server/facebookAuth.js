const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const {User} = require('../db/schemas.js')
const getPolRatio = require('./getRegionalPolitics.js');
const countyConvert = require('../db/data/citiesCounties.js');
const convert2012 = require('../db/data/countyResults2012.js');
const convert2016 = require('../db/data/countyResults2016.js');

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
          newUser.locPolRatio = calculateLocPol(profile._json.location.name);
          newUser.hometown = profile._json.hometown.name;
          newUser.homePolRatio = calculateLocPol(profile._json.hometown.name);
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

const calculateLocPol = function (city) {
  let county = countyConvert[city];
  let result12 = convert2012[county];
  let result16 = convert2016[county];

  return (result12 + result16) / 2;  
}

module.exports = passport;