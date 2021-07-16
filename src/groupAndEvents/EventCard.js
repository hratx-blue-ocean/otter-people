import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EventDetailCard from './EventDetailCard';
import { VStack, Feature, Stack, StackDivider, Box, Center, Grid, GridItem, Button, ButtonGroup, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons';


export default function EventCard({ userId, each, organizer }) {

  const [attending, setAttending] = useState(false);
  const [number, setNumber] = useState(0);

  const addAttending = (userId, eventName) => {
    const url = 'http://localhost:3001/event/attending';
    const config = {
      userId: userId.toString(),
      eventName: eventName.toString(),
    };
    axios.put(url, config)
      .then((results) => {
        console.log(results.data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }

  const selectAttending = (userId, eventName) => {
    addAttending(userId, eventName);
    setAttending(true)
  }

  useEffect(() => {
    setNumber(number + 1)
  }, [attending])

  useEffect(() => {
    //see if userId is in attending array
    //if so, setAttending(true)
    const url = 'http://localhost:3001/event/attending/check';
    const config = {
      userId: userId,
      eventName: each.name
    };
    axios.get(url, config)
      .then((results) => {
        if (results.data) {
          setAttending(true)
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }, [])

  return (
    <Center>
      <Grid
        boxShadow="md"
        h="240px"
        maxHeight="200px"
        templateColumns="repeat(12, 1fr)"
        gap={1.5}
        borderWidth="1px" borderRadius="sm"
        width="90%"
        p="2"
      >

        <GridItem colSpan={3} >
          <Grid maxHeight="240px" templateRows="repeat(7, 1fr)">
            <GridItem rowSpan={3}>
              <Text p="2" align="left" fontSize="sm">{each.date}</Text>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem colSpan={6}>
          <Grid maxHeight="240px" templateRows="repeat(8, 1fr)">
            <GridItem rowSpan={3}>
              <Box
                mt="1"
                lineHeight="tight"
              >
                <Heading align="left" size="md" noOfLines={[1, 2]}>
                  {each.name}
                </Heading>
                <Text align="left" fontSize="xs" noOfLines={[1]}>
                  {each.location}
                </Text>
                <Text as="i" align="left" fontSize="xs" noOfLines={[1]}>
                  {number} attending
                </Text>
              </Box>
            </GridItem>
            <GridItem rowSpan={1}></GridItem>
            <GridItem rowSpan={4}>
              <Box
                mt="1"
                lineHeight="tight"
              >
                <Text align="left" fontSize="xs" noOfLines={[1, 2, 3, 4]}>
                  {each.description}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem colSpan={3}>
          <Button onClick={() => selectAttending(userId, each.name)} mt="4" colorScheme="teal" size="md">
            {attending ? <Text>Attending!</Text> : <Text>RSVP</Text>}
          </Button>
          <br />
          <EventDetailCard organizer={organizer} event={each} />
        </GridItem>
      </Grid >

    </Center>
  )
}