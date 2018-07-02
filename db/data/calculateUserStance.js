module.exports = {

  calculateUserOnboardStance: (onboardString) => {
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
    console.log(stance);
    return stance;

  },

  calculateUserReadingStance: (currentStance, completedArticle) => {
    var currentReadingStance = currentStance[0];
    var totalArticlesRead = currentStance[1];
    var tally = 0;
    // console.log('current reading stance:', currentStance)
    // console.log(completedArticle);
    let { userStance, articleStance, votes, nutritionalValue } = completedArticle;

    console.log('currentStance', currentReadingStance);
    console.log('completedArticle', completedArticle);
    // calculate chasm 
    var chasm = Math.abs(userStance - articleStance) / 2;
    // add things
    if (votes.fun === true) {
      tally += chasm;
    }
    if (votes.agree === true) {
      tally += chasm;
    }
    if (votes.worthyAdversary === true) {
      tally += chasm;
    }
    //subtract things
    if (votes.bummer === true) {
      tally -= chasm;
    }
    if (votes.disagree === true) {
      tally -= chasm;
    }
    if (votes.mean === true) {
      tally -= chasm;
    }
    //get new average
    var aggregateOldStance = currentReadingStance * totalArticlesRead;
    var aggregateNewStance = (aggregateOldStance + tally) / (totalArticlesRead + 1);
    // console.log('new reading stance:', [aggregateNewStance, totalArticlesRead + 1])
    return [aggregateNewStance, totalArticlesRead + 1];
  },

  calculateUserAggregateStance: (onboardingStance, localPolStance, homePolStance, readingStance) => {
    // console.log('stances:', onboardingStance, localPolStance, homePolStance, readingStance)
    return onboardingStance * 0.6 + localPolStance * 0.1 + homePolStance * 0.1 + readingStance[0] * 0.2;
  }
  
  
  
}
