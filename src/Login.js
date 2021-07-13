import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider, Box, Text, VStack, Grid, theme, } from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const url = 'http://127.0.0.1:3001';

function Login(props) {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let isInvalid = username === '' || password === '';

  let login = (event) => {
    //submit post request to db passing in username and password
    //if valid: generate token? dashboard?
    //if username invalid: prompt to create account 
    //if username valid and password invalid: prompt 'incorrect password'
    event.preventDefault();
    console.log('submitted')
    // axios.post(`${url}/login`, { username: username, password: password })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch(err => console.error(err))
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <div className="login-wrapper">
        <Text>Please Log In</Text>
        <form method="POST" onSubmit={login}>
          <Text>Username</Text>
          <input
            required
            type="text"
            placeholder="Email address"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Text>Password</Text>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
          <div>
            <button type="submit" disabled={isInvalid}>Submit</button>
          </div>
        </form>
      </div>
    </ChakraProvider>
  );
};
// function Login(props) {
//   return (
//     <ChakraProvider theme={theme}>
//       <Text>
//         Login screen
//       </Text>
//     </ChakraProvider>
//   );
// };

export default Login;

/*
Steps from youtube guide on auth set up - auth0

npm init
npm install express express-openid-connect dotenv
create .env in project folder
sign up and create app inside auth0 (authenticiation server for backend auth)
  - application type -> web app
Auth0 -> quick start / settings
  -allowed callback URLs: http://localhost:3000/callback
  -allowed logout URLs: http://localhost:3000
  -save

General auth0 process: redirects user over to auth0 -> authenticates user -> redirects back to app

Create base application (or add into our existing app.js to add in auth middleware)

require('dotenv').config(); //allows us in local testing to reference the environmental variables
https://github.com/auth0/express-openid-connect

const { auth } = require('express-openid-connect'); //middleware used in /profile route
app.use(
  auth({
    authRequired: false, //otherwise this would make every route require authentication which we don't want
    auth0Logout: true,
    issuerBaseURL: 'https://YOUR_DOMAIN', //domain in auth0
    issuerBaseURL: process.env.ISSUER_BASE_URL
    baseURL: 'https://localhost:3000',
    baseURL: process.env.BASE_URL,
    clientID: 'YOUR_CLIENT_ID', //client ID in auth0
    clientID: process.env.CLIENT_ID
    secret: 'EF0fTODAiDHars9MonzisaW4QKJ61wyN', //random 32 char long string, allegedly doesn't matterewhat it is
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'I\'m in' : 'REJECTED')
})

//create profile route that requires user to log in
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

const port = process.env.PORT || 3000;
app.listen(port)app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});
*/





