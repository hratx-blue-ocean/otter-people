import React from 'react';
import { ChakraProvider, Box, VStack, Grid, extendTheme, GridItem, useColorModeValue } from '@chakra-ui/react';
import GroupList from './Groups/GroupList';
import AppBar from './AppBar.js';
import Recs from './recs/Recs.js'
import Members from './members/Members.js';
import SelectedGroup from './groupAndEvents/SelectedGroup.js';
import Events from './groupAndEvents/Events.js';

const theme = extendTheme({
  colors: {
    bg: {
      light: "#f3f4f1",
      dark: "#2b2b2a",
    },
    layer: {
      light: "#fffbfb",
      dark: "#444242"
    },
    select: {
      light: "#ebe4e4",
      dark: "#545252"
    },
    gBtn: {
      light: "#76c893",
      dark: "#76c893"
    },
    sUpBtn: {
      light: "#52b69a",
      dark: "#57c2a4"
    },
    eventInfo: {
      light: "#3ebabe",
      dark: "#247679"
    },
    mainBlue: {
      light: "#168aad",
      dark: "#3f9ab5"
    },
    blueText: {
      light: "#2a4365",
      dark: "#cce1ff"
    },
    text: {
      light: "#201f1f",
      dark: "#f2ebeb"
    }
  }
});


function App() {

  const bg = useColorModeValue("red.500", "green.200");

  return (
    <ChakraProvider theme={theme}>
      <AppBar />
      <Box  textAlign="center" fontSize="xl">
        <Grid  minH="92vh" p={3} templateColumns="repeat(12, 1fr)" >
          <GridItem colSpan={2} >
            <VStack spacing={8}>
              <GroupList />
            </VStack>
          </GridItem>
          <GridItem colSpan={7} >
            <VStack spacing={8}>
              <SelectedGroup />
              <Events />
            </VStack>
          </GridItem>
          <GridItem colSpan={3} >
            <VStack spacing={8}>
              <Members />
              <Recs />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
