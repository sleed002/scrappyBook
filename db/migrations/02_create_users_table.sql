\c scrapbook_db

CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username varchar(255) UNIQUE NOT NULL,
  user_nickname varchar(255),
  user_bio varchar(2000),
  user_fave_color varchar(255),
  user_avatar text NOT NULL
)

INSERT INTO users(username, user_nickname, user_bio, user_fave_color, user_avatar)
VALUES('Charlie', 'Chuck', 'I like the beach.', 'blue', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png'),
       ('Bucky', 'Buck', 'I like the zoo.', 'red', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png'),
       ('Shelly', 'Shel', 'The ocean is my favorite.', 'purple', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png'),
       ('Rihanna', 'Riri', 'I like cats.', 'pink', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png');

SELECT * FROM users;
