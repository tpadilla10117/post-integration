// The seed.js file is where we seed the database with meaningful info

const { client, getAllUsers, createUser } = require('./index');

/* Testing the db connection */

    async function testDB() {
        try {
            console.log("Starting to test database...");

            const { rows } = await client.query(`SELECT * FROM users;`);

            const users = await getAllUsers();
            console.log("The result of invoking getAllUsers:", users);
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

            const trin = await createUser( { username: 'trin', password: 't7711', name: 'trin P', location: 'cordelia'});
            const sandra = await createUser( { username: "sandra", password: 'glamgal', name: 'Sandy', location: 'Scranton'})

            console.log("Here is trin:", trin);
            console.log("Here is sandra:", sandra);
            console.log("Finished creating users!");
            
        } catch(error) {
            console.error("Error creating users!")
            throw error;
        }
    }

// THIS FUNCTIONS CALLS A QUERY TO DROP TABLES FROM THE DB
    async function dropTables() {
        try {
            console.log("Starting to drop tables...");

            await client.query(`
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
                    name VARCHAR(255) NOT NULL,
                    location VARCHAR(255) NOT NULL,
                    active BOOLEAN DEFAULT true
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
        } catch (error) {
            console.error("There is an error:", error);
        } 
    }

rebuildDB()
.then(testDB).catch(console.error).finally( () => client.end() );
/* testDB(); */