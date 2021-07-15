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

function EventDetailCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");
  //props.event


  return (
    <>
      <Button onClick={onOpen} mt="4" colorScheme="teal" size="md">Details</Button>

      <Modal size="xl" isOpen={isOpen} isCentered={true} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg="#3EBABE">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="l" align="left">Meeting Organizer: </Text> <Text fontSize="l">Jack P.</Text>
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