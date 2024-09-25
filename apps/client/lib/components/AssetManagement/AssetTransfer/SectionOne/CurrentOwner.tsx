import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import User from '../User';
import { useAppSelector } from '~/lib/redux/hooks';

const CurrentOwner = () => {
  const { currentOwner, departmentName, buildingName, floorName } =
    useAppSelector((state) => state.asset.asset);
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Current Owner</DetailHeader>
      <User
        name={currentOwner}
        department={departmentName}
        location={[buildingName, floorName].filter(Boolean).join(', ')}
        role={'Operation Manager'}
      />
    </VStack>
  );
};

export default CurrentOwner;
