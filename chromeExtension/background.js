'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

let lastVisitedPage = '';
let browsingHistory = [];

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.sync.get(['read_your_veggies_web_cache'], function(result) {
    browsingHistory = result.read_your_veggies_web_cache;
    console.log(browsingHistory);
  });
})

// chrome.runtime.onMessageExternal.addListener(
//   function(request, sender, sendResponse) {
//     console.log(request);
//     if (sender.url == blocklistedWebsite)
//       return;  // don't allow this web page access
//     if (request.openUrlInEditor)
//       openUrl(request.openUrlInEditor);
//   }
// );


//sometimes onVisited fires multiple times
//by keeping track of the 'last visited'
//we can filter out this noise.

function handleSiteVisit(details) {
  
  let currentUrl = details.url;
  currentUrl = currentUrl.replace('https://', '');
  currentUrl = currentUrl.replace('http://', '');
  // console.log(currentUrl);
  if (lastVisitedPage !== currentUrl) {
    lastVisitedPage = currentUrl;

    if (details.title === 'Read Your Veggies') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: `localStorage.setItem('readYourVeggies', '${browsingHistory}');`});
      });
      console.log('dumping history', browsingHistory);
    } else {
      browsingHistory.push(details.url);
      chrome.storage.sync.set({read_your_veggies_web_cache: browsingHistory});
    }
  }
}

chrome.history.onVisited.addListener(handleSiteVisit);