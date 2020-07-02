const express = require('express');
const AllRouter = express.Router();
const All = require('.././models/modelsAll')


//GET all the entries for ALL users
AllRouter.get("/posts", (req, res) => {
  All.findAllPostsAllUsers(req.params)
  .then(allUsersPosts => {
    res.json(allUsersPosts);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting all entries for all users"})
  })
})
//GET all the photos for ALL posts and users
AllRouter.get("/photos", (req, res) => {
  All.findAllPhotosAllPosts(req.params)
  .then(allPhotosAllPosts => {
    res.json(allPhotosAllPosts);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting all photos for all posts and users"})
  })
})


module.exports = AllRouter;
