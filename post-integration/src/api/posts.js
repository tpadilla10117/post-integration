/* THE PATH/ROUTER FOR THE API AT THE posts endpoint */
const express = require('express');
const { requireUser } = require('./utils');
const postsRouter = express.Router();

const { getAllPosts, createPost, updatePost, getPostById } = require('../db');

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

// ROUTE TO CREATE POSTS:
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

// ROUTE TO UPDATE POSTS:
    postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
        const { postId } = req.params;
        const { title, content, tags } = req.body;
        const updateFields = {};

        if (tags && tags.length > 0) {
            updateFields.tags = tags.trim().split(/\s+/);
        }

        if (title) {
            updateFields.title = title;
        };

        if (content) {
            updateFields.content = content;
        }

        try {
            const originalPost = await getPostById(postId);

            if (originalPost.author.id === req.user.id) {
                const updatedPost = await updatePost(postId, updateFields);

                res.send( {post: updatedPost} );
            } else {
                next({
                    name:"UnauthorizedUserError",
                    message:"You Cannot Update a Post That Is Not Yours"
                })
            }

        } catch ({ name, message }) {
            next({
                name:"Update Successful",
                message: "Update Successful!"
            })
        }
    })

module.exports = postsRouter;