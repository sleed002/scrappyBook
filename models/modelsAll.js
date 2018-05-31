const db = require('.././db/config'),
      All = {}; //use object to attach all our query methods


//Find all entries for a ALL users
// All.findAllPostsAllUsers = userId => {
//   const {id} = userId;
//   return db.query(`SELECT * FROM posts`, id)
// };
All.findAllPostsAllUsers = userId => {
  const {id} = userId;
  // return db.query(`SELECT posts.post_id, users.user_id, post_text, post_title, array_agg(distinct photo_url) as photoarr, username, user_nickname, user_bio, user_fave_color, user_avatar
  return db.query(`SELECT posts.post_id, users.user_id, post_text, post_title, array_remove(array_agg(distinct photo_url), NULL) as photoarr, username, user_nickname, user_bio, user_fave_color, user_avatar
    FROM posts
    LEFT JOIN photos ON posts.post_id = photos.post_id
    JOIN users ON posts.user_id = users.user_id
    GROUP BY 1,2,3,4,6,7,8,9,10`, id)
};

//Find all photos for ALL posts and users
//Will return corresponding post & user info
All.findAllPhotosAllPosts = paramsData => {
  const {userid, postid} = paramsData;
  return db.query(`SELECT * from photos
    JOIN posts
    ON photos.post_id=posts.post_id
    JOIN users
    ON posts.user_id = users.user_id`, [postid, userid])
};

module.exports = All;
