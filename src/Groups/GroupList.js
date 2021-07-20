import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { TriangleUpIcon } from '@chakra-ui/icons';
import GroupItem from './GroupItem';
import AddGroupModal from './AddGroupModal';
import JoinGroupModal from './JoinGroupModal';

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [toggleTriangle, setToggleTriangle] = useState(false);

  const getGroups = (userId) => {
    const url = '/groups';
    const config = {
      params: {
        userId: props.userId,
      }
    };
    axios.get(url, config)
      .then((result) => {
        setGroups(result.data)
        props.setCurrentGroup(result.data[0])
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  const getOneGroup = (groupCode) => {
    const url = '/groups/getOne';
    const config = {
      params: {
        groupCode: groupCode,
      }
    };
    axios.get(url, config)
      .then((result) => {
        props.setCurrentGroup(result.data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  const joinGroup = (userId, groupCode, city) => {
    const url = '/groups/code';
    const config = {
      params: {
        groupCode: groupCode,
        userId: userId,
        city: city,
      }
    };
    axios.get(url, config)
      .then((result) => {
        getOneGroup(groupCode);
        getGroups(userId);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  const createGroup = (userId, group) => {
    const url = `/groups`;
    axios.post(url, group)
      .then((result) => {
        let newGroup = JSON.parse(result.config.data);
        getGroups(props.userId);
        getOneGroup(newGroup.code)
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
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

  useEffect(() => {
    getGroups(props.userId);
  }, [props.userId]);

  return (
    <>
      <AddGroupModal createGroup={createGroup} userEmail={props.userEmail} userId={props.userId} city={props.city} />
      <JoinGroupModal joinGroup={joinGroup} userId={props.userId} city={props.city} />
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
