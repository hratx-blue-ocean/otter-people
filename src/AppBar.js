import React from 'react';
import { useColorModeValue, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function AppBar (props) {

  const mainBlue = useColorModeValue('mainBlue.light', 'mainBlue.dark');

  const logOut = () => {
    // logout function from props
    props.onClose();
  };

  return (
    <>
      <Grid
        minW='100vw'
        maxH="7vh"
        minH="7vh"
        templateColumns="repeat(12, 1fr)"
        gap={0}
        textAlign="center" fontSize="xl"
      >
        <GridItem colSpan={3} bg={mainBlue}>
          <Text fontSize="2xl" color={'text.dark'} m='0' mt='1vh'>Alumni MeetUp</Text>
        </GridItem>
        <GridItem colSpan={6} bg={mainBlue}/>
        <GridItem colSpan={3} bg={mainBlue} >
          <Link onClick={logOut} d='inline' color={'text.dark'} mr={5}>Log Out</Link>
          <ColorModeSwitcher bg={mainBlue} justifySelf="flex-end" m='1vh'/>
        </GridItem>
      </Grid>
    </>
  )
};

export default AppBar;