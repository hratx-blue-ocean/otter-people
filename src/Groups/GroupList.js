import React from 'react';
import GroupItem from './GroupItem';
import { Button, ButtonGroup } from "@chakra-ui/react";
import AddGroupModal from './AddGroupModal';
import JoinGroupModal from './JoinGroupModal';

const GroupList = (props) => {

  return (
    <React.Fragment>
    <AddGroupModal />
    <JoinGroupModal />
    <GroupItem />

    </React.Fragment>
  )

};

export default GroupList;
