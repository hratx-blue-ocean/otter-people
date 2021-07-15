import React from 'react';
import { useColorModeValue, Center, Box, Image, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function AppBar(props) {

  const mainBlue = useColorModeValue('mainBlue.light', 'mainBlue.dark');
  const image = useColorModeValue("https://i.imgur.com/bQzhE4k.png", "https://i.imgur.com/Nc36aGv.png")

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
        <GridItem colSpan={1} bg={mainBlue}>
          <Center >
            <Image mt="1" src={image} maxWidth="16" />
          </Center>
        </GridItem>
        <GridItem colSpan={2} bg={mainBlue}>

          <Text align="left" fontSize="2xl" color={'text.dark'} m='0' mt='1vh'>Otter People</Text>
        </GridItem>
        <GridItem colSpan={6} bg={mainBlue} />
        <GridItem colSpan={3} bg={mainBlue} >
          <Link onClick={logOut} d='inline' color={'text.dark'} mr={5}>Log Out</Link>
          <ColorModeSwitcher bg={mainBlue} justifySelf="flex-end" m='1vh' />
        </GridItem>
      </Grid>
    </>
  )
};

export default AppBar;