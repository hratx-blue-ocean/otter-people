import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, extendTheme, GridItem, useDisclosure } from '@chakra-ui/react';
import GroupList from './Groups/GroupList';
import AppBar from './AppBar.js';
import Recs from './recs/Recs.js'
import Members from './members/Members.js';
import SelectedGroup from './groupAndEvents/SelectedGroup.js';
import Events from './groupAndEvents/Events.js';
import Login from './Login/Login.js';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        bg: props.colorMode === "light" ? "#f3f4f1" : "#2b2b2a",
      }
    })
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
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
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [userData, setUserData] = useState({});
  const [currentGroup, setCurrentGroup] = useState();
  const [events, setEvents] = useState();


  return (
    <ChakraProvider theme={theme}>
      <AppBar onClose={onOpen} setEvents={setEvents} setCurrentGroup={setCurrentGroup} setUserData={setUserData} />
      <Box textAlign="center" fontSize="xl" >
        <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} setUser={setUserData} />
        <Grid minH="92vh" p={3} templateColumns="repeat(12, 1fr)" >
          <GridItem colSpan={2} >
            <VStack spacing={8} >
              <GroupList userEmail={userData.email} userId={userData.userId} city={userData.city} setCurrentGroup={setCurrentGroup} />
            </VStack>
          </GridItem>
          <GridItem colSpan={7} >
            <VStack spacing={8} >
              <SelectedGroup events={events} setEvents={setEvents} organizer={userData} group={currentGroup ? currentGroup : {}} />
              <Events events={events} setEvents={setEvents} groupId={currentGroup ? currentGroup.groupId : -1} organizer={userData} />
            </VStack>
          </GridItem>
          <GridItem colSpan={3} >
            <VStack spacing={8} >
              <Members currentGroup={currentGroup} />
              <Recs cities={currentGroup ? currentGroup.cities : ""} />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
