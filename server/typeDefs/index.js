const root = require('./root');

const twitchSchemas = require('./twitch/index');

const schemaArray = [root, ...twitchSchemas];

module.exports = schemaArray;
