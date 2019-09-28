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

  async videos() {
    const { user_id, headers } = this;

    try {
      const videos = await this.get(`/videos`, { user_id }, { headers });

      return Array.isArray(videos.data)
        ? videos.data.map(video => videoReducer(video))
        : [];
    } catch (err) {
      console.error(err);
    }
  }

  // * technically you can request multiple videos by ID but this has been setup to only use
  // * one video ID and return that first and only video from the response array
  async videoById({ id = '' }) {
    const video = await this.get(`/videos`, { id }, { headers: this.headers });

    try {
      return Array.isArray(video.data) ? videoReducer(video.data[0]) : [];
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = TwitchAPI;
