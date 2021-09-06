
const { dropTables, createTables,createInitialUsers,createInitialPosts } = require('../../db/seed');

const { client, getAllUsers, createUser, createPost, getAllTags, createPostTag, getUserByUsername, getAllPosts } = require('../../db/index');

describe('Database', () => {
/* Before anything, run this code then the tests... */
/* connect, then rebuild the database... */

    let tagsInDatabase;
    
   beforeAll( async () => { 
       
         client.connect();
        
            await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialPosts();

        const { rows } = await client.query(`
                    SELECT * FROM tags;
                `);
                tagsInDatabase = { rows };
    

     });

/* After the tests run, clean up... */
    afterAll( async() => {
        client.end();
    });
    describe('tags', () => {
        describe('getAllTags', () => {
            it('Selects and returns an array of tags', async () => {
                expect(await getAllTags()).toEqual(tagsInDatabase);
            });
    
            it('Returns an object', async () => {
                expect(typeof tagsInDatabase).toBe('object');
            });
        });

        let testCreatePostTag;
        describe('createPostTag', () => {
            beforeAll(async() => {
                testCreatePostTag = await createPostTag(
                    {
                        "postId": 1,
                        "tagId": 1
                    }
                )
            })

            it("Returns an object", async() => {
                expect(typeof testCreatePostTag).toBe('object');
            });
        })



    })
    
  
    describe('users', () => {
        let testUser;
        
        describe('getAllUsers', () => {
            beforeAll(async() => {
                testUser = await getAllUsers( 
                    /* [ 
                        {
                        id: 1,
                        username: 'Henryfluff',
                        name: 'Henry',
                        location: 'Asgard',
                        active: true,
                        }
                    ] */
                );
            })

            it('Returns an object', async () => {
                expect(typeof testUser).toBe('object');
            });

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
            });

        });

        let testCreateUser;
        
        describe('createUser', () => {
            beforeAll(async() => {
                
            //Data mocked to pass into the function call:
                testCreateUser = await createUser(
                    
                        {
                            username: "Boo",
                            password: 'xoxoxohj!',
                            name: 'Guy',
                            location: "Fairland"
                        }
                    
                )
                
            })


            it('Returns an object', async () => {
                expect(typeof testCreateUser).toBe('object');
            });

            it('Inserts some user data & create a user in the db', async () => {
                expect(testCreateUser).toEqual(expect.objectContaining(
                    
                        {
                            username: expect.any(String),
                            password: expect.any(String),
                            name: expect.any(String),
                            location: expect.any(String),
                        }
                    
                ))
            });
            it('Inserts the user into the db', async () => {
                const insertedUser = testCreateUser;
                console.log('insertedUser:', insertedUser);

                //Also will query the db
                const { rows: [queriedUser]} = await client.query(`
                    SELECT * FROM users
                    WHERE username=$1
                `, [testCreateUser.username]);
                
                expect(insertedUser).toEqual(queriedUser);


            });
        })

        let testGetUserByUsername;
        let username = "trin";
        describe('getUserByUsername', () => {
            beforeAll(async() => {
                
            //Data mocked to pass into the function call:
                testGetUserByUsername = await getUserByUsername(username);
                console.log("Here is trin's user info:", testGetUserByUsername)
            });

            it('Returns an object', async () => {
                expect(typeof testGetUserByUsername).toBe('object');
            });

            it("Returns an Object with the passed in user's info", async() => {
                expect(testGetUserByUsername).toEqual(expect.objectContaining(
                    {
                        id: testGetUserByUsername.id,
                        active: testGetUserByUsername.active,
                        location: testGetUserByUsername.location,
                        name: testGetUserByUsername.name,
                        username: testGetUserByUsername.username,
                        password: testGetUserByUsername.password,

                    }
                ))
            })

            

        });

        
    });

    describe('posts', () => {
        let testAllPosts;
        describe('getAllPosts', () => {
            beforeAll(async() => {
                testAllPosts = await getAllPosts( 
                     
                       /*  {
                        id: 1,
                        title: 'Henryfluff',
                        content: 'Henry',
                        active: true,
                        tags: [ '#cool' ],
                        author: {
                            id: 1,
                            username: 'Henry',
                            name: 'somename',
                            location: 'some location'
                        }
                        } */
                    
                );
            });
            
            it('Returns an object', async () => {
                expect(typeof testAllPosts).toBe('object');
            });

            it('posts object contains: posts: [ {id, title, content, active, tags, author} ]', async () => {
                expect(testAllPosts).toEqual(expect.objectContaining(
                    [
                        {
                            id: expect.any(Number),
                            title: expect.any(String),
                            content: expect.any(String),
                            active: expect.any(Boolean),
                            tags: expect.arrayContaining([
                                    expect.objectContaining({
                                        id: expect.any(Number),
                                        name: expect.any(String)
                                    })
                                ]),
                            author: expect.objectContaining({
                                id: expect.any(Number),
                                username: expect.any(String),
                                name: expect.any(String),
                                location: expect.any(String)
                            }
                            )
                            
                        }
                    ]
                
                ))
            });

        });

        
           /*  describe('createPost', () => {
                let testCreatePosts;
                beforeAll(async() => {
                    testCreatePosts = await createPost({

                        authorId: 3,
                        title: "This is a test",
                        content: "Some testing info",
                        tags: []

                    })
                })

                it("Returns nobject", async() => {
                    expect(typeof testCreatePosts).toBe('object');
                });
            }) */

    });


});



