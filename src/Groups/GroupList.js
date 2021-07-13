import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { TriangleUpIcon } from '@chakra-ui/icons';
import GroupItem from './GroupItem';
import AddGroupModal from './AddGroupModal';
import JoinGroupModal from './JoinGroupModal';

const GroupList = (props) => {
  const [groups, setGroups] = useState([{ name: 'Drumline' }, { name: 'DnD' }, { name: 'Foodies' }, { name: 'Green Thumb' }]);
  const [displayedGroups, setDisplayedGroups] = useState([]); // default to show three groups
  const [toggleTriangle, setToggleTriangle] = useState(false);
  //props.userId


  // getGroups HTTP Request
  const getGroups = (userId) => {
    const url = `http://localhost:3001/groups`;
    axios.get(url)
      .then((result) => {
        console.log('results', result);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  // joinGroups - HTTP PUT Request? HOW TO HANDLE LOGIN ???
  // PUT Request to group & user
  const joinGroup = (userId, group) => {

  };

  // createGroup HTTP POST REQUEST
  const createGroup = (group) => {

    // call getGroups to get updated listed of groups
    getGroups(props.userId);

  };

  const showMoreGroups = (e) => {
    setDisplayedGroups(groups);
    setToggleTriangle(!toggleTriangle)
  };

  const collapseGroups = (e) => {
    setDisplayedGroups(groups.slice(0, 3));
    setToggleTriangle(!toggleTriangle)
  };

  useEffect(() => {
    setDisplayedGroups(groups.slice(0, 3))
  }, [groups])


  return (
    <>
      <h1>Our Group Component will be below. It will live on the left side bar!</h1>
      <AddGroupModal createGroup={createGroup} />
      <JoinGroupModal joinGroup={joinGroup} />
      <GroupItem groups={groups} displayedGroups={displayedGroups} setCurrentGroup={props.setCurrentGroup} />
      {!toggleTriangle ?
        <IconButton
          aria-label="Load more groups"
          variant="ghost"
          icon={<TriangleDownIcon />}
          onClick={showMoreGroups} /> :
        <IconButton
          aria-label="Collapse groups"
          variant="ghost"
          icon={<TriangleUpIcon />}
          onClick={collapseGroups} />}
    </>
  )

};

export default GroupList;
