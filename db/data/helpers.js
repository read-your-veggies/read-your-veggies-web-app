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

    let { userStance, articleStance, votes } = completedArticle;

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
    var incomingBrowsingStance = 0;
    var incomingArticles = 0;

    incomingBrowsingHistory.forEach(title => {
      for (var i = 0; i < webSiteArray.length; i++) {
        if (title.includes(webSiteArray[i])) {
          incomingBrowsingStance += sourceWeights[webSiteArray[i]];
          incomingArticles++;
          break;
        }
      }
    });

    const normalizedBrowsingStance = currentBrowsingStance[0] * currentBrowsingStance[1];
   
    let updatedBrowsingStance =  (normalizedBrowsingStance + incomingBrowsingStance) / (currentBrowsingStance[1] + incomingArticles);
    if (isNaN(updatedBrowsingStance)) {
      updatedBrowsingStance = 0;
    }

    //returns stance between -1,1 and total articles read
    return [updatedBrowsingStance, currentBrowsingStance[1] + incomingArticles];
  },

  calculateUserAggregateStance: (scores) => {
    var weights = 0;
    var stance = 0;

    for (var key in scores) {
      if (key === 'onboardingStance' && scores[key] !== 0) {
        weights += 5;
        stance += 5 * scores.onboardingStance;
      } else if (key === 'localPolStance' && scores[key] !== 0) {
        weights += 1;
        stance += 1 * scores.localPolStance; 
      } else if (key === 'homePolStance' && scores[key] !== 0) {
        weights += 1;
        stance += 1 * scores.homePolStance;
      } else if (key === 'readingStance' && scores[key][0] !== 0) {
        weights += 1;
        stance += 1 * scores.readingStance[0];
      } else if (key === 'browsingStance' && scores[key][0] !== 0) {
        weights += 2;
        stance += 2 * scores.browsingStance[0];
      }
    }
    
    return stance / weights;
  }, 
  
}
