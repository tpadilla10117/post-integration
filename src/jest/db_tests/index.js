/* const express = require('express');

const server = express();
const { client } = require('../../db/index');

const PORT = process.env.PORT || 8000;
        server.listen(PORT, async () => {
        console.log(`Server is running on ${ PORT }!`);

        try {
            await client.connect();
            console.log('Database is open for business!');
        } catch (error) {
            console.error("Database is closed for repairs!\n", error);
        }
        }); */