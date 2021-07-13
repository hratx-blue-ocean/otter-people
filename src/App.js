import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, VStack, Grid, theme, } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import axios from 'axios';
import GroupList from './Groups/GroupList';

function App() {

  // const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const userId = 1234;


  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>
              Hello world
            </Text>
            <GroupList userId={userId} setCurrentGroup={setCurrentGroup} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
