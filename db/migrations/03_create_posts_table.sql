\c scrapbook_db

CREATE TABLE posts(
  post_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  post_time_date VARCHAR(50) NOT NULL,
  post_text text
)
