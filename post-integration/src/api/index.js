/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    const express = require('express');
    const apiRouter = express.Router();

    const usersRouter = require('./users');
    apiRouter.use('/users', usersRouter);

    module.exports = apiRouter;