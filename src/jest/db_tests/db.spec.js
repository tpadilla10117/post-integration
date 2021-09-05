
const { rebuildDB, dropTables, createTables,createInitialUsers,createInitialPosts } = require('../../db/seed');

const { client, getAllUsers, createPost, getAllTags,getUserByUsername, getAllPosts } = require('../../db/index');


describe('Database', () => {
/* Before anything, run this code then the tests... */
/* connect, then rebuild the database... */

    /* let usersInDatabase; */
    let tagsInDatabase;
   beforeAll( async () => { 
       
         client.connect();
        
            await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialPosts();
        
        /* const { rows } = await client.query(`SELECT id, username, name, location, active
        FROM users`)
        usersInDatabase = rows; */

        const { rows } = await client.query(`
                    SELECT * FROM tags;
                `);
                tagsInDatabase = { rows };

        


     });

/* After the tests run, clean up... */
    afterAll( async() => {
        client.end();
    });

    describe('getAllTags', () => {
        it('Selects and returns an array of tags', async () => {
            expect(await getAllTags()).toEqual(tagsInDatabase);
        })
    })


  
    describe('users', () => {
        let testUser;
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
                expect(testUser).toEqual(expect.objectContaining(
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
    /* describe('posts', () => {
        let testAllPosts;
        describe('getAllPosts', () => {
            beforeAll(async() => {
                testAllPosts = await getAllPosts( 
                    [ 
                        {
                        id: 1,
                        title: 'Henryfluff',
                        content: 'Henry',
                        active: true,
                        tags: [ {} ],
                        author: {
                            id: 1,
                            username: 'Henry',
                            name: 'somename',
                            location: 'some location'
                        }
                        }
                    ]
                );
            })
            it('posts object contains: posts: [ {id, title, content, active, tags, author} ]', async () => {
                expect(testAllPosts).toEqual(expect.objectContaining(
                    [
                        {
                            id: expect.any(Number),
                            title: expect.any(String),
                            content: expect.any(String),
                            active: expect.any(Boolean),
                            
                        }
                    ]
                
                ))
            })

        })
    }) */

});



