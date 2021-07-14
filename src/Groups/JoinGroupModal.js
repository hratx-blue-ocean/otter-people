import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
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

function JoinGroupModal(props) {
  console.log('uId in joinModal', props.userId);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupCode, setGroupCode] = useState('');

  const handleGroupCodeChange = (e) => {
    let groupCode = e.target.value;
    setGroupCode(groupCode);
  };

  const handleFormSubmission = (e) => {
    onClose()
    console.log(typeof groupCode)
    props.joinGroup(props.userId, groupCode)
    // HANDLE FORM SUBMISSION
    // check to see if group code matches
    // send put Request to add to group
    // somehow re-render page with content
    setGroupCode('');

  }


  return (
    <>
      <Button onClick={onOpen}>Join Existing Group</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Join Existing Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px">
              <FormControl isRequired>
                <FormLabel>Group Invitation Code</FormLabel>
                <Input
                  value={groupCode}
                  onChange={handleGroupCodeChange}
                  placeholder="Invitation Code"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter alignItems="center" >
            <Button colorScheme="blue" ml="auto" mr="auto" onClick={handleFormSubmission}>
              Join Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default JoinGroupModal;