
const { rebuildDB } = require('../../db/seed');

const { client, getAllUsers, createPost } = require('../../db/index');

describe('Database', () => {
/* Before anything, run this code then the tests... */
/* connect, then rebuild the database... */

    beforeAll( async () => {
        /* await client.connect(); */
        await rebuildDB();
    })

/* After the tests run, clean up... */
    afterAll( async() => {
        await client.end();
    })
  
    describe('users', () => {
        let testUser, testUser2;
        describe('getAllUsers', () => {
            beforeAll(async() => {
                testUser = await getAllUsers({ 
                    users: [ 
                        {
                        id: 1,
                        username: 'Henryfluff',
                        name: 'Henry',
                        location: 'Asgard',
                        active: true,
                        }
                    ]
                });
            })
            it('user object contains: user: [ {id, username, name, location, active} ]', async () => {
                expect(testUser).toEqual(expect.objectContaining({
                    user : [
                        {
                            id: expect.any(Number),
                            username: expect.any(String),
                            name: expect.any(String),
                            location: expect.any(String),
                            active: expect.any(Boolean),
                        }
                    ]
                
                }))
            })

        })
    })

})



