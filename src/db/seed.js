// The seed.js file is where we seed the database with meaningful info

const { client, getAllUsers, createUser, updateUser, getUserById, createPost, updatePost, getAllPosts, getPostsByUser, createTags, addTagsToPost, getPostById, getAllTags, getPostsByTagName } = require('./index');

/* Testing the db connection */

    async function testDB() {
        try {
            console.log("Starting to test database...");

            console.log("Calling getAllUsers");
            const users = await getAllUsers();
            console.log("The result of invoking getAllUsers:", users);

            console.log("Calling updateUser on users[0]")
             const updateUserResult = await updateUser(users[0].id, {
                name: "Newname Sogood",
                location: "Lesterville, KY"
            });
            console.log("Result of updateUserResult:", updateUserResult);

            console.log("Calling getAllPosts");
            const posts = await getAllPosts();
            console.log("Result of getAllPosts:", posts);

            console.log("Calling updatePost on posts[0]");
            const updatePostResult = await updatePost(posts[0].id, {
              title: "New Title",
              content: "Updated Content"
            });
            console.log("Result of updatePost:", updatePostResult);

            console.log("Calling updatePost on posts[0], only updating tags");
            const updatePostTagsResult = await updatePost(posts[0].id, {
              tags: ["#youcandoanything", "#redfish", "#bluefish"]
            });
            console.log("Result of updating posttags:", updatePostTagsResult);

            console.log("Calling getPostById");
            const post = await getPostById(1);
            console.log("Result of get getPostById:", post);

            console.log("Calling getUserById with 1");
            const trin = await getUserById(1);
            console.log("Result of getUserById:", trin);

            console.log("Calling getPostsByUser:");
            const postsByUser = await getPostsByUser(1);
            console.log("Result of getPostsByUser:", postsByUser);

            console.log("Calling getAllTags");
            const tags = await getAllTags();
            console.log("Result of getAllTags:", tags);

            console.log("Calling getPostsByTagName with #redfish");
            const postsWithHappy = await getPostsByTagName("#redfish");
            console.log("Result:", postsWithHappy);

            console.log("Finished database tests!");
        } catch (error) {
            console.error("Error testing database!");
            throw error;
        }
    }

/* ---------------------------------------------------------------------------- */


// THIS FUNCTION SEEDS DB WITH NEW INITIAL USERS
    async function createInitialUsers() {
        try {
            console.log("Starting to create users...");
            
            await createUser( { 
                username: 'trin', password: 't7711', name: 'trin P', location: 'cordelia'});
            await createUser( { 
                username: "sandra", password: 'glamgal', name: 'Sandy', location: 'Scranton'})
            await createUser( {
                username: "albert", password: "bertie99", name: "Albert", location: "Jalisco"
            })

            console.log("Finished creating users!");
            
        } catch(error) {
            console.error("Error creating users!")
            throw error;
        }
    }

//THIS FUNCTION SEEDS DB WITH INITIAL POSTS:
    async function createInitialPosts() {
        try {
            const [trin, sandra] = await getAllUsers();
            console.log("Starting to create posts...")

            await createPost({
                authorId: trin.id,
                title: "My First Post",
                content: "This is my first post.  Fun stuff!",
                tags: ["#happy"]
            });

            await createPost({
                authorId: sandra.id,
                title: "How does this work?",
                content: "I hope I'm actually writing something here...",
                tags: ["#ihatelife"]
            })

            console.log("Finished creating posts!")

        } catch (error) {
            console.log("Error creating posts!");
            throw error;
        }
    }

// THIS FUNCTION CREATES INITIAL TAGS ON A POST:
    async function createInitialTags() {
        try {
            console.log("Starting to create tags...");
            const [happy, sad, inspiration, spiderman] = await createTags([
                '#happyjoy',
                '#ihatelife',
                '#punchthefaceofgawd',
                '#doeswhateveraspidercan'
            ])

            const [ postOne, postTwo ] = await getAllPosts();

            await addTagsToPost(postOne.id, [inspiration, spiderman]);
            await addTagsToPost(postTwo.id, [happy, sad]);

            console.log("Finished creating tags!");
        } catch (error) {
            console.log("Error creating tags!");
            throw error;
        }
    }

// THIS FUNCTIONS CALLS A QUERY TO DROP TABLES FROM THE DB
    async function dropTables() {
        try {
            console.log("Starting to drop tables...");

            await client.query(`
                DROP TABLE IF EXISTS post_tags;
                DROP TABLE IF EXISTS tags;
                DROP TABLE IF EXISTS posts;
                DROP TABLE IF EXISTS users;
            `);
            console.log("Finished dropping tables!");
        } catch(error) {
            console.error("Error dropping tables!");
            throw error;
        }
    }


//THIS FUNCTION CALLS A QUERY TO CREATE TABLES FOR OUR DB
    async function createTables() {
        try {
            console.log("Starting to build tables...");

            await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    username varchar(255) UNIQUE NOT NULL,
                    password varchar(255) NOT NULL,
                    name varchar(255) NOT NULL,
                    location varchar(255) NOT NULL,
                    active boolean DEFAULT true
                );
                CREATE TABLE posts (
                    id SERIAL PRIMARY KEY,
                    "authorId" INTEGER REFERENCES users(id),
                    title varchar(255) NOT NULL,
                    content TEXT NOT NULL,
                    active BOOLEAN DEFAULT true
                );
                CREATE TABLE tags (
                    id SERIAL PRIMARY KEY,
                    name varchar(255) UNIQUE NOT NULL
                );
                CREATE TABLE post_tags (
                    "postId" INTEGER REFERENCES posts(id),
                    "tagId" INTEGER REFERENCES tags(id),
                    UNIQUE ("postId","tagId")
                );
            `);
            console.log("Finished building tables!");
        } catch (error) {
            console.error("Error building tables!");
            throw error;
        }
    }

//THIS FUNCTION INVOLKES THE HELPER FUNCTIONS AND REBUILDS THE DB
    async function rebuildDB() {
        try {
            client.connect();

            await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialPosts();
            /* await createInitialTags(); */

        } catch (error) {
            console.error("Error during rebuildDB");
            throw error;
        } 
    }

rebuildDB()
.then(testDB).catch(console.error).finally( () => client.end() );

module.exports = {
    rebuildDB,
}
