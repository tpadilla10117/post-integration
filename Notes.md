### Notes:
- iat = Issued At -> refers to when a token was issued
- Original Frontend script: "start": "react-scripts start"

## jsonwebtoken:
- Eg. const token = jwt.sign({ id: 3, username: 'joshua' }, 'server secret', { expiresIn: '1h' }); // allows you to forve users to reauthenticate

## Frontend Requests:
- e.g. fetch('our api url', {
  method: 'SOME_METHOD',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer HOLYMOLEYTHISTOKENISHUGE'
  },
  body: JSON.stringify({})
})

- Authorization -> needs a token passed in
- Content-Type -> bodyParser middleware reads off what we need from the user

    ### Testing:
    - Run `npm run start:dev` in one terminal, then in another try:
        - curl http://localhost:3000
        - curl http://localhost:3000/api
        - curl http://localhost:3000/api -H 'Authorization: Bearer xyz'
        - curl http://localhost:3000/api -H 'Authorization: The Bears xyz'
        - curl http://localhost:3000/api/posts

## Heroku Deploy:
- In terminal : `heroku login`
- For Deploys: 
- git config --global user.name `Your Name`
- git config --global user.email `your_email@real_email.edu`
- git config --global credential.helper cache --timeout=3600
- `heroku create`
- To check whether a remote named heroku has been set for your app: `git remote -v`
- `git remote origin heroku`
- `git push heroku master`
- Configure your API KEY -> `heroku config:set WEATHER_KEY="YOUR KEY HERE"`

## Heroku Troubleshooting:

- To Locate your db on heroku: `heroku pg:info`
- To check if your db has been provisioned: `heroku addons`
- To provision a postgresql db with CLI command: `heroku addons:create heroku-postgresql:<PLAN_NAME>`
- To check the logs of the heroku app: `heroku logs --tail`

- To authenticate user -> `psql --host=ec2-54-225-228-142.compute-1.amazonaws.com --port=5432 --username=jqxxvdahzcxrkm --password --dbname=dcmf2ik878d53q`