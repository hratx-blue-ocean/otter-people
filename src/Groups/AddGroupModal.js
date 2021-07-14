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

  const handleGroupPhotoUpload = (e) => {
    let groupPhotoUpload = e.target.file;
    setGroupPhoto(groupPhotoUpload);
  };
  /*
group = {
  id: id,
  name: name,
  description: description,
  picture: picture,
  members: [id...],
}
*/

  const handleFormSubmission = (e) => {
    onClose()
    const newGroup = {
      name: groupName,
      description: groupDescription,
      code: Date.now(),
      photo: groupPhoto,
      members: [props.userId],
    };
    console.log(newGroup);
    props.createGroup(props.userId, newGroup);
    // clear form inputs
    setGroupName('');
    setGroupDescription('');
    setGroupPhoto('');
  }

  const mainBlue = useColorModeValue("mainBlue.light", "mainBlue.dark");
  const gBtn = useColorModeValue("gBtn.light", "gBtn.dark");
  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");


  return (
    <>
      <Button onClick={onOpen}>Create New Group</Button>

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
            <Button bg={gBtn} color={text} ml="auto" mr="auto" onClick={handleFormSubmission}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddGroupModal;