/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    const express = require('express');
    const apiRouter = express.Router();

    const jwt = require('jsonwebtoken');
    const { getUserById } = require('../db');
    const { JWT_SECRET } = process.env

    const usersRouter = require('./users');
    apiRouter.use('/users', usersRouter);

    const postsRouter = require('./posts');
    apiRouter.use('/posts', postsRouter);

    const tagsRouter = require('./tags');
    apiRouter.use('/tags', tagsRouter);












    module.exports = apiRouter;