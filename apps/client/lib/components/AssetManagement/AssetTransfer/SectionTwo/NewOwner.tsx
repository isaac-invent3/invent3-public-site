import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';
// import User from '../User';

const NewOwner = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">New Owner</DetailHeader>
      <SelectInput
        name="newOwner"
        title="Select User"
        options={categoryData}
        isSearchable
      />
      {/* <User /> */}
    </VStack>
  );
};

export default NewOwner;
