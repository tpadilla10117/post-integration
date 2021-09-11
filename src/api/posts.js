/* THE PATH/ROUTER FOR THE API AT THE posts endpoint */
const express = require('express');
const { requireUser, requireActiveUser } = require('./utils');
const postsRouter = express.Router();

const { getAllPosts, createPost, updatePost, getPostById } = require('../db');

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});

//ROUTE FOR GETTING ALL POSTS:
    postsRouter.get('/', async (req, res, next) => {
        try {
            const allPosts = await getAllPosts();

            const posts = allPosts.filter(post => {
                if (!post.active) {
                    return
                } 
                return post.active || (req.user && post.author.id === req.user.id);
            })

            res.send({
                posts
            });

        } catch ({ name, message}) {
            next({name, message})
        }
    });

// ROUTE TO CREATE POSTS:
   postsRouter.post("/", requireUser,requireActiveUser, async (req, res, next) => {
        const user = req.user;
        const {title, content, tags = "" } = req.body;
       
        //Spaces removed from fromt/back with trim(), then string into an Array with split
        //E.g. frontend send "#happy #bloated", tagArr has ["#happy", "#bloated"]
        const tagArr = tags.trim().split(/\s+/);

        const postData = {title, content, tags};
        const author = [user.id, user.username, user.name, user.location]
        //If there are tags, send them over
        if (tagArr.length) {
            postData.tags = tagArr;
        }
        console.log("Here is my req.body:", req.body)
        console.log("Here is my postData:", postData);
        console.log("Here is my author info:", author)
        try {
           /*  postData.title = title;
            postData.content = content; */
            postData.authorId = user.id;  //may not work because no user id
            postData.author = author
            
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
    postsRouter.patch('/:postId', requireUser, requireActiveUser, async (req, res, next) => {
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

//ROUTE TO DELETE POSTS:
    postsRouter.delete('/:postId', requireUser, requireActiveUser, async (req, res, next) => {
        try {
            const post = await getPostById(req.params.postId);

            if (post && post.author.id === req.user.id) {
                const updatedPost = await updatePost(post.id, { active: false });

                res.send({ post: updatedPost });
            } else {
                next(post ? {
                    name: "UnauthorizedUserError",
                    message: "You cannot delete a post that is not yours"
                } : {
                    name: "PostNotFoundError",
                    message: "That post does not exist"
                });
            }
        
        } catch ({ name, message }) {
            next({
                name:"Delete Success", message:"The Post Was Deleted Successfully!"
            })
        }
    })

module.exports = postsRouter;