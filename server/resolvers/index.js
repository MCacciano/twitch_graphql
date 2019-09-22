const twitchResolvers = require('./twitch');

const rootResolver = {
  Query: {
    root: String,
    ...twitchResolvers
  }
};

module.exports = rootResolver;
