import React, { useState, useEffect } from 'react';

import { Box, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { TriangleUpIcon, TriangleDownIcon, EmailIcon } from '@chakra-ui/icons'

//need to pass as props
const members = [{ firstName: 'Jack', lastName: 'Pronske' }, { firstName: 'Kim', lastName: 'Kost' },
{ firstName: 'Tom', lastName: 'Chandler' }, { firstName: 'Allison', lastName: 'Dillon' },
{ firstName: 'Joe', lastName: 'Haller' }, { firstName: 'Cody', lastName: 'Haines' },
{ firstName: 'Christian', lastName: 'Peterson' }]

//need to pass as props
const code = '0214';

export default function Members(props) {

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
        <Flex p="0">
          <Spacer />
          {/* Future Feature */}
          {/* Can add avatar image URL to src attribute */}
          <Avatar size="md" name={fullName} src="" />
          <Box
            p="2"
            mt="1"
            lineHeight="tight"
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
    <Box maxW="100%" width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex p="4">
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Box p="2">
          <Heading size="lg">Group Members</Heading>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Box p="3" maxWidth="150px">
          <Text fontSize="xs"> Invite Friends with Group Code: {code}</Text>
          {/* <IconButton onClick={onInvite} aria-label="Invite" p="2" size="sm" icon={<EmailIcon boxSize={6} />} /> */}

        </Box>
        <Spacer />
      </Flex>
      <SimpleGrid columns={2}>
        {members.slice(0, itemsShown).map((each, i) =>
          eachMember(each, i)
        )}
      </SimpleGrid>
      <br />
      {
        itemsShown < members.length && members.length > 6 ?
          <IconButton onClick={onSeeMore} aria-label="See More" icon={<TriangleDownIcon />} />
          :
          <IconButton onClick={onCollapse} aria-label="Collapse" icon={<TriangleUpIcon />} />
      }
      <br /><br />
    </Box >
  )




  //     {category === "All" ?
  //       <SimpleGrid columns={2} >
  //         {apiTransformed.slice(0, itemsShown).map((each, i) =>
  //           eachRecommendation(each, i)
  //         )}
  //       </SimpleGrid>
  //       :
  //       <SimpleGrid columns={2} >
  //         {/*  */}
  //         {/* Consider making separate data arrays for each category? */}
  //         {/* Problem is that this is truncating results */}
  //         {/*  */}
  //         {apiTransformed.slice(0, itemsShown).map((each, i) => {
  //           if (category === each.category) {
  //             return (
  //               eachRecommendation(each, i)
  //             )
  //           }
  //         }
  //         )}
  //       </SimpleGrid>
  //     }
  //     <Center>

  //       {
  //         itemsShown < apiTransformed.length && apiTransformed.length > 4 ?
  //           <IconButton onClick={onSeeMore} aria-label="See More" icon={<TriangleDownIcon />} />
  //           :
  //           <IconButton onClick={onCollapse} aria-label="Collapse" icon={<TriangleUpIcon />} />
  //       }

  //       <br /><br />
  //     </Center>
  //   </Box >
  // )
}