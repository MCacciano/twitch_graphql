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

	async asyncGet(url = '', params = {}, { noUserId = false }) {
		const { user_id, headers } = this;

		if (url.length === 0) {
			console.error('Please enter a url');
			return;
		}

		if (noUserId === false) {
			params = {
				...params,
				user_id
			};
		}

		console.log(params);

		try {
			const res = await this.get(url, params, { headers });
			return res;
		} catch (err) {
			console.error(err);
		}
	}

	async videos() {
		const videos = await this.asyncGet(`/videos`);
		return Array.isArray(videos.data) ? videos.data.map(video => videoReducer(video)) : [];
	}

	// * technically you can request multiple videos by ID but this has been setup to only use
	// * one video ID and return that first and only video from the response array
	async videoById({ id = '' }) {
		const video = await this.asyncGet(`/videos`, { id }, { noUserId: true });

		console.log(video);

		return Array.isArray(video.data) ? videoReducer(video.data[0]) : [];
	}
}

module.exports = TwitchAPI;
