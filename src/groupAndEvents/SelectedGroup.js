import React, { useState, useEffect } from 'react';

import { Box, Center, Grid, GridItem, Button, ButtonGroup, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

//need to pass as props
const selectedGroup = { name: "Winterguard 2010", description: "The best ones." }

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
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Button onClick={addEvent} mt="10" mr="6" colorScheme="teal" size="lg">
          + Event
        </Button>
      </Flex>
    </Box>
  )
}