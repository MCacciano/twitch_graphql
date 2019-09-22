const { gql } = require('apollo-server');

const VideoType = gql`
  type Video {
    id: String
    user_id: String
    user_name: String
    title: String
    description: String
    created_at: String
    published_at: String
    url: String
    thumbnail_url: String
    viewable: String
    view_count: Int
    language: String
    type: String
    duration: String
  }

  extend type Query {
    videos: [Video]
  }
`;

module.exports = VideoType;
