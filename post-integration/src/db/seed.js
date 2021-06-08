// The seed.js file is where we seed the database with meaningful info

const { client, getAllUsers } = require('./index');

// 4) Test the db connection

    async function testDB() {
        try {
            client.connect();

            const { rows } = await client.query(`SELECT * FROM users;`);

            const users = await getAllUsers();
            console.log("The result of querying the db rows for users:", users);
            
        } catch (error) {
            console.error(error);
        } finally {
            //We close the client connection
            client.end();
        }
    }

testDB();