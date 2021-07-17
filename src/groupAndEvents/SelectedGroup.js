import React, { useState, useEffect } from 'react';
import AddEventModal from './AddEventModal';
import { useColorModeValue, Box, Text, Heading, Flex, Spacer } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons';

export default function SelectedGroup(props) {
  const [group, setGroup] = useState({ name: "", description: "", code: "" });

  useEffect(() => {
    setGroup(props.group)
  }, [props.group])

  const organizerName = props.organizer.firstName + " " + props.organizer.lastName;

  const layer = useColorModeValue('layer.light', 'layer.dark');
  const border = useColorModeValue('select.light', 'layer.dark');
  const txt = useColorModeValue('text.light', 'text.dark');

  return (
    <Box maxW="90%" width="90%" height="140px" borderWidth="1px" borderRadius="md" boxShadow="sm" bg={layer} borderColor={border} color={txt}>
      <Flex >
        <Spacer />
        <StarIcon mt="10" w={12} h={12} />
        <Spacer />
        <Box>
          <Heading mt="8">{group ? group.name : ''}</Heading>
          <Text align="left" fontSize="md">{group ? group.description : ''}</Text>
          <Text align="left" fontSize="sm">Invitation Code: {group ? group.code : ''}</Text>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <AddEventModal events={props.events} setEvents={props.setEvents} groupId={props.group.groupId} organizer={props.organizer} organizerName={organizerName} mt="10" mr="6" colorScheme="teal" size="lg" />
      </Flex>
    </Box >
  )
}