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