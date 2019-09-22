const videoReducer = ({
  id,
  user_id,
  user_name,
  title,
  description,
  created_at,
  published_at,
  url,
  thumbnail_url,
  viewable,
  view_count,
  language,
  type,
  duration
}) => ({
  id,
  user_id,
  user_name,
  title,
  description,
  created_at,
  published_at,
  url,
  thumbnail_url,
  viewable,
  view_count,
  language,
  type,
  duration
});

module.exports = {
  videoReducer
};
