const express = require('express');
const UserRouter = express.Router();
const User = require('.././models/user')
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
var cloudinary = require('cloudinary');
require('dotenv').config();


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

//GET all the entries photo arrays for a single user
UserRouter.get("/:id/postspics", (req, res) => {
  User.findAllPostsPhotoArr(req.params)
  .then(allUserPosts => {
    res.json(allUserPosts);
  }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with getting all entries' photo arrays for single user"})
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

UserRouter.post("/:userid/posts/:postid", (req, res) => {
  if (!req.params)
  return res.status(400).send('No files were uploaded.');
  //https://www.npmjs.com/package/express-fileupload
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  if (sampleFile.name===undefined) {
    return false; //if no file is selected do not allow upload to continue
  }
  if (sampleFile.name === 'image.jpg') {
    sampleFile.name = Math.floor(Math.random() * Math.floor(1000))+ ".jpg"
  } //for pics taken on my phone's 'take photo' function, all images are called
  //'image.jpg' and so each new upload would overwrite the previous.  I decided
  //to change the file name of these to a random number so that they remain unique
  let id = req.params.userid;
  cloudinary.config({
    cloud_name: 'fotobooth',
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
  });

  mkdirp('Images/'+ id + "/", function(err) {
  }); //make a directory folder using each event ID
  // Use the mv() method to place the file in this folder
  let path = 'Images/'+ id + "/" + sampleFile.name
  sampleFile.mv(path, function(err) {
    if (err)
    return res.status(500).send(err);
  });

 cloudinary.v2.uploader.upload(path,
    {resource_type: "auto", image_metadata: true},
    function(error, result) {
      if (error) console.log(error);
      let photo_url = result.secure_url
      let photo_public_id = result.public_id
      let photoAdd = {photo_url: photo_url, photo_public_id: photo_public_id}

    User.addOnePhotoOnePost(req.params, photoAdd)
    .then(updatedUserPost => {
      res.json(updatedUserPost);
    }).catch(error => {
      console.log(error);
      res.status(500).json({message: "Issue with putting a single entry for a single user"});
    });
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
  let post_id = req.params.post_id
  User.findOnePostAndDelete(req.params)
  .then(deletedUserPost => {
    res.json(deletedUserPost)
    rimraf('Images/'+ post_id + "/", function(err) {
       if (err)
       return res.status(500).send(err);
     }, (error) => {
     res.status(400).send('400 Bad Request');
   })
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
UserRouter.get("/:userid/posts/:postid/photos/:photo_public_id", (req, res) => {
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
UserRouter.delete("/:userid/posts/:postid/photos/:photo_public_id", (req, res) => {
  console.log(req.params)
  let user_id = req.params
  let post_id = req.params
  let photo_public_id = req.params.photo_public_id;
  let photoRemove = {post_id: post_id, photo_public_id: photo_public_id}

  cloudinary.config({
  cloud_name: 'fotobooth',
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
  });
  //delete the photo from its directory and the database
  cloudinary.v2.uploader.destroy(photo_public_id, function(error, result){
      User.findOnePhotoAndDelete(photoRemove)
        .then(photoRemove=> {
          // res.json(deletedPhoto);
          res.redirect(`/:user_id/posts/:post_id`);
        //https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
         rimraf('Images/'+ post_id + "/" + photo_public_id, function(err) {
            if (err)
            return res.status(500).send(err);
         }, (error) => {
          res.status(400).send('400 Bad Request')
        })
      }).catch(error => {
    console.log(error);
    res.status(500).json({message: "Issue with deleting a single photo for single post"})
    })
  })
});

module.exports = UserRouter;
