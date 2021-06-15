/* THE PATH/ROUTER FOR THE API AT THE users endpoint */
    const express = require('express');
    const usersRouter = express.Router();

    const { getAllUsers, getUserByUsername, createUser } = require('../db');
    const jwt = require('jsonwebtoken');
    const { JWT_SECRET } = process.env;

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
    usersRouter.get('/', async (req, res) => {
        const users = await getAllUsers();
    
        res.send({
        users
        });
    });

    usersRouter.post('/login', async (req, res, next) => {
        const { username, password } = req.body;
    
        // request must have both a username and pw
        if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a valid username and password"
        });
        }
    
        try {
        const user = await getUserByUsername(username);
    
        if (user && user.password == password) {
            // create token & return to user
            let token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET);
            /* const recoveredData = jwt.verify(token, process.env.JWT_SECRET);
            recoveredData; */
            res.send({ message: "Login Success!", token: token});
        } else {
            next({ 
            name: 'IncorrectCredentialsError', 
            message: 'Username or password is incorrect'
            });
        }
        } catch(error) {
        console.log(error);
        next(error);
        }
    });

//Register Route:
    usersRouter.post('/register', async (req, res, next) => {
        const { username, password, name, location } = req.body;

        try {
            const _user = await getUserByUsername(username);

            if(_user) {
                next( {
                    name: 'UserExistsError',
                    message: 'A user by that username already exists'
                });
            }

            const user = await createUser({
                username,
                password,
                name,
                location
            });

            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: "Thank you for Signing Up!", token
            });

        } catch ( {name, message}) {
            next( {name, message })
        }
    })

    module.exports = usersRouter;