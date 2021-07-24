//this is the express app
const express = require("express");

//use body-parser if you want the form data to be available in req.body.
const bodyParser = require("body-parser");

const mongoose= require("mongoose");

//import the db model
const Post=require("./models/post");

const app = express();

//connect to the db whenever node starts

/* //the below one was a test database
mongoose.connect("mongodb+srv://SH:1N4pVBoakACQ8a32@cluster0.zk2yl.mongodb.net/node-angular?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to db");
});
*/

mongoose.connect("mongodb+srv://SH:1N4pVBoakACQ8a32@cluster0.zk2yl.mongodb.net/proj_db?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to db");
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//have to set CORS header, as client and server are running on different domains
app.use((req,res,next) => {
    //no matter which domain client runnning on, it should be able to access server resources
    res.setHeader("Access-Control-Allow-Origin","*");
    //add extra headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    //to allow certain HTTP verbs
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

//********************************* 

//creating posts
app.post("/api/posts", (req, res, next) => {

//new instance of the db model
  const post = new Post({
      title: req.body.title,
      tag: req.body.tag,
      content: req.body.content,
      numberofreads: 0
  });

  //method provided by mongoose
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });

});

//*********************************

//fetching posts
app.get("/api/posts", (req, res, next) => {
  
//fetching posts from db 
  Post.find().then(documents => {
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents

    });
  });
});

//***************************************

//route for personalized tab
app.get("/api/posts/personalized:tag", (req, res, next) => {
    console.log("personalized");
    //query helps find all posts with the required tag
    var query = { tag: req.params.tag };
    Post.find(query).then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });


//******************************************

//route for trending tab
app.get("/api/posts/trending", (req, res, next) => {
    console.log("trending");
    var query = { numberofreads: {$gt:3} };
    //returns only those posts where number of reads > 3
    Post.find(query).then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });

//****************************************
/*
//after hitting like, have to increase its numberofreads
app.get("/api/posts:id", (req, res, next) => {
    console.log("like called");
    console.log("object id:" + req.params.id);
  
    Post.findOneAndUpdate({_id: req.params.id}, {$inc :{numberofreads:1}}).then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });
*/
//**********************************************

//after hitting like, have to increase its numberofreads
app.post("/api/posts:id", (req, res, next) => {
    console.log("put called" + req.body.id + "---" + req.body.numberofreads);
    Post.findOneAndUpdate({_id: req.params.id}, {$inc :{numberofreads:1}}).then(result => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    });
  });




module.exports = app;



