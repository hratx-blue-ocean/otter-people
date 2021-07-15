import React, { useState, useEffect } from 'react';
import AddEventModal from './AddEventModal';
import { Box, Center, Grid, GridItem, Button, ButtonGroup, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

//need to pass as props
const selectedGroup = { name: "Winterguard 2010", description: "The best ones.", code: '1234567891234'}

export default function SelectedGroup(props) {

  const addEvent = () => {
    //need to create drawer
  }

  return (
    <Box maxW="90%" width="90%" height="140px" borderBottomWidth="1px" borderRadius="sm" >
      <Flex >
        <Spacer />
        <StarIcon mt="10" w={12} h={12} />
        <Spacer />
        <Box>
          <Heading mt="8">{selectedGroup.name}</Heading>
          <Text align="left" fontSize="md">{selectedGroup.description}</Text>
          <Text align="left" fontSize="sm">Invitation Code: {selectedGroup.code}</Text>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <AddEventModal mt="10" mr="6" colorScheme="teal" size="lg" />
      </Flex>
    </Box>
  )
}