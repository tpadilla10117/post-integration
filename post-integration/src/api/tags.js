/* THE PATH/ROUTER FOR THE API AT THE tags endpoint */
const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
})

//ROUTE TO GET POSTS BY TAGS:
    tagsRouter.get('/:tagName/posts', async (req, res, next) => {
        // read the tagname from the params
        const { tagName } = req.params;
        try {
        const post = await getPostsByTagName(tagName);
       
        const tags = post.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
        });
        res.send({ tags });
        } catch ({ name, message }) {
        next({ name:"PostRequestError", message: "Posts Unsuccessfully Returned" });
        }
    });

module.exports = tagsRouter;