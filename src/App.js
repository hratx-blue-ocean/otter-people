import React from 'react';
import { ChakraProvider, Box, Text, VStack, Grid, theme, } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Members from './components/members/Members.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Hello world
            </Text>
            <Members />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
