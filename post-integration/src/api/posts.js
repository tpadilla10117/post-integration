/* THE PATH/ROUTER FOR THE API AT THE posts endpoint */
const express = require('express');
const { requireUser } = require('./utils');
const postsRouter = express.Router();

const { getAllPosts } = require('../db');

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
    res.send({ message: 'Under Construction'});
})

module.exports = postsRouter;