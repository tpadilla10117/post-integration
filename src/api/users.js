/* THE PATH/ROUTER FOR THE API AT THE users endpoint */
    const express = require('express');
    const usersRouter = express.Router();
    const { requireUser } = require('./utils');
    const { getAllUsers, getUserByUsername, createUser, getUserById, updateUser} = require('../db');
    const jwt = require('jsonwebtoken');
    const { JWT_SECRET } = process.env;
    const bcrypt = require('bcrypt');

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

        const isMatch = await bcrypt.compare(password, user.password);
    
        if (isMatch === true) {
            // create token & return to user
            let token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET);
            const recoveredData = jwt.verify(token, process.env.JWT_SECRET);
            /* recoveredData; */
            res.send({ message: "Login Success!", recoveredData, token: token/* , user: user */});
        } else if (isMatch === false) {
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

//Route once a user has been logged in:
    usersRouter.get('/me', requireUser, async (req, res, next) => {
        try {
            res.send(req.user);
            console.log("Here is req.user:", req.user)
        } catch({name, message}) {
            next({name, message});
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
            }, process.env.JWT_SECRET,/*  {
                expiresIn: '1w'
            } */);

            res.send({
                message: "Thank you for Signing Up!", token
            });

        } catch ( {name, message}) {
            next( {name, message })
        }
    })

//DELETE A USER ROUTE:
    usersRouter.delete('/:userId', requireUser, async (req, res, next) => {
        try {
            const user = await getUserById(req.params.userId);

            if (user && user.id === req.user.id) {
                const updatedUser = await updateUser(user.id, { active: false });

                res.send({ user: updatedUser });
            } else {
                next(user ? {
                    name: "UnauthorizedUserError",
                    message: "You cannot delete an account that is not yours"
                } : {
                    name: "UserNotFoundError",
                    message: "That user does not exist"
                });
            }
        
        } catch ({ name, message }) {
            next({
                name:"Delete Success", message:"The User Was Deleted Successfully!"
            })
        }
    })

//RE-ACTIVATE A USER ROUTE:
    usersRouter.patch('/:userId', requireUser, async (req, res, next) => {
        try {
            const user = await getUserById(req.params.userId);

            if(user && user.id === req.user.id) {
                const activateUser = await updateUser(user.id, {active: true});

                res.send({ user: activateUser, name: "Reactivation Success!",
                message: "Your Account has been reactivated!"});
                

            } else {
                next(user ? {
                    name: "UnauthorizedUserError",
                    message: "You cannot recover an account that is not yours"
                } : {
                    name: "UserNotFound",
                    message: "That User does not exist"
                })
            }

        } catch ({name, message }) {
            next({
                name, message
            })
        }
    })

    module.exports = usersRouter;