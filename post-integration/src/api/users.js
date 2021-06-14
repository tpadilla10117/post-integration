/* THE PATH/ROUTER FOR THE API AT THE users endpoint */
    const express = require('express');
    const usersRouter = express.Router();

    const { getAllUsers, getUserByUsername } = require('../db');
    const jwt = require('jsonwebtoken');

    usersRouter.use((req, res, next) => {
        console.log("A request is being made to /users");

        /* res.send({ message: 'hello from /users!'}); */
        next();
    });

    usersRouter.get('/', async (req, res) => {
        const users = await getAllUsers();

        res.send({
            users
        });
    })

//login route:
    usersRouter.post('/login', async (req, res, next) => {
        const { username, password } = req.body;
        /* console.log(req.body); */
        if (!username || !password) {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password"
            });

            try {
                const user = await getUserByUsername(username);

                if (user && user.password == password) {

                    // create token & return to user
                let token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET);
                    /* const recoveredData = jwt.verify(token, process.env.JWT_SECRET);
                    recoveredData; */
                    res.send({ message: "Login Successful!", token: token});
                  
                } else {
                    next({
                        name: 'IncorrectCredentialsError',
                        message: 'Username or password is incorrect'
                    });
                }

            } catch (error) {
                console.log(error);
                next(error);
            }
       }
    })

    module.exports = usersRouter;