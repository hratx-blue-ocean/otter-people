import React from 'react';

import { Box } from "@chakra-ui/react"
import { Flex, Spacer } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"

import apiResult from './sampleData.js'

// Sample card from Airbnb

export default function Recs() {

  //useState hooks

  //useEffect hooks

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading size="lg">Around Town</Heading>
      <Text fontSize="sm">Click to Add As Your Next Event!</Text>
      <Flex>
        <Spacer />
        <Box p="4" bg="red.400">
          <Image src={property.imageUrl} alt={property.imageAlt} />
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>
        </Box>
        <Spacer />
        <Box p="4" bg="green.400">
          Box 2
        </Box>
        <Spacer />
      </Flex>
      <br />
      <Flex>
        <Spacer />
        <Box p="4" bg="red.400">
          Box 1
        </Box>
        <Spacer />
        <Box p="4" bg="green.400">
          Box 2
        </Box>
        <Spacer />
      </Flex>
    </Box>
  )
}