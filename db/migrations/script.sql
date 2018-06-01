CREATE TABLE users(
  user_id serial PRIMARY KEY,
  username varchar(255) UNIQUE NOT NULL,
  user_nickname varchar(255),
  user_bio varchar(2000),
  user_fave_color varchar(255),
  user_avatar text NOT NULL
);

CREATE TABLE posts(
  post_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  post_time_date VARCHAR(50) NOT NULL,
  post_text text
);

CREATE TABLE photos(
  photo_id serial PRIMARY KEY,
  post_id integer REFERENCES posts(post_id)
  ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
  photo_url text NOT NULL
);

ALTER TABLE posts ADD COLUMN post_title varchar(2000) NOT NULL;
ALTER TABLE photos ADD COLUMN photo_caption varchar(2000);
ALTER TABLE photos ADD COLUMN photo_public_id varchar(255);

INSERT INTO users(username, user_nickname, user_bio, user_fave_color, user_avatar)
VALUES('Dahlia3000', 'DeeDee', 'I love horses and ice cream', 'purple', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f9fa8a33850498.56ba69ac2cc3a.png'),
('TimmyT', 'Timmy', 'I like baseball and cars', 'green', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png'),
('CP3', 'Chris', 'I love basketball', 'orange', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/2c659933850498.56ba69ac2e080.png'),
('DizzyIzzy', 'Izzy', 'I like softball and chocolate', 'orange', 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png');

INSERT INTO posts(user_id, post_time_date, post_title, post_text)
VALUES(1, '2018-05-02 01:00:00', 'I went to the beach!', 'I went to the beach today and it was pretty fun. The water was too cold, but I got to eat ice cream after. I made a BIG sandcastle and it was the best, but then a seagull flew into it and knocked it over. I dislike like seagulls.'),
(1, '2018-05-11 17:02:03', 'Horses are the best', 'I watched the Spirit movie for the tenth time! I love that movie, I think horses are just the best. I wish I could have a horse... Maybe I will get one for Christmas?'),
(1, '2018-05-23 18:26:18', 'I saw animals at the zoo!', 'I went to the zoo today and saw lots of animals. I was very excted to see the zebras, since they are pretty much horses, which are my favorite animal. I also saw elephants, tigers, bears, monkeys, and flamingos! I want to be a zookeeper when I grow up!'),
(2, '2018-05-18 08:29:33', 'We won our baseball game!', 'Our team won the baseball game today! We played our biggest rivals, the Bad News Bears, and they were winning for the first half of the game. But then Jimmy scored a home run and we ended up winning! We got to eat pizza afterward to celebrate.'),
(2, '2018-05-25 14:49:20', 'I got an A on my book report', 'I got an A on my book report! I had to write about The Giving Tree, and the teacher said that I had the best report in the class! My parents are very happy and got me a new baseball mitt.'),
(3, '2018-05-19 17:30:29', 'I lost my basketball :(', 'Today I was playing basketball with my best friend Tommy, but when I was trying to make a shot, the ball hit the rim of the basket and bounced across the street. It ended up rolling down the street and almost hit a bunch of cars! I did not run fast enough to catch it. I was really sad about that, but then Tommy let me have his extra basketball! He is a great friend.'),
(4, '2018-05-30 8:01:43', 'My exciting life', 'Today I am going to class to work on my project. It will be great because I have a great understanding of all the material and can make all these amazing things with code. HOORAY!'),
(4, '2018-05-31 17:25:21', 'Basketball is exciting!', 'I watched the Warrios play the Caveliers, and it was a very close game, and then it went into overtime. It was very exciting to watch! GO WARRIORS!');

INSERT INTO photos(post_id, photo_url, photo_caption, photo_public_id)
VALUES(1, 'https://static1.squarespace.com/static/55ca7fbde4b00b8482023fe5/5600344fe4b0f99f3fa3c392/578dacd3579fb3d7cbe16298/1468902626850/Santa+Monica+South-22.jpg?format=750w', 'The beach',''),
(1, 'http://dreamstop.com/wp-content/uploads/2016/08/Seagull-Dream.jpg', 'The evil seagull',''),
(1, 'https://cdn-images-1.medium.com/max/612/1*WhbEgbtFv3PX8u344iyidA.png', 'My sandcastle before it got ruined', ''),
(2, 'http://images6.fanpop.com/image/photos/36300000/Spirit-X-image-spirit-x-36394829-1000-720.jpg', 'The best movie!', ''),
(3, 'http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/92135118.jpg?itok=kp7Xksl6&resize=1100x619', 'Elephant I saw', ''),
(3, 'http://animals.sandiegozoo.org/sites/default/files/2016-08/hero_zebra_animals.jpg','Zebras are striped horses',''),
(4, 'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Kids/Drills/figure-8-baseball-drill.jpg','Baseball is so fun',''),
(4, 'http://www.latimes.com/resizer/vKil-O88JeslCnR8GrxrySC2oZo=/1400x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/I26NVPGPIBDYVKWG6ZL7KDFE3A.jpg','Dream team',''),
(7, 'https://i.ytimg.com/vi/CkW8uD3ax3E/maxresdefault.jpg','My code!',''),
(8, 'https://media.giphy.com/media/7zrQ7wu4HIR3y/giphy.gif','','');
