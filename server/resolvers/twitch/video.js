module.exports = {
  videos: async (_, __, { dataSources }) => {
    return await dataSources.twitchAPI.videos();
  }
};
