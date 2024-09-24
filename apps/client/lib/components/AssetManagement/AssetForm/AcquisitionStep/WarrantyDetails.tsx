import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import CustomDatePicker from './DatePicker';

const WarrantyDetails = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Warranty Details"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid gap="16px" width="full" columns={3}>
        <CustomDatePicker name="warrantyStartDate" label="Start Date" />
        <CustomDatePicker name="warrantyEndDate" label="End Date" />
        <Field
          as={TextInput}
          name="warrantyDetails"
          type="text"
          label="Warranty Terms"
        />
      </SimpleGrid>
    </HStack>
  );
};

export default WarrantyDetails;
