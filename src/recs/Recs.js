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

//change this to props later
import { apiTransformed } from './sampleData.js'

export default function Recs(props) {

  //useState hooks
  const [category, setCategory] = useState("Sights");
  const [itemsShown, setItemsShown] = useState(4);
  const [isMore, setIsMore] = useState(true);
  const [data, setData] = useState(apiTransformed.slice(0, itemsShown))

  //useEffect hooks
  useEffect(() => {
    setData(apiTransformed.slice(0, itemsShown))
  }, [itemsShown])

  const onChange = (e) => {
    setCategory(e.target.value)
  };

  const onClick = () => {
    //open Create Event modal
    //autofill name and location (reverse geocode)
  };

  const onSeeMore = () => {
    setItemsShown(itemsShown + 4)

  };

  const onCollapse = () => {
    setItemsShown(4)
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading size="lg">Around Town</Heading>
      <Text fontSize="sm" >Click to Add As Your Next Event!</Text>
      <Center>
        <Select onChange={onChange} placeholder="Category" size="sm" width="50%">
          <option value="Sights">Sights</option>
          <option value="Nightlife">Nightlife</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Shopping">Shopping</option>
        </Select>
      </Center>

      <SimpleGrid columns={2} >
        <Box p="2" >
          <Image src="https://www.calacademy.org/sites/default/files/styles/manual_crop_standard_960x540/public/uploads/images/cas22-155-layers-small.jpg?itok=_r3WtJWF&c=f14936ae55e8d4293886b19bcfa364bd"
            alt="California Academy of Sciences" />
          <Box
            mt="1"
            lineHeight="tight"
          >
            <Text isTruncated fontSize="xs">California Academy of Sciences</Text>
          </Box>
        </Box>
        <Box p="2">
          <Image src="https://www.calacademy.org/sites/default/files/styles/manual_crop_standard_960x540/public/uploads/images/cas22-155-layers-small.jpg?itok=_r3WtJWF&c=f14936ae55e8d4293886b19bcfa364bd"
            alt="California Academy of Sciences" />
          <Box
            mt="1"
            lineHeight="tight"
          >
            <Text isTruncated fontSize="xs">California Academy of Sciences</Text>
          </Box>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={2} >
        <Box p="2" >
          <Image src="https://www.calacademy.org/sites/default/files/styles/manual_crop_standard_960x540/public/uploads/images/cas22-155-layers-small.jpg?itok=_r3WtJWF&c=f14936ae55e8d4293886b19bcfa364bd"
            alt="California Academy of Sciences" />
          <Box
            mt="1"
            lineHeight="tight"
          >
            <Text isTruncated fontSize="xs">California Academy of Sciences</Text>
          </Box>
        </Box>
        <Box p="2">
          <Image src="https://www.calacademy.org/sites/default/files/styles/manual_crop_standard_960x540/public/uploads/images/cas22-155-layers-small.jpg?itok=_r3WtJWF&c=f14936ae55e8d4293886b19bcfa364bd"
            alt="California Academy of Sciences" />
          <Box
            mt="1"
            lineHeight="tight"
          >
            <Text isTruncated fontSize="xs">California Academy of Sciences</Text>
          </Box>
        </Box>
      </SimpleGrid>
      <Center>

        {
          itemsShown < apiTransformed.length && apiTransformed.length > 4 ?
            <IconButton onClick={onSeeMore} aria-label="See More" icon={<TriangleDownIcon />} />
            :
            <IconButton onClick={onCollapse} aria-label="Collapse" icon={<TriangleUpIcon />} />
        }

        <br /><br />
      </Center>
    </Box>
  )
}