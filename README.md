# Project Description:

A full stack web-application / Tumblr clone in progress that implements a fully functional custom back-end (postgreSQL and a custom API).

Users Will (Can):
- Create & Update posts
- Create tags and attach them to posts
- View posts created by fellow users

### Access Backend Deploy: https://murmuring-garden-99126.herokuapp.com/api/users

## User-Accessible Endpoints:
- https://murmuring-garden-99126.herokuapp.com/api/users
- https://murmuring-garden-99126.herokuapp.com/api/posts

### Tech Stack:
- Database: PostgreSQL
- API: Express.js (our web server that responds to client requests, and returns values from the database)
- User Interface / FrontEnd: React.js, CSS, SASS
- Authentication: jsonwebtoken, jwt-express
- Package Managers: npm

## Getting Started Locally:

Local Installations:

### `npm i jsonwebtoken` -> for jsonwebtoken
### `npm i morgan` -> for logging middleware
### `npm i express` -> for web-server
### `npm i dotenv` -> for .env
### `npm i axios` -> HTTP Client for node.js (for frontend requests)
### `npm i bcrypt` -> pw hashing
### `npm i nodemon`

In the post-integation/post-integration directory, you can run:

### `npm start` - Starts up the express web-server
### `npm run seed:dev` - Starts up the dev psql database
### `npm run start:dev` - Starts up the dev Express Web-Server (API)
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `db:build` - Seeds the database

## Directory:

  ├── node_modules  
  ├── public
  ├── src
  │   ├── api
  │   │   ├── index.js
  │   │   ├── posts.js
  │   │   ├── tags.js
  │   │   ├── users.js
  │   │   ├── utils.js
  │   │   └── xutils.js
  │   ├── db
  │   │   ├── index.js
  │   │   └── seed.js
  │   ├── frontend
  │   │   ├── feature
  │   │   ├── App.js
  │   │   └── index.js
  ├── env
  ├── .gitignore
  ├── index.js
  ├── Notes.md
  ├── package-lock.json
  ├── package.json
  └── README.md

## Available Scripts

### `npm start`
### `npm run seed:dev` - Starts up the psql database
### `npm run start:dev` - Starts up the Express Web-Server (API)

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

______________________________________________________________________________

Developer: Trinidad Padilla: https://github.com/tpadilla10117
