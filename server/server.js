const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers/index');

require('dotenv').config();

const TwitchAPI = require('./datasources/twitch/twitch');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    twitchAPI: new TwitchAPI()
  })
});

server.listen().then(({ url }) => console.log(`Server ready at: ${url}`));
