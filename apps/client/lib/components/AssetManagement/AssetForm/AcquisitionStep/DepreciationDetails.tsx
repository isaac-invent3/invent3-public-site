import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';
import CustomDatePicker from './DatePicker';

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
        <CustomDatePicker name="depreciationStartDate" label="Start Date" />
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
