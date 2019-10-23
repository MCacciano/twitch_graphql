const { RESTDataSource } = require('apollo-datasource-rest');
const { videoReducer } = require('./reducers');

class TwitchAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = `https://api.twitch.tv/helix`;
		// ! enter streamers' user_id to get streamer specific data
		this.user_id = '63801297';
		// ! no auth without twitch Client ID - this will come from twitch after registering a new app
		this.headers = {
			'Client-ID': process.env.TWITCH_CLIENT_ID
		};
	}

	$get(url = '') {
		const { user_id, headers } = this;
		return this.get(url, { user_id }, { headers });
	}

	async videos() {
		const videos = await this.$get(`/videos`);
		return Array.isArray(videos.data) ? videos.data.map(video => videoReducer(video)) : [];
	}
}

module.exports = TwitchAPI;
