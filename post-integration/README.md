### Notes:
- iat = Issued At -> refers to when a token was issued


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
- 
    