import React, { useState } from 'react';
import { useDisclosure, useColorModeValue } from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupCode, setGroupCode] = useState('');

  const handleGroupCodeChange = (e) => {
    let groupCode = e.target.value;
    setGroupCode(groupCode);
  };

  const handleFormSubmission = (e) => {
    onClose()
    props.joinGroup(props.userId, groupCode, props.city)
    // HANDLE FORM SUBMISSION
    // check to see if group code matches
    // send put Request to add to group
    // somehow re-render page with content
    setGroupCode('');

  }

  const gBtn = useColorModeValue('gBtn.light', 'gBtn.dark');
  const mainBlue = useColorModeValue('mainBlue.light', 'mainBlue.dark');
  const layer = useColorModeValue('layer.ligth', 'layer.dark');
  const txt = useColorModeValue('text.light', 'text.dark');

  return (
    <>
      <Button bg={mainBlue} color={'text.dark'} onClick={onOpen}>Join Existing Group</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={mainBlue}>
          <ModalHeader color={'text.dark'}>Join Existing Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="20px">
              <FormControl isRequired>
                <FormLabel color={'text.dark'}>Group Invitation Code</FormLabel>
                <Input
                  value={groupCode}
                  onChange={handleGroupCodeChange}
                  placeholder="Invitation Code"
                  bg={layer}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter alignItems="center" >
            <Button bg={gBtn} color={txt} ml="auto" mr="auto" onClick={handleFormSubmission}>
              Join Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default JoinGroupModal;