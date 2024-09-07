import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';

const AssetOwner = () => {
  return (
    <HStack
      width="full"
      alignItems="flex-start"
      spacing="104px"
      position="relative"
      zIndex={9}
    >
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Owner's Info"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid columns={4} gap="11px" width="full">
        <SelectInput
          name="owner"
          title="Owner"
          options={categoryData}
          isSearchable
        />
        <SelectInput
          name="department"
          title="Department"
          options={categoryData}
          isSearchable
        />
        <SelectInput
          name="assignedTo"
          title="Assigned to"
          options={categoryData}
          isSearchable
        />
        <SelectInput
          name="responsibleFor"
          title="Responsible for"
          options={categoryData}
          isSearchable
        />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetOwner;
