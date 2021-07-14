import React, { useState, useEffect } from 'react';

import { VStack, Feature, Stack, StackDivider, Box, Center, Grid, GridItem, Button, ButtonGroup, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

//need to pass as props
let groupEvents = [{
  date: "Fri July 23 2021 16:30:00 GMT-0500 (Central Daylight Time)", name: "Hack Reactor Graduation", location: "Zoom",
  description: "Bring your friends and family to our virtual graduation! Cap and gown not required.",
  attending: ["a", "b"]
},
{
  date: "Sun Aug 15 2021 11:00:00 GMT-0500 (Central Daylight Time)", name: "No FOMO Brunch", location: "TBD",
  description: "Be financially reckless and grab avocado toast! YOLO. Internet slang from after 2012 and TikTok NOT welcome.",
  attending: ["a", "b", "c", "d", "e", "f"]
},
{
  date: "Sat July 31 2021 14:00:00 GMT-0500 (Central Daylight Time)", name: "Austin Bouldering Project", location: "929 Springdale Rd.",
  description: "Grab a harness and live on the cliff’s edge with friends old and new! SOs welcome. We’ll plan to grab beers at the bar across the street afterwards. Forget the name but reservation under the name Jack!",
  attending: ["a", "b"]
}]

//need to pass as a prop
const userId = "c";

export default function Events(props) {

  //
  //add SHOW MORE if we want
  //
  //

  const addAttending = () => {
    //api call to add user to array of attendees in event
    //should update number attending
    //and change RSVP button to "Attending"
  }

  const selectAttending = () => {
    addAttending();
  }

  const getDetails = () => {
    //
    //need to create drawer
    //
  }

  function Feature({ title, desc, ...rest }) {
    groupEvents = groupEvents.reverse();

    return (
      groupEvents.map((each, i) => {
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
                        {each.attending.length} attending
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
                <Button onClick={selectAttending} mt="4" colorScheme="teal" size="md">
                  {each.attending.includes(userId) ? <Text>Attending!</Text> : <Text>RSVP</Text>}
                </Button><br />
                <Button onClick={getDetails} mt="4" colorScheme="teal" size="md">
                  Details
                </Button>

              </GridItem>
            </Grid >

          </Center>
        )
      })
    )
  }

  return (
    <Box  >
      <Stack>
        <Feature />
      </Stack>
    </Box>
  )
}