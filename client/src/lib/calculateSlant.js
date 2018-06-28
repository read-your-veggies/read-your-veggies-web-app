export const calculateOnboardSlant = function(onboardString) {

  //if the user isn't coming in, or of the user needs onboarding, return a slant of 0;
  if (onboardString == undefined || onboardString === 'NEED_ON_BOARDING') {
    return 0;
  }
  
  var onboardInfo = JSON.parse(onboardString);
  //slant: -100 : 100
  var slant = onboardInfo.slantSlider;
  //viewOnParents: -100 : 100
  var viewOnParents = onboardInfo.parentSlider;

  // if view of parents === 0, ignore it.
  if (viewOnParents === 0) {
    slant = slant / 100;
  } else {
    slant = (slant * Math.abs(viewOnParents)) / 10000;
  }

  return slant;
};


//we will add to this function as we get more info! 
export const calculateNutritionalValue = function(onboardSlant, articleSlant) {
  return Math.round(Math.abs(onboardSlant - articleSlant) / 2 * 10); 
}
