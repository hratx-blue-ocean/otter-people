import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <Login />
  </StrictMode>,
  document.getElementById('root')
);
