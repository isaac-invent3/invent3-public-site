import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../SectionInfo';
import DepartmentSelect from '../AssetLocation/Modals/SelectInputs/DepartmentSelect';
import UserSelect from './UserSelect';

const AssetOwner = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Owner's Info"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid columns={4} gap="11px" width="full">
        <UserSelect selectName="currentOwner" selectTitle="Owner" />
        <DepartmentSelect />
        <UserSelect selectName="assignedTo" selectTitle="Assigned to" />
        <UserSelect selectName="responsibleFor" selectTitle="Responsible for" />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetOwner;
