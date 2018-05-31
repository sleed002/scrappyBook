\c scrapbook_db

INSERT INTO users(username, user_nickname, user_bio, user_fave_color, user_avatar)
VALUES('alicek', 'Alice', 'I love plantain chips', 'pink', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png'),
('ilikewarmhugs', 'Olaf', 'I like warm hugs', 'white', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png'),
('pandamonium', 'Panda', 'I love naps and bamboo', 'green', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png');

SELECT * FROM users;



INSERT INTO posts(user_id, post_time_date, post_title, post_text)
VALUES(1, '2018-01-01 00:00:00', 'This is what I did today!', 'Today I went to Trader Joes and bought some plantain chips. It was great!'),
(1, '2018-02-11 00:00:00', 'I love movies!', 'I watched a wonderful movie today and it was amazing! I look forward to the sequel!'),
(2, '2018-03-03 00:00:00', 'My magical adventure', 'Today was Elsas coronation. Hurrah!');

SELECT * FROM posts;



INSERT INTO photos(post_id, photo_url, photo_caption, photo_public_id)
VALUES(1, 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', 'Sleeping is great','id'),
(1, 'https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif', 'This is my caption!','id1'),
(2, 'https://media.giphy.com/media/EatwJZRUIv41G/giphy.gif', 'yay caption!', 'placeholder_id'),
(3, 'https://media.giphy.com/media/cOmKweWa4w0XS/giphy.gif', 'I like warm hugs', 'yay_placeholder_id'),
(3, 'https://media.giphy.com/media/tIqKXKcVwmhmU/giphy.gif','Snowman','plcrats');

SELECT * FROM photos;
