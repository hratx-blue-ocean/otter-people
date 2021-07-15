import React, { useState, useEffect } from 'react';
import { useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
// import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

function AddEventModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');

  const handleEventNameChange = (e) => {
    let eventNameValue = e.target.value;
    setEventName(eventNameValue);
  };

  const handleEventLocationChange = (e) => {
    let eventLocationValue = e.target.value;
    setEventLocation(eventLocationValue);
  };

  const handleEventDescriptionChange = (e) => {
    let eventDescriptionValue = e.target.value;
    setEventDescription(eventDescriptionValue);
  };

  const handleFormSubmission = (e) => {
    onClose()
    // handle submission

    // clear form inputs
    setEventName('');
    setEventLocation('');
    setEventDate('');
    setEventDescription('');
  }

  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");


  return (
    <>
      <Button onClick={onOpen} mt="10" mr="6" colorScheme="teal" size="lg"> + Event</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} >
        <ModalOverlay />
        <ModalContent bg={mainBlue}>
          <ModalHeader color={'text.dark'}>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px">

              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Event Name</FormLabel>
                <Input
                  value={eventName}
                  onChange={handleEventNameChange}
                  placeholder="Event Name"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Event Location</FormLabel>
                <Input
                  value={eventLocation}
                  onChange={handleEventLocationChange}
                  placeholder="Austin, TX"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Event Date</FormLabel>
                <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                showTimeSelect
                isClearable
                dateFormat="Pp"
              />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Event Description</FormLabel>
                <Textarea
                  value={eventDescription}
                  onChange={handleEventDescriptionChange}
                  placeholder="Event Description"
                  size="md"
                  height="100px"
                  resize="None"
                  bg={layer}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter alignItems="center" >
            <Button bg={gBtn} color={text} ml="auto" mr="auto" onClick={handleFormSubmission}>
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddEventModal;