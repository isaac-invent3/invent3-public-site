import { Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AssetLifeCycleTransitionRuleList } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import StageTransitionRuleDrawer from './StageTransitionRuleDrawer';

const Action = ({ data }: { data: AssetLifeCycleTransitionRuleList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text color="blue.500" cursor="pointer" onClick={onOpen}>
        Edit
      </Text>
      <StageTransitionRuleDrawer
        isOpen={isOpen}
        onClose={onClose}
        data={data}
      />
    </>
  );
};

export default Action;
