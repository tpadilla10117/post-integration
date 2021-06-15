/* THE PATH/ROUTER FOR THE API AT THE posts endpoint */
const express = require('express');
const { requireUser } = require('./utils');
const postsRouter = express.Router();

const { getAllPosts, createPost } = require('../db');

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});

postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        posts
    });
})

postsRouter.post("/", requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;

    //Spaces removed, then string into an Array
    //E.g. frontend send "#happy #bloated", tagArr has ["#happy", "#bloated"]
    const tagArr = tags.trim().split(/\s+/);
    const postData = {};

    //If there are tags, send them over
    if (tagArr.length) {
        postData.tags = tagArr;
    }

    try {
        postData.title = title;
        postData.content = content;
        postData.authorId = req.user.id;

        // this will create the post and the tags for us
        const post = await createPost(postData);
        if (post) {
          res.send({ post });
        } else {
          next();
        }

    } catch ({ name, message }) {
        next({
            name: 'MissingContentError',
            message: 'Missing Title or Content'
          });
    }
});

module.exports = postsRouter;