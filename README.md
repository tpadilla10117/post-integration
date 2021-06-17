# Project Description:

A full stack web-application / Tumblr clone in progress that implements a fully functional custom back-end (postgreSQL and a custom API).

Users Will (Can):
- Create & Update posts
- Create tags and attach them to posts
- View posts created by fellow users

### Access Backend Deploy:

### Tech Stack:
- Database: PostgreSQL
- API: Express.js (our web server that responds to client requests, and returns values from the database)
- User Interface / FrontEnd: React.js, CSS, SASS
- Authentication: jsonwebtoken, jwt-express

## Getting Started:

## Local Installations:

### `npm i jsonwebtoken` -> for jsonwebtoken
### `npm i morgan` -> for logging middleware
### `npm i express` -> for web-server
### `npm i dotenv` -> for .env
### `npm i axios` -> HTTP Client for node.js (for frontend requests)
### `npm i bcrypt` -> pw hashing

In the post-integation/post-integration directory, you can run:

### `npm start`
### `npm run seed:dev` - Starts up the psql database
### `npm run start:dev` - Starts up the Express Web-Server (API)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Directory:

├── api
│   ├── index.js
│   ├── posts.js
│   ├── tags.js
│   └── users.js
├── db
│   ├── index.js
│   └── seed.js
├── index.js
├── package-lock.json
└── package.json


## Available Scripts

### `npm run seed:dev` 

This launches the node env. for the psql backend

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
