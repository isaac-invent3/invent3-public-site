import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import {
  FormDatePicker,
  FormSectionInfo,
  FormTextInput,
} from '@repo/ui/components';

import { Field } from 'formik';

const DepreciationDetails = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <FormSectionInfo
          title="Depreciation Details"
          info="Provide the asset's depreciation method"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={1}>
          <FormDatePicker name="depreciationStartDate" label="Select Date" />
        </GridItem>
        <GridItem colSpan={2} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={FormTextInput}
              name="depreciationMethod"
              type="text"
              label="Depreciation Method"
              customStyles
            />
            <Field
              as={FormTextInput}
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
