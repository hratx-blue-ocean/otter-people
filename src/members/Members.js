import React, { useState, useEffect } from 'react';

import { Box, Center, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar, useColorModeValue } from "@chakra-ui/react"
import { TriangleUpIcon, TriangleDownIcon, EmailIcon } from '@chakra-ui/icons'

//need to pass as props
const members = [{ firstName: 'Jack', lastName: 'Pronske' }, { firstName: 'Kim', lastName: 'Kost' },
{ firstName: 'Tom', lastName: 'Chandler' }, { firstName: 'Allison', lastName: 'Dillon' },
{ firstName: 'Joe', lastName: 'Haller' }, { firstName: 'Cody', lastName: 'Haines' },
{ firstName: 'Christian', lastName: 'Peterson' }]


export default function Members(props) {

  const layer = useColorModeValue('layer.light', 'layer.dark');
  const txt = useColorModeValue('text.light', 'text.dark');

  const [itemsShown, setItemsShown] = useState(4);
  const [isMore, setIsMore] = useState(true);

  const onInvite = () => {
  };

  const onSeeMore = () => {
    setItemsShown(itemsShown + 4)
  };

  const onCollapse = () => {
    setItemsShown(4)
  };

  const eachMember = (dataObj, index) => {
    let fullName = dataObj.firstName + " " + dataObj.lastName;

    return (
      < Box key={index} p="2" >
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

  return (
    <Box bg={layer} color={txt} maxW="100%" width="100%" borderWidth="1px" borderColor={layer} borderRadius="md" overflow="hidden">
      <Box p="1">
        <Heading size="lg">Group Members</Heading>
      </Box>
      <SimpleGrid columns={2}>
        {members.slice(0, itemsShown).map((each, i) =>
          eachMember(each, i)
        )}
      </SimpleGrid>
      <Center>
        {
          itemsShown < members.length && members.length > 6 ?
            <IconButton onClick={onSeeMore} aria-label="See More" icon={<TriangleDownIcon />} />
            :
            <IconButton onClick={onCollapse} aria-label="Collapse" icon={<TriangleUpIcon />} />
        }
        <br /><br />
      </Center>
    </Box >
  )

}