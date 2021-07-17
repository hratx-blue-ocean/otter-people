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
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let isInvalid = email === '' || password === '';

  let login = (event) => {
    event.preventDefault();
    axios.post(`${url}/login`, { email: email, password: password })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
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





