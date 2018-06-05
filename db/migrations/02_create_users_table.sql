

CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username varchar(255) UNIQUE NOT NULL,
  user_nickname varchar(255),
  user_bio varchar(2000),
  user_fave_color varchar(255),
  user_avatar text NOT NULL
)
