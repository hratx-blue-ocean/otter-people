import React, { useState, useEffect } from 'react';

import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"

//need to pass as props
const members = [{ firstName: 'Jack', lastName: 'Pronske' }, { firstName: 'Joe', lastName: 'Haller' }, { firstName: 'Cody', lastName: 'Haines' }, { firstName: 'Christian', lastName: 'Peterson' }]

export default function Members(props) {

  const [itemsShown, setItemsShown] = useState(6);
  const [isMore, setIsMore] = useState(true);

  const onSeeMore = () => {
    setItemsShown(itemsShown + 4)
  };

  const onCollapse = () => {
    setItemsShown(4)
  };

  const eachMember = (dataObj, index) => {
    return (
      < Box key={index} p="2" >
        <Box
          mt="1"
          lineHeight="tight"
        >
          <Text fontSize="s">{dataObj.firstName} {dataObj.lastName.slice(0, 1)}.</Text>
        </Box>
      </Box>
    )
  }

  return (
    <Box maxW="100%" width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading size="lg">Group Members</Heading>
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
    </Box>
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