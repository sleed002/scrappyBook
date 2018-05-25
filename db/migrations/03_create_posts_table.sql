\c scrapbook_db

CREATE TABLE posts(
  post_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  post_time_date TIMESTAMP() NOT NULL,
  post_text text
)

INSERT INTO posts(user_id, post_time_date, post_text)
VALUES('1', '2018-05-17 03:33:33', 'I am going to get ice-cream at the zoo.' ),
      ('2', '2018-05-18 02:22:22', 'I am going to the park to play on the swings.'),
      ('3', '2018-05-19 01:11:11', 'I am going to 7-11 for an icee!' ),
      ('4', '2018-05-20 12:12:12', 'Look at my doggy, he is doing tricks.' );

SELECT * FROM posts;
