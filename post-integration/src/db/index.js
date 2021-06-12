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

                return await addTagsToPost(post.id, tagList);

                /* return post; */

            } catch (error) {
                throw error;
            }
        }

    //THIS FUNCTION UPDATES POSTS
        async function updatePost(postId, fields = {}) {

            const { tags } = fields;
            delete fields.tags;

            //build set string
            //use map to turn each key into a string that looks like "keyName"=$3
            const setString = Object.keys(fields).map(
                (key, index) => `"${ key }"=$${ index + 1}`).join(', ');
            
            try {
                /* const { rows: [post] } = */ 
                if (setString.length > 0) {
                    
                    await client.query(`
                    UPDATE posts
                    SET ${ setString }
                    WHERE id=${ postId }
                    RETURNING *;
                `, Object.values(fields) );
                }

                //return early if there are no tags to update
                if (tags === undefined) {
                    return await getPostById(postId);
                }

                //make new tags if desired
                const tagList = await createTags(tags);
                const tagListIdString = tagList.map(tag => `${ tag.id }`).join(', ');

                //delete any post_tags from db that are not in that tagList
                await client.query(`
                    DELETE FROM post_tags
                    WHERE "tagId"
                    NOT IN (${ tagListIdString})
                    AND "postId"=$1;
                `, [postId])

                //and create post_tags as desired
                await addTagsToPost(postId, tagList);

                return await getPostById(postId);

                /* return post; */
                
            } catch (error) {
                throw error;
            }
        }

    //THIS FUNCTION GETS All POSTS:
        async function getAllPosts() {
            try {
                const { rows: postIds } = await client.query(`
                    SELECT id
                    FROM posts;
                `);

                const posts = await Promise.all(postIds.map(post => getPostById(post.id)));

                return posts;

            } catch (error) {
                throw error;
            }
        }


    //THIS FUNCTION GETS ALL POSTS BY THE ID OF THE USER:

        async function getPostsByUser(userId) {
            try {
              const { rows: postIds } = await client.query(`
                SELECT id 
                FROM posts 
                WHERE "authorId"=${ userId };
              `);
          
              const posts = await Promise.all(postIds.map(
                post => getPostById( post.id )
              ));
          
              return posts;
            } catch (error) {
              throw error;
            }
          }

    //This FUNCTION GETS ALL POSTS WITH A PARTICULAR TAG:
        async function getPostsByTagName(tagName) {
            try {
                const { rows: postIds } = await client.query(`
                    SELECT posts.id
                    FROM posts
                    JOIN post_tags ON posts.id=post_tags."postId"
                    JOIN tags ON tags.id=post_tags."tagId"
                    WHERE tags.name=$1;
                `, [tagName]);

                return await Promise.all(postIds.map( post => getPostById(post.id)));


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
            
            // Need a string: $1), ($2), ($3
            const insertStringValues = tagList.map(
                (_, index) => `$${index + 1}`
              ).join('), (');
           
            // need something like $1, $2, $3
            const selectStringValues = tagList.map(
                (_, index) => `$${index + 1}`
              ).join(', ');

            try {
                //insert tag values into db
                await client.query(`
                    INSERT INTO tags(name)
                    VALUES (${insertStringValues})
                    ON CONFLICT (name) DO NOTHING;
                `, tagList);

                //select all tags and return
                const { rows } = await client.query(`
                    SELECT * FROM tags
                    WHERE name
                    IN (${selectStringValues})
                `, tagList);

                return rows;

            } catch (error) {
                throw error;
            }

        }

    // This function lets us create tags on a Post:
        async function createPostTag(postId, tagId) {
            try {
                await client.query(`
                    INSERT INTO post_tags("postId","tagId")
                    VALUES ($1, $2)
                    ON CONFLICT ("postId", "tagId") DO NOTHING;
                `, [postId, tagId]);
            } catch (error) {
                throw error;
            }
        }

    // This is used to await promises from createPostTag, and add tags to a post:
        async function addTagsToPost(postId, tagList) {
            try {
                const createPostTagPromises = tagList.map(tag => createPostTag(postId, tag.id) );

                //outputs an array
                await Promise.all(createPostTagPromises);

                return await getPostById(postId);

            } catch (error) {
                throw error;
            }
        }

    // This func lets us get posts by the postId:
        async function getPostById(postId) {
            try {
                //First grab the post iteself -
                const { rows: [ post ] } = await client.query(`
                    SELECT * FROM posts
                    WHERE id=$1;
                `, [postId]);
                

                //Then get the post's tags -
                const { rows: tags } = await client.query(`
                    SELECT tags.*
                    FROM tags
                    JOIN post_tags ON tags.id=post_tags."tagId"
                    WHERE post_tags."postId"=$1;
                `, [postId]);

                //Lastly, add the tags and author to post & remove authorId -
                const { rows: [author] } = await client.query(`
                    SELECT id, username, name, location
                    FROM users
                    WHERE id=$1;
                `, [post.authorId])

                post.tags = tags;
                post.author = author;

                delete post.authorId;

                return post;

            } catch (error) {
                throw error;
            }
        }

    // This function lets us get all tags
        async function getAllTags() {
            try {
                const { rows } = await client.query(`
                    SELECT * FROM tags;
                `);

                return { rows };
            } catch (error) {
                throw error;
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
                    SELECT id, username, name, location, active
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
        getPostsByUser,
        createTags,
        createPostTag,
        addTagsToPost,
        getPostById,
        getAllTags,
        getPostsByTagName
    }