import React from 'react';

import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"
import { TriangleDownIcon } from '@chakra-ui/icons'

import apiResult from './sampleData.js'

export default function Recs(props) {

  //useState hooks

  //useEffect hooks

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading size="lg">Around Town</Heading>
      <Text fontSize="sm" >Click to Add As Your Next Event!</Text>
      <Center>
        <Select placeholder="Category" size="sm" width="50%">
          <option value="option1">Sights</option>
          <option value="option2">Nightlife</option>
          <option value="option3">Restaurants</option>
          <option value="option3">Shopping</option>
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
        <TriangleDownIcon />
        <br /><br />
      </Center>
    </Box>
  )
}