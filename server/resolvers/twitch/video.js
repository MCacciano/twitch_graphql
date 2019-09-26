module.exports = {
	videos: async (_, __, { dataSources }) => {
		return await dataSources.twitchAPI.videos();
	},
	videoById: async (_, { id }, { dataSources }) => {
		return await dataSources.twitchAPI.videoById({ id });
	}
};
