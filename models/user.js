const db = require('.././db/config'),
      User = {}; //use object to attach all our query methods

// Find all the users
User.find = () => {
  return db.query(`SELECT * FROM users`)
};

//Find a single user
User.findById = userId => {
  const {id} = userId
  return db.one(`SELECT * FROM users
    WHERE user_id = $1`, id)
};

//Add a single user
User.save = userData => {
const {username, user_nickname, user_bio, user_fave_color, user_avatar} = userData;
return db.one(`INSERT INTO users(username, user_nickname, user_bio, user_fave_color, user_avatar)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`, [username, user_nickname, user_bio, user_fave_color, user_avatar])
};

//Update a single user
User.findByIdAndUpdate = (userId, userData) => {
  const {id} = userId,
        {username, user_nickname, user_bio, user_fave_color, user_avatar} = userData;
  return db.one(`UPDATE users
    SET username = $1, user_nickname = $2, user_bio =$3, user_fave_color = $4, user_avatar = $5
    WHERE user_id = $6
    RETURNING *`, [username, user_nickname, user_bio, user_fave_color, user_avatar, id])
};

//Delete a single user
User.findByIdAndRemove = userId => {
  const {id} = userId;
  return db.one(`DELETE FROM users
    WHERE user_id = $1
    RETURNING *`, id)
};


//Find all entries for a single user
User.findAllPostsOneUser = userId => {
  const {id} = userId;
  return db.query(`SELECT * FROM posts
    WHERE user_id = $1`, id)
};

//Find all photos (& places in array) for all entries for a single user
//Putting values in array: https://stackoverflow.com/a/37818971
User.findAllPostsPhotoArr = userId => {
  const {id} = userId;
  return db.query(`SELECT posts.post_id, users.user_id, array_agg(distinct photo_url) as photoarr
    FROM posts
    JOIN photos ON posts.post_id = photos.post_id
    JOIN users ON posts.user_id = users.user_id
    WHERE users.user_id = $1
    GROUP BY 1,2`, id)
};

//Find one single entry for a single user
User.findOnePostOneUser = paramsData => {
  const {userid, postid} = paramsData;
  return db.one(`SELECT * FROM posts
    WHERE user_id = $1 AND post_id = $2`, [userid, postid])
};

//Add an entry for a single user
User.addOnePostOneUser = (userId, postData) => {
  const {id} = userId,
        {post_title, post_time_date, post_text} = postData;
  return db.one(`INSERT INTO posts(user_id, post_title, post_time_date, post_text)
    VALUES($1, $2, $3, $4)
    RETURNING *`, [id, post_title, post_time_date, post_text])
};

//Update an entry for a single user
User.findOnePostAndUpdate = (paramsData, postData) => {
  const {userid, postid} = paramsData,
        {post_title, post_time_date, post_text} = postData;
  return db.one(`UPDATE posts
    SET post_title = $1, post_time_date = $2, post_text = $3
    WHERE user_id = $4 AND post_id = $5
    RETURNING *`, [post_title, post_time_date, post_text, userid, postid])
};

//Delete an entry for a single user
User.findOnePostAndDelete = paramsData => {
  const {userid, postid} = paramsData;
  return db.one(`DELETE FROM posts
    WHERE user_id = $1 AND post_id = $2
    RETURNING *`, [userid, postid])
};

//Find all photos for a single post for a single user
//Will return corresponding post & user info
User.findAllPhotosOnePost = paramsData => {
  const {userid, postid} = paramsData;
  return db.query(`SELECT * from photos
    JOIN posts
    ON photos.post_id=posts.post_id
    JOIN users
    ON posts.user_id = users.user_id
    WHERE photos.post_id = $1
    AND users.user_id = $2`, [postid, userid])
};

//Find one single photo for a single post for a single user
//Will return corresponding post & user info
User.findOnePhotoOnePost = paramsData => {
  const {userid, postid, photoid} = paramsData;
  return db.one(`SELECT * from photos
    JOIN posts
    ON photos.post_id=posts.post_id
    JOIN users
    ON posts.user_id = users.user_id
    WHERE photos.photo_id = $1
    AND posts.post_id = $2
    AND users.user_id = $3`, [photoid, postid, userid])
}

//Add a single photo for a single post for a single user
User.addOnePhotoOnePost = (paramsData, photoData) => {
  console.log(paramsData)
  const {postid} = paramsData,
        {photo_url, photo_public_id, photo_caption} = photoData;
  return db.one(`INSERT INTO photos(post_id, photo_url, photo_public_id, photo_caption)
    VALUES($1, $2, $3, $4)
    RETURNING *`, [postid, photo_url, photo_public_id, photo_caption])
};

//Update a single photo for a single post for a single user
User.findOnePhotoAndUpdate = (paramsData, photoData) => {
  const {postid, photoid} = paramsData,
        {photo_url, photo_caption, photo_public_id} = photoData;
  return db.one(`UPDATE photos
    SET photo_url = $1, photo_caption = $2, photo_public_id = $3
    WHERE post_id = $4 AND photo_id = $5
    RETURNING *`, [photo_url, photo_caption, photo_public_id, postid, photoid])
};

//Delete a single photo for a single post for a single user
User.findOnePhotoAndDelete = paramsData => {
  const {postid, photoid} = paramsData;
  return db.one(`DELETE FROM photos
    WHERE post_id = $1 AND photo_id = $2
    RETURNING *`, [postid, photoid])
};

module.exports = User
