/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    const express = require('express');
    const apiRouter = express.Router();

    const jwt = require('jsonwebtoken');
    const { getUserById } = require('../db');
    const { JWT_SECRET } = process.env


    // For Requests...
    apiRouter.use(async (req, res, next) => {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
        
        // if no Authorization header...
        if (!auth) {
        next();
        } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
    
        try {
            // read the token & attempt decrypt:
            const { id } = jwt.verify(token, JWT_SECRET);
    
            if (id) {
            req.user = await getUserById(id);
            next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
        } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
        }
    });

// Where the Routers get attached:

    const usersRouter = require('./users');
    apiRouter.use('/users', usersRouter);

    const postsRouter = require('./posts');
    apiRouter.use('/posts', postsRouter);

    const tagsRouter = require('./tags');
    apiRouter.use('/tags', tagsRouter);


// Error Handler -> errors come out as JSON:
    apiRouter.use( (error, req, res, next) => {
        res.send(error);
    })


    module.exports = apiRouter;