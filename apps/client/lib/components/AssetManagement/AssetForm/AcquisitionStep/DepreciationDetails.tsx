import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import {
  FormDatePicker,
  FormInputWrapper,
  FormSectionInfo,
  FormTextInput,
} from '@repo/ui/components';

import { Field } from 'formik';

const DepreciationDetails = () => {
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      alignItems="flex-start"
      spacing={{ base: '16px', lg: '33px' }}
    >
      <Flex width="full" maxW="144px" display={{ base: 'none', lg: 'flex' }}>
        <FormSectionInfo
          title="Depreciation Details"
          info="Provide the asset's depreciation method"
          isRequired
        />
      </Flex>
      <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap="16px" width="full">
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Provide the asset's depreciation method"
            title="Depreciation Details"
            isRequired
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{ display: { lg: 'none' } }}
          >
            <FormDatePicker name="depreciationStartDate" label="Select Date" />
          </FormInputWrapper>
        </GridItem>
        <GridItem colSpan={2} width="full">
          <Stack
            width="full"
            direction={{ base: 'column', md: 'row' }}
            alignItems="flex-start"
            spacing="16px"
          >
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
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default DepreciationDetails;
