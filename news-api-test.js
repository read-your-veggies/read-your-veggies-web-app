const axios = require('axios');
const API_KEY = 'ac3e99c739ed4fb58c0b6be160947ad8';
const extractor = require('unfluff');

let retrieveArticles = function (urlList) {
  articleList = [];

  var parseAllArticles = () => {
    if (urlList.length > 0) {
        var currentArticleUlr = articleList.pop();
        axios.get(currentArticleUlr)
            .then( (response) => {
                let webpage = extractor(response.data);
                articleList.push(webpage.text);
            })
            .then(() => )
    }

  }


  
  urlList.forEach( (url, idx, ary) => {
    axios.get(url)
        .then( (response) => {
            let webpage = extractor(response.data);
            articleList.push(webpage.text);
            // We will also need to push the author and source, either together with the 
            // article or into a separate array.

          // If the articleList length matches the urlList length, then we are done
          // and can return and/or console log the results.
        })
  })
}


axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    .then( (response) => {
    //   console.log('news data', response.data)
      let urlList = [];
      response.data.articles.forEach( (article) => {
        urlList.push(article.url);
      })
      console.log('list of urls', urlList);
    })
    .catch( (err) => {
      console.log(err);
    });