const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers.js');
typeDefs = require('./typeDefs.js');

const getGraphQlSchema = async () => {
  try {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    return schema;

  } catch (e) {
    console.error(e);
  }
}

module.exports = { getGraphQlSchema }