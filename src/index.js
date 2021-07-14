import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Login from './Login';
import SignUp from './SignUp';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <Login />
    <SignUp />
  </StrictMode>,
  document.getElementById('root')
);
