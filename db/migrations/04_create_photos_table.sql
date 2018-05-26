\c scrapbook_db

CREATE TABLE photos(
  photo_id serial PRIMARY KEY,
  -- user_id integer REFERENCES users(user_id)
  -- ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  post_id integer REFERENCES posts(post_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  photo_url text NOT NULL
)
