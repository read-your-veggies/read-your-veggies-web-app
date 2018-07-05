// const expect = require('chai').expect;
// const mongoose = require('mongoose');
// const schemas = require('../db/schemas');
// //const watson = require('../db/watson.js');
// const testDatabasePath = process.env.TEST_DATABASE_PATH || 'mongodb://localhost/testDatabase';

// describe('watson', () => {
//   before(done => {
//     mongoose.connect(testDatabasePath);
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection to test database error'));
//     db.once('open', function() {
//       console.log('Connected to test database for Watson test');
//       done();
//     });
//   });

//   // after(() => {
//   //   db.close();
//   // })

//   describe('sourcesDb', () => {
//     beforeEach(done => {
//       schemas.Article.remove({})
//       .then(() => {
//         schemas.Source.remove({})
//         .then(() => {
//           done();
//         })
//         .catch(err => {
//           done(err);
//         })  
//       })
//       .catch(err => {
//         done(err);
//       });
//     });

//     let articleList = [
//       {
//         url: 'https://www.huffingtonpost.com/entry/the-war-on-women-is-already-here_us_5b351c5de4b0b5e692f5dce5',
//         articleStance: -1,
//         source: 'The Huffington Post',
//         title: 'Huffington Post Article 1',
//         fullText: 'This is the full text of Huffington Post Article 1',
//       },
//       {
//         url: 'https://www.huffingtonpost.com/entry/huffpost-hate-mail_us_5b366d29e4b007aa2f7fb127',
//         articleStance: -1,
//         source: 'The Huffington Post',
//         title: 'Huffington Post Article 2',
//         fullText: 'This is the full text of Huffington Post Article 2',
//       },
//       { 
//         url: 'https://www.bloomberg.com/news/articles/2018-06-30/trump-asks-saudi-arabia-to-boost-oil-output-to-offset-high-price',
//         articleStance: -0.5,
//         source: 'Bloomberg',
//         title: 'Bloomberg Article 1',
//         fullText: 'This is the full text of Bloomberg Article 1',
//       },
//     ];
  
//     it('updates sources from articles', done => {
//       schemas.Article.create(articleList)
//       .then(() => {
//         schemas.Source.find({})
//         .then(response => {
//           console.log('response is', response);
//           expect(response.length).to.equal(2);
//           response.forEach(source => {
//             expect(source).to.include.all.keys('name', 'articles', 'titles', 'fullTexts', 'titlesPersonality', 'fullTextsPersonality');
//           })
//           done();
//         })
//         .catch(err => {
//           done(err);
//         })
//       })
//       .catch(err => {
//         done(err);
//       })
//     }) 

//   })

  
// })