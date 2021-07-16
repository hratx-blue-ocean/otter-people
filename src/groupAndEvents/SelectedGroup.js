import React, { useState, useEffect } from 'react';
import AddEventModal from './AddEventModal';
import { Box, Center, Grid, GridItem, Button, ButtonGroup, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

//need to pass as props
const sampleGroup = { name: "Winterguard 2010", description: "The best ones.", code: '1234567891234' }

export default function SelectedGroup(props) {
  //we set group here because we are rendering the props on this screen
  //contrast with Events.js where we do not need to apply useState to the props (groupId)
  //since we don't render groupId on the screen
  //on both pages, useEffect runs every time the props change
  const [group, setGroup] = useState({ name: "", description: "", code: "" });

  useEffect(() => {
    setGroup(props.group)
  }, [props.group])

  const organizer = props.organizer.firstName + props.organizer.lastName;

  return (

    <Box maxW="90%" width="90%" height="140px" borderBottomWidth="1px" borderRadius="sm" >
      <Flex >
        <Spacer />
        <StarIcon mt="10" w={12} h={12} />
        <Spacer />
        <Box>
          <Heading mt="8">{group ? group.name : sampleGroup.name}</Heading>
          <Text align="left" fontSize="md">{group ? group.description : sampleGroup.description}</Text>
          <Text align="left" fontSize="sm">Invitation Code: {group ? group.code : sampleGroup.code}</Text>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <AddEventModal events={props.events} setEvents={props.setEvents} groupId={props.group.groupId} organizer={organizer} mt="10" mr="6" colorScheme="teal" size="lg" />
      </Flex>
    </Box>
  )
}