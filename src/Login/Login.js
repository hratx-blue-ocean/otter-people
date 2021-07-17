import React, { useState } from 'react';
import { Image, Heading, Text, Input, VStack, FormControl, FormLabel, Button, useColorModeValue, Grid, GridItem, HStack, Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher.js';

import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import SignUp from './SignUp';

const url = 'http://127.0.0.1:3001';

function Login(props) {
  //hooks
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let isInvalid = email === '' || password === '';

  let login = (event) => {
    //submit post request to db passing in username and password
    //if valid: generate token? dashboard?
    //if username invalid: prompt to create account
    //if username valid and password invalid: prompt 'incorrect password'
    event.preventDefault();
    axios.post(`${url}/login`, { email: email, password: password })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          //successful login, update state variable with user data
          console.log('successful login');
          props.onClose();
          setEmail('');
          props.setUser(response.data);
        }
        console.log(response.data);
        setPassword('');
      })
      .catch(err => {
        console.error(err)
        setPassword('');
      });
  };

  //colors
  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");
  const bg = useColorModeValue("bg.light", "bg.dark");
  const image = useColorModeValue("https://i.imgur.com/0sLGIxD.png", "https://i.imgur.com/lYfRtx3.png")

  return (
    <Modal isOpen={props.isOpen} onClose={() => { }} closeOnEsc={false} closeOnOverlayClick={false} size='full' autoFocus={false} isCentered={true} blockScrollOnMount={true}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader height="8vh">
          <ColorModeSwitcher bg={mainBlue} justifySelf="flex-end" m='1vh' />
        </ModalHeader>
        <ModalBody>

          <Grid
            minH="100vh"
            templateColumns="repeat(7, 1fr)"
            gap={0}
            // align='center'

            justify='center'
            mt="25%"
            bg={bg}
          >

            <GridItem colSpan={1} />
            <GridItem p="2" align="left" colSpan={2} bg={bg} >
              <Grid gap={3} templateColumns="repeat(2, 1fr)" templateRows="repeat(6, 1fr)">
                <GridItem colSpan={1} rowSpan={1}>
                  <Heading size="2xl">Otter People</Heading>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1}>
                  <Image
                    boxSize="110px"
                    minWidth="120px"
                    objectFit="cover"
                    src={image}
                    alt="logo" />
                </GridItem>
                <GridItem colSpan={2} rowSpan={5}>
                  <Text fontSize="xl">Stay in touch with each otter.</Text><br />
                  <Text fontSize="lg">A place for friends to create private groups and events.</Text><br />
                  <Text fontSize="md">Invite like-minded otters and get activity recommendations tailored to your locations.</Text>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem colSpan={2} bg={bg} >
              <Box bg={mainBlue} justifySelf='center' alignSelf='center' maxWidth="400px" p='10' pt='3' borderRadius='md'>
                <VStack spacing="0" >
                  <ColorModeSwitcher bg={mainBlue} justifySelf="flex-end" alignSelf="flex-end" m='0vh' mt='1' />
                  <FormControl isRequired>
                    <FormLabel color={'text.dark'} mb="2" mt="0">Email Address</FormLabel>
                    <Input
                      mb="6"

                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="example@example.com"
                      bg={layer}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color={'text.dark'} mb="2">Password</FormLabel>
                    <Input
                      mb="9"

                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder=''
                      bg={layer}
                      type='password'
                    />
                  </FormControl>
                  <HStack spacing='10'>
                    <Button bg={gBtn} color={text} ml="auto" mr="auto" onClick={login} isDisabled={isInvalid}>
                      Login
                    </Button>
                    {/* <Text>Don't have an account yet? Sign up below!</Text> */}
                    <SignUp onClose={props.onClose} setUser={props.setUser} />
                  </HStack>
                </VStack>
              </Box>
            </GridItem>
            <GridItem colSpan={1} bg={bg} />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal >

  );
};

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





