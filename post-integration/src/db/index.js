// 1) We have to connect our Client to the database (postgreSQL)
    const { Client } = require('pg');

// 2) Supply the db name * location of the db

    const client = new Client('postgres://localhost:5432/postintegration-dev');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE POST METHODS:

    //THIS FUNCTION CREATES POSTS:
        async function createPost({
            authorId, title, content, tags = []
        }) {
            try {
                const { rows: [ post ] } = await client.query(`
                    INSERT INTO posts("authorId", title, content)
                    VALUES($1,$2,$3)
                    RETURNING *;
                `, [authorId, title, content]);

                const tagList = await createTags(tags);

                /* return await addTagsToPost(post.id, tagList); */

                return post;

            } catch (error) {
                throw error;
            }
        }

    //THIS FUNCTION UPDATES POSTS
        async function updatePost(id, fields = {} ) {
            //build set string
            //use map to turn each key into a string that looks like "keyName"=$3
            const setString = Object.keys(fields).map(
                (key, index) => `"${ key }"=$${ index + 1}`).join(', ');

            if (setString.length === 0) {
                return;
            }
            
            try {
                const { rows: [post] } = await client.query(`
                    UPDATE posts
                    SET ${ setString }
                    WHERE id=${ id }
                    RETURNING *;
                `, Object.values(fields) );

                return post;
                
            } catch (error) {
                throw error;
            }
        }

    //THIS FUNCTION GETS All POSTS:
        async function getAllPosts() {
            try {
                const { rows } = await client.query(`
                    SELECT *
                    FROM posts;
                `)

                return rows;

            } catch (error) {
                throw error;
            }
        }


    //THIS FUNCTION GETS ALL POSTS BY THE ID OF THE USER:
        async function getPostsByUser(userId) {
            try {
                const { rows } = client.query(`
                    SELECT * FROM posts
                    WHERE "authorId"=${ userId };
                `);
                return rows;
            } catch (error) {
                throw error;
            }
        }


/* ----------------------------------------------------------------------------- */
//THIS IS FOR TAGS METHODS

    //This function lets us create tags
        async function createTags(tagList) {
            if (tagList.length === 0) {
                return;
            }
            
           






        }







/* ----------------------------------------------------------------------------- */
//THESE ARE THE USER METHODS:
    
    //THIS FUNCTION LETS US GET ALL OF OUR USERS
        async function getAllUsers() {
            try {
                const { rows } = await client.query(
                `SELECT id, username, name, location, active
                FROM users
                `,);

                return rows;
            } catch (error) {
                throw error;
            }
        }

    //THIS FUNCTION CREATES USERS (notice how we interpolate values)
        async function createUser({ username, password, name, location }) {
            try {
                const {rows: [ user ]} = await client.query(`
                    INSERT INTO users(username, password, name, location)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (username) DO NOTHING
                    RETURNING *;
                `, [username, password, name, location]);

                return user;
            } catch (error) {
                throw error;
            }
        }

    //THIS FUNCTION LETS US GET BOTH A USER AND THEIR POSTS:
        async function getUserById(userId) {
            try {
                const { rows: [ user ] } = await client.query(`
                    SELECT id, username, name , location, active
                    FROM users
                    WHERE id=${ userId }
                `);

                if (!user) {
                    return null;
                }

                user.posts = await getPostsByUser(userId);

                return user;

            } catch (error) {
                throw error;
            }

        }



    //THIS FUNCTION ALLOWS US TO CHANGE A USER:

        //Each key in the fields object should match a column name for our table, and each value should be the new value for it.

        //use map to turn each key into a string that looks like "keyName"=$3

        //the key name is in quotes (in case the table colum is case sensitive), and we have a parameter whose numeric value is one greater than the index of that particular key

        async function updateUser(id, fields ={}) {

            const setString = Object.keys(fields).map( (key, index) => `"${key}"=$${ index + 1 }`).join(', ')

            //if no fields return early
            if (setString.length === 0) {
                return;
            }
            try {
                const { rows: [user]} = await client.query(`
                    UPDATE users
                    SET ${ setString }
                    WHERE id=${ id }
                    RETURNING *;
                `, Object.values(fields));

                return user;
            } catch (error) {
                throw error;
            }
        }




// 3) Allows us to access the db
    module.exports = {
        client,
        getAllUsers,
        createUser,
        updateUser,
        getUserById,
        createPost,
        updatePost,
        getAllPosts,
        getPostsByUser
    }