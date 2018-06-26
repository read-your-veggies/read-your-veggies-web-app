var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://gateway.watsonplatform.net/personality-insights/api/',
});

var getWatsonProfile = (data) => {
    var profileParams = {
        content: data,
        content_type: 'application/json',
        consumption_preferences: true,
        raw_scores: true
    };
    personalityInsights.profile(profileParams, function(error, profile) {
        if (error) {
            console.log(error);
        } else {
            console.log(JSON.stringify(profile, null, 2));
        }
    });
}

module.exports = { getWatsonProfile }

