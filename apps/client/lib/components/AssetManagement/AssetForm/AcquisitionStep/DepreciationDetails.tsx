import { Flex, HStack, Icon, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import { CalendarIcon } from '~/lib/components/CustomIcons';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';

const DepreciationDetails = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Depreciation Details"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <SimpleGrid columns={3} width="full" spacing="16px">
        <Field
          as={TextInput}
          name="depreciationStartDate"
          type="date"
          label="Start Date"
          customRightElement={
            <Icon as={CalendarIcon} boxSize="20px" color="#374957" />
          }
        />
        <SelectInput
          name="depreciationMethod"
          title="Depreciation Method"
          options={categoryData}
          isSearchable
        />
        <Field
          as={TextInput}
          name="depreciationRate"
          type="number"
          label="Depreciation Rate"
        />
      </SimpleGrid>
    </HStack>
  );
};

export default DepreciationDetails;
