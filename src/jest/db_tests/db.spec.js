
const { rebuildDB, dropTables, createTables,createInitialUsers,createInitialPosts } = require('../../db/seed');

/* const http = require('http');
const port = 4000;

const testServer = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
})

testServer.listen(port, () => {
    console.log(`Server running at ${port}`)
}) */

/* const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    res.send("Got it working")
})

app.listen(8080, () => console.log("Listening on port 8080")) */

const { client, getAllUsers, createPost } = require('../../db/index');


describe('Database', () => {
/* Before anything, run this code then the tests... */
/* connect, then rebuild the database... */

   beforeAll( async () => { 
        /* await client.connect(); */
        /* await rebuildDB(); */
     /*    await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialPosts(); */
     })

/* After the tests run, clean up... */
    afterAll( async() => {
        await client.end();
    })
  
    describe('users', () => {
        let testUser, testUser2;
        describe('getAllUsers', () => {
            beforeAll(async() => {
                testUser = await getAllUsers( 
                    [ 
                        {
                        id: 1,
                        username: 'Henryfluff',
                        name: 'Henry',
                        location: 'Asgard',
                        active: true,
                        }
                    ]
                );
            })
            it('user object contains: users: [ {id, username, name, location, active} ]', async () => {
                expect(testUser).toEqual(expect.arrayContaining(
                    [
                        {
                            id: expect.any(Number),
                            username: expect.any(String),
                            name: expect.any(String),
                            location: expect.any(String),
                            active: expect.any(Boolean),
                        }
                    ]
                
                ))
            })

        })
    })

});



