import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Center, Heading, SimpleGrid, IconButton, useColorModeValue } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import MemberAvatar from './MemberAvatar.js';

const url = 'http://127.0.0.1:3000';

export default function Members(props) {

  const layer = useColorModeValue('layer.light', 'layer.dark');
  const txt = useColorModeValue('text.light', 'text.dark');
  const border = useColorModeValue('select.light', 'layer.dark');

  const [itemsShown, setItemsShown] = useState(4);
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

    return function cleanup() {
      setMembers([]);
    };
  }, [props.currentGroup]);

  const onSeeMore = () => {
    setItemsShown(itemsShown + 4)
  };

  const onCollapse = () => {
    setItemsShown(4)
  };

  return (
    <Box bg={layer} color={txt} maxW="100%" width="100%" borderWidth="1px" borderColor={border} borderRadius="md" overflow="hidden" boxShadow="sm">
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