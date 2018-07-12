# [Read Your Veggies](https://www.read-your-veggies.com)

Welcome to Read Your Veggies, a news app to help you read outside your bubble!

<img src="./client/dist/assets/read-your-veggies-cast.gif" width="400px" height="250px">

Read Your Veggies diagnoses your political stance using five data points: where you live, where you grew up, your browsing habits, your reading habits on our site, and your responses to an onboarding questionnaire. It then serves news articles that, based on source, will likely contain an opposing political viewpoint to "digest." Users can set weekly health goals and track their reading history. They can also view personality insights into our news outlets, generated from IBM Watson's [Personality Insights](https://www.ibm.com/watson/services/personality-insights/)

## Features


## Built With

- [React](https://reactjs.org/) - Used to render the client application
- [React Router](https://www.npmjs.com/package/react-router) - Used to generate distinct views at virtual endpoints
- [ReactD3](https://www.reactd3.org/) - Used to generate dynamic charts
- [Apollo Client](https://www.apollographql.com/client/) - GraphQL client for React
- [GraphQL](https://graphql.org/) - Query schema
- [Node.js](https://nodejs.org/en/) - Server environment
- [Express](https://expressjs.com/) - Framework leveraged to create and run server
- [Axios](https://github.com/axios/axios) - Used for HTTP requests in back-end data services
- [Passport JS](http://www.passportjs.org/) - Authentication middleware
- [Passport Facebook](http://www.passportjs.org/docs/facebook/) - Configuration used with Passport to authenticate with Facebook
- [Mongoose](http://mongoosejs.com/) - Used to configure and query MongoDB database
- [IBM Watson Personality Insights](https://www.ibm.com/watson/services/personality-insights/) - Used to generate personality profiles of news sources.
- [AWS Lambda](https://aws.amazon.com/lambda/) - Runs two data services and cron jobs

## Development

### Running the Development App

From within the root directory:

```sh
npm install
npm run react-dev
npm run server-dev
```

Create a .env file with the following variables:
FACEBOOK_APP_ID = ''
FACEBOOK_APP_SECRET = ''
CALLBACK_URL = '' // Facebook
USERS_DATABASE_PATH = ''
ARTICLES_DATABASE_PATH = ''
SOURCES_DATABASE_PATH = ''

### Roadmap

- **Client**: The front end is rendered in React with redirects handled by React Router.
- **Authentication**: Passport JS is used for Facebook OAuth. See `server/facebookAuth.js`.
- **Server**: NodeJS and ExpressJS handle server-side routing and incoming client requests in `server/index.js`
- **Querying**: Client queries the server with Apollo Client, and queries are handled server-side with GraphQL. See `db/graphql.js`, `db/resolvers.js` and `db/typeDefs.js`.
- **Database**: MongoDB is used to persist data on articles, sources, and users in three separate respective databases. See `db/schemas.js` for the schemas used.
- **Data Services**: Two separate services (repos included within this organization) are used to scrape and store articles and generate personality insights from IBM Watson.

### Deployment

We used [AWS EC2](https://aws.amazon.com/ec2/) to deploy this code.

To deploy your own version:
- Set up MongoDB instances - we used [mLab](https://mlab.com/)
- Set up data services (repos included in this organization) - we used [AWS Lambda](https://aws.amazon.com/lambda/)
- Configure the .env files (you will need API keys for News API and Watson)

## Authors

- __Phil Gonzalez__: [p-gonzo](www.github.com/p-gonzo)
- __Ian Schmidt__: [ianschmidt83](www.github.com/ianschmidt83)
- __Scott McCreary__: [scottmccreary](www.github.com/scottmccreary)

## License

This project is licensed under the MIT License.
