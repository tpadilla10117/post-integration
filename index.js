//THIS IS WHERE I LAUNCH THE express.js web server:
    // Requiring the .env
    require('dotenv').config();
    const bodyParser = require('body-parser');
    const morgan = require('morgan');

    /* const {PORT = 3000, INTEGRATION_KEY} = process.env; */
    const express = require('express');
    const server = express();

    /* Import cors library: */
    const cors = require("cors");

    server.use(
        cors(/* {
            origin: "http://localhost:3001",
        } */)
    )

//THIS IS WHERE I CONNECT THE CLIENT (database):
    const { client } = require('./src/db');
  
      // connect to the server
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, async () => {
        console.log(`Server is running on ${ PORT }!`);

        try {
            await client.connect();
            console.log('Database is open for business!');
        } catch (error) {
            console.error("Database is closed for repairs!\n", error);
        }
        });

/* ----------------------------------------------------------------------- */
/* MiddleWare: */

    //bodyParser.json() reads incoming JSON from reqs:
    
    server.use(bodyParser.json());

    //morgan('dev') logs out incoming reqs:
    server.use(morgan('dev'));

    //Server passes in:
        //the request object (built from the client's request)
        //the response object (which has methods to build and send back a response)
        //the next function, which will move forward to the next matching middleware
    server.use((req, res, next) => {
        console.log("<____Body Logger START____>");
        console.log(req.body);
        console.log("<_____Body Logger END_____>");
    
        next();
    });

/* THIS IS WHERE I BRING IN THE apiRouter */
const apiRouter = require('./src/api');
server.use('/api', apiRouter);

module.exports = {
    server};