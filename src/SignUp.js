import React, { useState } from 'react';
import { ChakraProvider, Text, theme, } from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const url = 'http://127.0.0.1:3001';

let SignUp = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const [passwordConfirm, setPasswordConfirm] = useState(0);
  const [firstName, setFirstName] = useState('Michael');
  const [lastName, setLastName] = useState('Palmer');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
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
        console.log('successful Sign-Up: ', response);
      })
      .catch((err) => {
        console.log('Failed to Sign-Up: ', err)
      })
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <div className="login-wrapper">
        <Text>Sign up below!</Text>
        <form onSubmit={handleSignUp}>

          <Text>First Name</Text>
          <input
            required
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Text>Last Name</Text>
          <input
            required
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <Text>Email</Text>
          <input
            required
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Text>Password</Text>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
          <Text>Confirm Password</Text>
          <input
            required
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            autoComplete="off"
          />
          <Text>City</Text>
          <input
            required
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            autoComplete="off"
          />
          <Text>State</Text>
          <input
            required
            type="text"
            onChange={(e) => setStateName(e.target.value)}
            value={stateName}
            autoComplete="off"
          />
          <div>
            <button type="submit" >Submit</button>
          </div>
        </form>
      </div>
    </ChakraProvider>
  );
}

export default SignUp;