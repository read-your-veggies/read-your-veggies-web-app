const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const {User} = require('../db/schemas.js')
const countyConvert = require('../db/data/citiesCounties.js');
const convert2012 = require('../db/data/countyResults2012.js');
const convert2016 = require('../db/data/countyResults2016.js');

require('dotenv').config();

// Serialize saves the User ID to the session.
passport.serializeUser( (user, done) => {
  done(null, user);
});

// Deserialize takes the ID and adds the other necessary user info to the session.
passport.deserializeUser( (user, done) => {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    profileFields: ['email', 'birthday', 'location', 'displayName', 'hometown', 'age_range']
  },
  function(accessToken, refreshToken, profile, done) {  // We obtain a profile object from the FacebookStrategy, passed into this callback func 
    process.nextTick( () => {
      User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) return done(err);

        if (user) {  // User exists, we invoke done and pass information to the middleware.
          return done(null, {_id: user._id, name: user.name});
        } else { // User does not exist, we create a new user for the DB.
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
          newUser.health = 0;

          console.log('new user to be saved', newUser);
          newUser.save( (err) => {
            if (err) {
              console.log(err);
            }  // New user saved.  We can now invoke done, like we did for the previous case.
            return done(null, {_id: newUser._id, name: newUser.name});
          })
        }
      })
    })
  }
));

const calculateLocPol = function (city) {
  // For the user's city, find the county, then find county's election data for 2012 and 2016.
  // The data is a ratio of (GOP votes - Dem votes) / Total votes
  // This is added to the new user profile above.
  let county = countyConvert[city];
  let result12 = convert2012[county];
  let result16 = convert2016[county];

  var aggregateResult = (result12 + result16) / 2;

  if (isNaN(aggregateResult)) {
    return 0;
  } else {
    return aggregateResult;
  }
}

module.exports = passport;