import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EventDetailCard from './EventDetailCard';
import { useColorModeValue, Box, Center, Grid, GridItem, Button, Text, Heading, } from "@chakra-ui/react";
import { darken } from '@chakra-ui/theme-tools';


export default function EventCard({ userId, event, organizer }) {

  const [attending, setAttending] = useState(false);
  const [number, setNumber] = useState(0);
  const addAttending = (userId, eventName) => {
    const url = '/event/attending';
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
    setNumber(number + 1);
    setAttending(true)
  }

  useEffect(() => {
    if (event.attending.includes(userId)) {
      setAttending(true);
    }
    setNumber(event.attending.length)
  }, [event.attending])


  useEffect(() => {
    const url = '/event/attending/check';
    const config = {
      userId: userId,
      eventName: event.name
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

  const text = useColorModeValue("text.light", "text.dark");
  const layer = useColorModeValue("layer.light", "layer.dark");
  const border = useColorModeValue('select.light', 'layer.dark');
  const gBtn = useColorModeValue('gBtn.light', 'gBtn.dark');
  const hoverGreen = useColorModeValue(darken("gBtn.light", 12), darken("gBtn.dark", 12));


  return (
    <Center >
      <Grid
        boxShadow="sm"
        h="240px"
        maxHeight="200px"
        templateColumns="repeat(12, 1fr)"
        gap={1.5}
        borderWidth="1px" borderRadius="md"
        p="2"
        w='100%'
        bg={layer}
        color={text}
        borderColor={border}
      >

        <GridItem colSpan={3} >
          <Grid maxHeight="240px" templateRows="repeat(7, 1fr)">
            <GridItem rowSpan={3}>
              <Text p="2" align="left" fontSize="md">{event.date}</Text>
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
                  {event.name}
                </Heading>
                <Text align="left" fontSize="xs" noOfLines={[1]}>
                  {event.location}
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
                  {event.description}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem colSpan={3}>
          <Button onClick={() => selectAttending(userId, event.name)} mt="4" colorScheme="teal" size="md" _hover={{ bg: hoverGreen }} bg={gBtn} color={text}>
            {attending ? <Text>Attending!</Text> : <Text>RSVP</Text>}
          </Button>
          <br />
          <EventDetailCard event={event} />
        </GridItem>
      </Grid >

    </Center>
  )
}