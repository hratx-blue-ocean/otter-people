import React from 'react';
import { TriangleDownIcon } from '@chakra-ui/icons';

const GroupItem = (props) => {
  let groupBullet;

  const handleGroupClick = (e) => {
    props.setCurrentGroup(props.groups[e.target.id]);  // NEED TO FORMAT PROPERLY based on db query!
  };

  console.log('testingggg', props.setCurrentGroup);
  if (props.groups === undefined || props.groups.length === 0) {
    groupBullet = 'You\'re not in a group.'
  } else {
    groupBullet = props.groups.map((group, index) => {
      return (
        <li key={index} id={index} onClick={handleGroupClick}>{group.name}</li>
      );
    })
  }

  return (
    <React.Fragment>
      {groupBullet}
    </React.Fragment>
  )
};

export default GroupItem;
