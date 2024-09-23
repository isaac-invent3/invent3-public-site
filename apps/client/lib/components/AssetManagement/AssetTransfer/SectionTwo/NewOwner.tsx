import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import EmployeeSelect from '../../AssetForm/GeneralStep/AssetOwner/EmployeeSelect';
// import User from '../User';

const NewOwner = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">New Owner</DetailHeader>
      <EmployeeSelect selectName="userId" selectTitle="User" />
      {/* <User /> */}
    </VStack>
  );
};

export default NewOwner;
