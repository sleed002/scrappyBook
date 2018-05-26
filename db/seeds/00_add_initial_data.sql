\c scrapbook_db

INSERT INTO users(username, user_nickname, user_bio, user_fave_color, user_avatar)
VALUES('alicek', 'Alice', 'I love plantain chips', 'pink', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png'),
('ilikewarmhugs', 'Olaf', 'I like warm hugs', 'white', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png'),
('pandamonium', 'Panda', 'I love naps and bamboo', 'green', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png');

SELECT * FROM users;



INSERT INTO posts(user_id, post_time_date, post_text)
VALUES(1, '2018-01-01 00:00:00', 'Today I went to Trader Joes and bought some plantain chips. It was great!'),
(1, '2018-02-11 00:00:00', 'I watched a wonderful movie today and it was amazing! I look forward to the sequel!'),
(2, '2018-03-03 00:00:00', 'Today was Elsas coronation. Hurrah!');

SELECT * FROM posts;





INSERT INTO photos(post_id, photo_url)
VALUES(1, 'https://www.worldsbestcatlitter.com/clearing-the-air/wp-content/uploads/2016/11/cat-sleeping-habits-blog-858x429.jpg'),
(1, 'https://vetstreet.brightspotcdn.com/dims4/default/c4867fc/2147483647/thumbnail/590x420/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F66%2Fad%2Faec07b9a42419a66ffe7cbac9051%2Fcat-sleeping-on-couch-thinkstockphotos-491761762-590.jpg'),
(2, 'https://lumiere-a.akamaihd.net/v1/images/191a0ea89f78d30cbc7acc07cb17d996372458c6.jpeg?region=0%2C0%2C450%2C450'),
(2, 'https://family.disney.com/wp-content/uploads/2014/07/build-a-snowman-printablex420.jpg'),
(3, 'https://www.telegraph.co.uk/content/dam/news/2016/08/23/106598324PandawaveNEWS_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg?imwidth=450');

SELECT * FROM photos;
