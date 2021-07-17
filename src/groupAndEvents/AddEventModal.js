import React, { useState, useEffect } from 'react';
import { useDisclosure, useColorModeValue, useColorMode } from '@chakra-ui/react';
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
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import './style.css';
import { darken } from '@chakra-ui/theme-tools';

const url = 'http://127.0.0.1:3001';

function AddEventModal(props) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');
  const [disable, setDisable] = useState(false);

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

  const clearForm = () => {
    setEventName('');
    setEventLocation('');
    setEventDate('');
    setEventDescription('');
  }

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onClose();
    let formSubmission = {
      name: eventName,
      location: eventLocation,
      date: eventDate,
      description: eventDescription,
      organizer: props.organizerName,
      groupId: props.groupId,
      attending: [Number(props.organizer.userId)]
    };
    axios.post(`${url}/event`, formSubmission)
      .then((response) => {
        console.log('successfully added event: ', response);
        onClose();
        clearForm();
        let eventsCopy = props.events.slice();
        eventsCopy.push(formSubmission);
        props.setEvents(eventsCopy);
      })
      .catch((err) => {
        console.log('Failed to add Event: ', err);
        clearForm();
      })
  }

  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");
  const hoverGreen = useColorModeValue(darken("gBtn.light", 12), darken("gBtn.dark", 12));

  useEffect(() => {
    if (!props.groupId) {
      setDisable(true);
    } else {
      setDisable(false)
    }
  });

  const isLight = useColorMode().colorMode === 'light';


  return (
    <>
      <Button onClick={onOpen} mt="10" mr="6" bg={gBtn} color={text} size="lg" isDisabled={disable} _hover={{ bg: hoverGreen }}> + Event</Button>

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
                <div className={isLight ? "light-theme" : "dark-theme"}>
                  <DatePicker
                    selected={eventDate}
                    onChange={(date) => setEventDate(date)}
                    showTimeSelect
                    isClearable
                    dateFormat="Pp"
                    className="react-datapicker__input-text"
                  />
                </div>
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
            <Button bg={gBtn} color={text} ml="auto" mr="auto" onClick={handleFormSubmission} _hover={{ bg: hoverGreen }}>
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddEventModal;