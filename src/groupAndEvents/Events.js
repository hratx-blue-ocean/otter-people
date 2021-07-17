import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EventCard from './EventCard'
import { Stack, Box } from "@chakra-ui/react"

export default function Events(props) {

  const [groupEvents, setGroupEvents] = useState([]);
  const organizer = props.organizer.firstName + props.organizer.lastName;

  const getEvents = (groupId) => {
    const url = 'http://localhost:3001/events';
    const config = {
      params: {
        groupId: groupId,
      }
    };
    axios.get(url, config)
      .then((results) => {
        props.setEvents(results.data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  useEffect(() => {
    if (props?.groupId !== undefined) {
      getEvents(props.groupId);
    }
  }, [props.groupId]);

  useEffect(() => {
    let newEvents = props?.events !== undefined ? props.events.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    }) : [];
    if (newEvents.length !== 0) {
      newEvents.forEach(event => {
        event.date = new Date(event.date);
        event.date = event.date.toLocaleString();
      });
    }
    setGroupEvents(newEvents);

    return function cleanup() {
      setGroupEvents([])
    }
  }, [props.events]);

  return (
    <Box w="90%" >
      <Stack>
        {groupEvents.map((event, i) => {
          return (
            <EventCard key={i} userId={props.organizer.userId} organizer={organizer} event={event} />
          )
        })}
      </Stack>
    </Box>
  )
}