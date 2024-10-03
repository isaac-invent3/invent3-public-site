import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
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
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={3} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <CustomDatePicker name="depreciationStartDate" label="Start Date" />

            <Field
              as={TextInput}
              name="depreciationMethod"
              type="text"
              label="Depreciation Method"
              customStyles
            />
            <Field
              as={TextInput}
              name="depreciationRate"
              type="number"
              label="Depreciation Rate"
              customStyles
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default DepreciationDetails;
