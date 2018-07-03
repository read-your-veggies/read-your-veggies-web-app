const sourceWeights = require('./allSourceWeights.js');
const webSiteArray = Object.keys(sourceWeights);

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
    return stance;
  },

  calculateUserReadingStance: (currentStance, completedArticle) => {
    var currentReadingStance = currentStance[0];
    var totalArticlesRead = currentStance[1];
    var tally = 0;

    let { userStance, articleStance, votes, nutritionalValue } = completedArticle;

    // calculate chasm 
    var chasm = Math.abs(userStance - articleStance) / 2;

    // add things
    if (votes.fun === true) {
      tally += chasm / 2;
    }
    if (votes.agree === true) {
      tally += chasm / 2;
    }
    //subtract things
    if (votes.bummer === true) {
      tally -= chasm / 2;
    }
    if (votes.disagree === true) {
      tally -= chasm / 2;
    }

    // flip it if needed
    if (userStance > articleStance) {
      tally = tally * -1;
    }

    //get new average
    var aggregateOldStance = currentReadingStance * totalArticlesRead;
    var aggregateNewStance = (aggregateOldStance + tally) / (totalArticlesRead + 1);
  
    return [aggregateNewStance, totalArticlesRead + 1];
  },

  calculateUserBrowsingStance: (incomingBrowsingHistory, currentBrowsingStance) => {
    console.log('incomingBrowsingHistory is', incomingBrowsingHistory);
    console.log('currentBrowsingStance is', currentBrowsingStance);

    var incomingBrowsingStance = 0;
    var incomingArticles = 0;

    incomingBrowsingHistory.forEach((title) => {
      webSiteArray.forEach((site) => {
        if (title.includes(site)) {
          incomingBrowsingStance += sourceWeights[site];
          incomingArticles++;
        }
      });
    });

    const normalizedBrowsingStance = currentBrowsingStance[0] * currentBrowsingStance[1];
    // console.log(normalizedBrowsingStance);
    let updatedBrowsingStance =  (normalizedBrowsingStance + incomingBrowsingStance) / (currentBrowsingStance[1] + incomingArticles);
    if (isNaN(updatedBrowsingStance)) {
      updatedBrowsingStance = 0;
    }
    console.log('updatedbrowsingstance', updatedBrowsingStance);
    //returns stance between -1,1 and total articles read
    return [updatedBrowsingStance, currentBrowsingStance[1] + incomingArticles];
  },

  calculateUserAggregateStance: (onboardingStance, localPolStance, homePolStance, readingStance) => {
    // console.log('stances:', onboardingStance, localPolStance, homePolStance, readingStance)
    return onboardingStance * 0.6 + localPolStance * 0.1 + homePolStance * 0.1 + readingStance[0] * 0.2;
  }, 
  
}
