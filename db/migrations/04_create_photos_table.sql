\c scrapbook_db

CREATE TABLE photos(
  photo_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  post_id integer REFERENCES posts(post_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  photo_url text NOT NULL
)

INSERT INTO photos(user_id, post_id, photo_url)
VALUES('1', '1', 'photo_url' ),
      ('2', '2', 'photo_url'),
      ('3', '3', 'photo_url'),
      ('4', '4', 'photo_url' );

SELECT * FROM photos;
