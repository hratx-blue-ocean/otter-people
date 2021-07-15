import React, { useState } from 'react';
import { Input, VStack, FormControl, FormLabel, Button, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

const url = 'http://127.0.0.1:3001';

let SignUp = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [firstName, setFirstName] = useState('Jack');
  const [lastName, setLastName] = useState('Pronske');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [profilePic, setProfilePic] = useState('');
  //remember to consider type for password (if number (pin) and conditional checks string, it wont work)
  let isInvalid = (
    (email === '' ||
      password === 0 ||
      passwordConfirm === 0 ||
      firstName === '' ||
      lastName === '' ||
      city === '' ||
      stateName === '') && (passwordConfirm !== password)
  );

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setFirstName('');
    setLastName('');
    setCity('');
    setStateName('');
  }

  let handleSignUp = (event) => {
    event.preventDefault();

    let formSubmission = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      city: city,
      stateName: stateName
    };
    axios.post(`${url}/sign`, formSubmission)
      .then((response) => {
        onClose();
        console.log('successful Sign-Up: ', response);
        props.onClose();
        clearForm();
      })
      .catch((err) => {
        console.log('Failed to Sign-Up: ', err);
        clearForm();
      })
  };

  //colors
  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");
  const sUpBtn = useColorModeValue("sUpBtn.light", 'sUpBtn.dark');

  return (
    <>
      <Button bg={sUpBtn} color={text}  onClick={onOpen}>Sign Up</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalHeader color={'text.dark'}>Sign Up!</ModalHeader>
        <ModalCloseButton />
        <ModalContent bg={mainBlue}>
          <ModalBody>
            <VStack spacing="20px">
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>First Name</FormLabel>
                <Input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Kermit"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Last Name</FormLabel>
                <Input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="The Frog"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Email</FormLabel>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="kermit@thefrog.com"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Password</FormLabel>
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  bg={layer}
                  type='password'
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Confirm Password</FormLabel>
                <Input
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm Password"
                  bg={layer}
                  type='password'
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>City</FormLabel>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Anchorage"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>State</FormLabel>
                <Input
                  value={stateName}
                  onChange={e => setStateName(e.target.value)}
                  placeholder="Alaska"
                  bg={layer}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter alignItems='center'>
            <Button bg={gBtn} color={text} ml="auto" mr="auto" onClick={handleSignUp} isDisabled={isInvalid}>Sign Up</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUp;