import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Center, Text, Heading, SimpleGrid, IconButton, Flex, Spacer, Avatar, useColorModeValue } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon, EmailIcon } from '@chakra-ui/icons';
import MemberAvatar from './MemberAvatar.js';

//need to pass as props
// const members = [{ firstName: 'Jack', lastName: 'Pronske' }, { firstName: 'Kim', lastName: 'Kost' },
// { firstName: 'Tom', lastName: 'Chandler' }, { firstName: 'Allison', lastName: 'Dillon' },
// { firstName: 'Joe', lastName: 'Haller' }, { firstName: 'Cody', lastName: 'Haines' },
// { firstName: 'Christian', lastName: 'Peterson' }]

const url = 'http://127.0.0.1:3001';

export default function Members(props) {

  const layer = useColorModeValue('layer.light', 'layer.dark');
  const txt = useColorModeValue('text.light', 'text.dark');

  const [itemsShown, setItemsShown] = useState(4);
  const [isMore, setIsMore] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (props.currentGroup?.members) {
      axios.post(`${url}/members/info`, { members: props.currentGroup.members })
        .then((response) => {
          if (!response.error) {
            setMembers(response.data);
          } else {
            console.log('No user matching this user id found');
          }
        })
        .catch((err) => {
          console.log('There was an error getting info for this user');
        });
    }
  }, [props.currentGroup]);

  const onSeeMore = () => {
    setItemsShown(itemsShown + 4)
  };

  const onCollapse = () => {
    setItemsShown(4)
  };

  return (
    <Box bg={layer} color={txt} maxW="100%" width="100%" borderWidth="1px" borderColor={layer} borderRadius="md" overflow="hidden">
      <Box p="1">
        <Heading size="lg">Group Members</Heading>
      </Box>
      <SimpleGrid columns={2}>
        {members.slice(0, itemsShown).map((member, i) => {
          return <MemberAvatar key={i} dataObj={member} />
        })}
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