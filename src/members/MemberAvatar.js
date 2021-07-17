import React from 'react';
import { Box, Text, Flex, Spacer, Avatar, useColorModeValue } from "@chakra-ui/react"

const MemberAvatar = ({ dataObj }) => {
  let fullName = dataObj.firstName + " " + dataObj.lastName;

  const layer = useColorModeValue('layer.light', 'layer.dark');
  const txt = useColorModeValue('text.light', 'text.dark');

  return (
    < Box p="2" >
      <Flex p="0" bg={layer} color={txt}>
        <Spacer />
        {/* Future Feature */}
        {/* Can add avatar image URL to src attribute */}
        <Avatar size="md" name={fullName} src="" />
        <Box
          p="2"
          mt="1"
          lineHeight="tight"
          bg={layer}
        >
          <Text fontSize="md">{dataObj.firstName} {dataObj.lastName.slice(0, 1)}.</Text>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
      </Flex>
    </Box>
  )
}

export default MemberAvatar;