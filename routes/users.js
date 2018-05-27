const express = require('express');
const UserRouter = express.Router();
const User = require('.././models/user')

//GET all the users
UserRouter.get("/", (req, res) => {
  User.find().then(users => {
    res.json(users);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with the users get route"});
  });
});

//GET a single user
UserRouter.get("/:id", (req, res) => {
  User.findById(req.params)
  .then(user => {
    res.json(user);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with the users get by id"});
  });
});

//POST a single user
UserRouter.post("/", (req, res) => {
  User.save(req.body)
  .then(newUser => {
    res.json(newUser);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with posting a single user"});
  });
});

//PUT a single user
UserRouter.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params, req.body)
  .then(updatedUser => {
    res.json(updatedUser);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with putting a single user"});
  });
});

//DELETE a single user
UserRouter.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params)
  .then(removedUser => {
    res.json(removedUser);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with deleting a single user"});
  });
});

//GET all the entries for a single user
UserRouter.get("/:id/posts", (req, res) => {
  User.findAllPostsOneUser(req.params)
  .then(allUserPosts => {
    res.json(allUserPosts);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting all entries for single user"})
  })
})

//GET a single entry for a single user
UserRouter.get("/:userid/posts/:postid", (req, res) => {
  User.findOnePostOneUser(req.params)
  .then(oneUserPost => {
    res.json(oneUserPost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting single entry for single user"});
  });
});

//POST a single entry for a single user
UserRouter.post("/:id/posts", (req, res) => {
  User.addOnePostOneUser(req.params, req.body)
  .then(newUserPost => {
    res.json(newUserPost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with posting a single entry for a single user"});
  });
});

//PUT a single entry for a single user
UserRouter.put("/:userid/posts/:postid", (req, res) => {
  User.findOnePostAndUpdate(req.params, req.body)
  .then(updatedUserPost => {
    res.json(updatedUserPost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with putting a single entry for a single user"});
  });
});

//DELETE a single entry for a single user
UserRouter.delete("/:userid/posts/:postid", (req, res) => {
  User.findOnePostAndDelete(req.params)
  .then(deletedUserPost => {
    res.json(deletedUserPost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with deleting a single entry for a single user"});
  });
});

//GET all the photos for a single post from a single user
UserRouter.get("/:userid/posts/:postid/photos", (req, res) => {
  User.findAllPhotosOnePost(req.params)
  .then(allPhotosOnePost => {
    res.json(allPhotosOnePost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting all photos for single post"})
  })
})

//GET a single photo for a single post from a single user
UserRouter.get("/:userid/posts/:postid/photos/:photoid", (req, res) => {
  User.findOnePhotoOnePost(req.params)
  .then(onePhotoOnePost => {
    res.json(onePhotoOnePost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting a single photo for single post"})
  })
})

//POST a single photo for a single post from a single user
UserRouter.post("/:userid/posts/:postid/photos", (req, res) => {
  User.addOnePhotoOnePost(req.params, req.body)
  .then(newPhotoOnePost => {
    res.json(newPhotoOnePost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with posting a single photo for single post"})
  })
})

//PUT a single photo for a single post from a single user
UserRouter.put("/:userid/posts/:postid/photos/:photoid", (req, res) => {
  User.findOnePhotoAndUpdate(req.params, req.body)
  .then(updatedPhotoOnePost => {
    res.json(updatedPhotoOnePost);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with putting a single photo for single post"})
  })
})

//DELETE a single photo for a single post from a single user
UserRouter.delete("/:userid/posts/:postid/photos/:photoid", (req, res) => {
  User.findOnePhotoAndDelete(req.params)
  .then(deletedPhoto => {
    res.json(deletedPhoto);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with deleting a single photo for single post"})
  })
})

module.exports = UserRouter;
