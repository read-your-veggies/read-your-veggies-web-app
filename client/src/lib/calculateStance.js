export const calculateOnboardStance = function(onboardString) {
  //if the user isn't coming in, or of the user needs onboarding, return a stance of 0;
  if (onboardString == undefined || onboardString === 'NEED_ON_BOARDING') {
    return 0;
  }
  var onboardInfo = JSON.parse(onboardString);
  //stance: -100 : 100
  var stance = onboardInfo.stanceSlider;
  //viewOnParents: -100 : 100
  var viewOnParents = onboardInfo.parentSlider;

  // if view of parents === 0, ignore it.
  if (viewOnParents === 0) {
    stance = stance / 100;
  } else {
    stance = (stance * Math.abs(viewOnParents)) / 10000;
  }
  return stance;
};

export const calculateRegionalPoliticalStance = function(hometownPoliticalStance, currentCityPoliticalStance) {
  return (hometownPoliticalStance + currentCityPoliticalStance) / 2;
}


export const calculateUserStance = function(onboardingStance, regionalPoliticsStance, readingStance) {
  return onboardingStance * 0.6 + regionalPoliticsStance * 0.2 + readingStance * 0.2;
}


export const calculateNutritionalValue = function(onboardStance, articleStance) {
  return Math.round(Math.abs(onboardStance - articleStance) / 2 * 10); 
}
