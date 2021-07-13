import React from 'react';
import GroupItem from './GroupItem';
import { Button, ButtonGroup } from "@chakra-ui/react";
import AddGroupModal from './AddGroupModal';
import JoinGroupModal from './JoinGroupModal';

const GroupList = (props) => {

  return (
    <React.Fragment>
    <h1>Testing! Groupssss</h1>
    <AddGroupModal />
    <JoinGroupModal />
    <GroupItem />

    </React.Fragment>
  )

};

export default GroupList;
