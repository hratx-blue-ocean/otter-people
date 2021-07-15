import React from 'react';
import { List, ListItem, ListIcon } from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons'


const GroupItem = (props) => {
  let groupBullet;

  const handleGroupClick = (e) => {
    props.setCurrentGroup(props.displayedGroups[e.target.id]);  // NEED TO FORMAT PROPERLY based on db query!
  };

  if (props.displayedGroups === undefined || props.displayedGroups.length === 0) {
    groupBullet = 'You\'re not in a group.'
  } else {
    groupBullet = props.displayedGroups.map((group, index) => {
      return (
        <ListItem textAlign='left' key={index} id={index} onClick={handleGroupClick}>
          <ListIcon as={SunIcon} />
          {group.name}
        </ListItem>
      );
    })
  }

  return (
    <>
      <List spacing={3}>
        {groupBullet}
      </List>
    </>
  )
};

export default GroupItem;
