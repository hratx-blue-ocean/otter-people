import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
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
      photo: groupPhoto,
      members: [props.userEmail],
    };
    console.log(newGroup);
    props.createGroup(props.useEmail, newGroup);
    // clear form inputs
    setGroupName('');
    setGroupDescription('');
    setGroupPhoto('');
  }

  console.log('us', props.userEmail)

  return (
    <>
      <Button onClick={onOpen}>Create New Group</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Create New Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px">

              <FormControl isRequired>
                <FormLabel>Group Name</FormLabel>
                <Input
                  value={groupName}
                  onChange={handleGroupNameChange}
                  placeholder="Group Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Group Description</FormLabel>
                <Textarea
                  value={groupDescription}
                  onChange={handleGroupDescriptionChange}
                  placeholder="Group Description"
                  size="md"
                  height="100px"
                  resize="None"
                />
              </FormControl>
              {/* <FormControl>
              <FormLabel>Upload Group Photo</FormLabel>
              <Input type="file" />
              </FormControl> */}
            </VStack>
          </ModalBody>

          <ModalFooter alignItems="center" >
            <Button colorScheme="blue" ml="auto" mr="auto" onClick={handleFormSubmission}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddGroupModal;