// 1) We have to connect our Client to the database (postgreSQL)
    const { Client } = require('pg');

// 2) Supply the db name * location of the db

    const client = new Client('postgres://localhost:5432/postintegration-dev');


//4) Write helper functions to use in the app

    async function getAllUsers() {
        const { rows } = await client.query(
            `SELECT id, username
            FROM users
            `
        )

        return rows;
    }

    //This func create users (notic how we interpolate values)
    async function createUser({ username, password }) {
        try {
            const {rows} = await client.query(`
                INSERT INTO users(username, password)
                VALUES ($1, $2)
                ON CONFLICT (username) DO NOTHING
                RETURNING *;
            `, [username, password]);

            return rows;
        } catch (error) {
            throw error;
        }
    }

    /* async function createUser({ username, password }) {
        try {
            const result = await client.query(`
                INSERT INTO users(username, password)
                VALUES ($1, $2)
                ON CONFLICT (username) DO NOTHING
                RETURNING *;
            `, [username, password]);

            return result;
        } catch (error) {
            throw error;
        }
    } */




// 3) Allows us to access the db
    module.exports = {
        client,
        getAllUsers,
        createUser
    }