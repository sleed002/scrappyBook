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

//Find one single entry for a single user
User.findOnePostOneUser = paramsData => {
  const {userid, postid} = paramsData;
  return db.one(`SELECT * FROM posts
    WHERE user_id = $1 AND post_id = $2`, [userid, postid])
};

//Add an entry for a single user
User.addOnePostOneUser = (userId, postData) => {
  const {id} = userId,
        {post_time_date, post_text} = postData;
  return db.one(`INSERT INTO posts(user_id, post_time_date, post_text)
    VALUES($1, $2, $3)
    RETURNING *`, [id, post_time_date, post_text])
};

//Update an entry for a single user
User.findOnePostAndUpdate = (paramsData, postData) => {
  const {userid, postid} = paramsData,
        {post_time_date, post_text} = postData;
  return db.one(`UPDATE posts
    SET post_time_date = $1, post_text = $2
    WHERE user_id = $3 AND post_id = $4
    RETURNING *`, [post_time_date, post_text, userid, postid])
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
  const {userid, postid} = paramsData,
        {photo_url} = photoData;
  return db.one(`INSERT INTO photos(post_id, photo_url)
    VALUES($1, $2)
    RETURNING *`, [postid, photo_url])
};

//Update a single photo for a single post for a single user
User.findOnePhotoAndUpdate = (paramsData, photoData) => {
  const {postid, photoid} = paramsData,
        {photo_url} = photoData;
  return db.one(`UPDATE photos
    SET photo_url = $1
    WHERE post_id = $2 AND photo_id = $3
    RETURNING *`, [photo_url, postid, photoid])
};

//Delte a single photo for a single post for a single user


module.exports = User
