const { RESTDataSource } = require('apollo-datasource-rest');

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
      const res = await this.get(`/videos`, { user_id }, { headers });

      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = TwitchAPI;
