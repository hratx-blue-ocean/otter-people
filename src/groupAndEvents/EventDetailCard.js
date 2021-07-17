import React, { useState, useEffect } from 'react';
import { useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { Button, Text, VStack } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { darken } from '@chakra-ui/theme-tools';

function EventDetailCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const eventInfo = useColorModeValue("eventInfo.light", "eventInfo.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const hoverBlue = useColorModeValue(darken("mainBlue.light", 5), darken("mainBlue.dark", 8));


  return (
    <>
      <Button onClick={onOpen} mt="4" size="md" bg={mainBlue} _hover={{ bg: hoverBlue }} color={"text.dark"}>Details</Button>

      <Modal size="xl" isOpen={isOpen} isCentered={true} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg={eventInfo} color={text}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="l" align="left">Meeting Organizer: </Text> <Text fontSize="l">{props.event.organizer}</Text>
            <br />
            <Text fontSize="xl">{props.event.date}
            </Text>
            <br />
            <Text fontSize="xl">{props.event.name}</Text>
            <Text fontSize="m">{props.event.location}</Text>
            <br />
            <Text fontSize="m">{props.event.description}</Text>
          </ModalBody>

          <ModalFooter alignItems="center" >
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventDetailCard;