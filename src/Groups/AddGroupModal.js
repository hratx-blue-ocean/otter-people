import React, { useState } from 'react';
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
import { darken } from '@chakra-ui/theme-tools';

function AddGroupModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupPhoto, setGroupPhoto] = useState('');

  const handleGroupNameChange = (e) => {
    let groupNameValue = e.target.value;
    setGroupName(groupNameValue);
  };

  const handleGroupDescriptionChange = (e) => {
    let groupDescriptionChange = e.target.value;
    setGroupDescription(groupDescriptionChange);
  };

  const handleFormSubmission = (e) => {
    onClose()
    const newGroup = {
      name: groupName,
      description: groupDescription,
      code: Date.now(),
      photo: groupPhoto,
      members: [props.userId],
      cities: [props.city],
    };
    console.log(newGroup);
    props.createGroup(props.userId, newGroup);
    setGroupName('');
    setGroupDescription('');
    setGroupPhoto('');
  }

  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");
  const hoverGreen = useColorModeValue(darken("gBtn.light", 12), darken("gBtn.dark", 12));

  return (
    <>
      <Button mt='4' bg={gBtn} color={text} onClick={onOpen} _hover={{ bg: hoverGreen }}>Create New Group</Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg={mainBlue}>
          <ModalHeader color={'text.dark'}>Create New Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px">

              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Group Name</FormLabel>
                <Input
                  value={groupName}
                  onChange={handleGroupNameChange}
                  placeholder="Group Name"
                  bg={layer}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Group Description</FormLabel>
                <Textarea
                  value={groupDescription}
                  onChange={handleGroupDescriptionChange}
                  placeholder="Group Description"
                  size="md"
                  height="100px"
                  resize="None"
                  bg={layer}
                />
              </FormControl>
              {/* <FormControl>
              <FormLabel>Upload Group Photo</FormLabel>
              <Input type="file" />
              </FormControl> */}
            </VStack>
          </ModalBody>

          <ModalFooter alignItems="center" >
            <Button bg={gBtn} color={text} ml="auto" mr="auto" onClick={handleFormSubmission} _hover={{ bg: hoverGreen }}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddGroupModal;