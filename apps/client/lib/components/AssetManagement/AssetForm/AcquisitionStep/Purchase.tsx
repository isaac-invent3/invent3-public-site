import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import {
  FormInputWrapper,
  FormSectionInfo,
  FormTextInput,
} from '@repo/ui/components';

import { Field } from 'formik';

const PurchasePrice = () => {
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      alignItems="flex-start"
      spacing={{ base: '16px', lg: '33px' }}
    >
      <Flex width="full" maxW="144px" display={{ base: 'none', lg: 'flex' }}>
        <FormSectionInfo
          title="Purchase Price"
          info="Enter the initial cost of the asset."
          isRequired
        />
      </Flex>
      <Grid templateColumns={{ lg: 'repeat(3, 1fr)' }} gap="20px" width="full">
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Enter the initial cost of the asset."
            title="Purchase Price"
            isRequired
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
              display: { lg: 'none' },
            }}
          >
            <Field
              as={FormTextInput}
              name="initialValue"
              type="number"
              label="Purchase Price"
            />
          </FormInputWrapper>
        </GridItem>
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Specify the estimated value for resale."
            title="Resale Value"
            isRequired={false}
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
            }}
          >
            <Field
              as={FormTextInput}
              name="resaleValue"
              type="number"
              label="Resale Value"
            />
          </FormInputWrapper>
        </GridItem>
        <GridItem colSpan={1}>
          <FormInputWrapper
            sectionMaxWidth="130px"
            customSpacing="0px"
            description="Enter the value if disposed as scrap"
            title="Scrap Value"
            isRequired={false}
            direction={{ base: 'column', md: 'row' }}
            formSectionCustomStyle={{
              maxW: { md: '130px' },
            }}
          >
            <Field
              as={FormTextInput}
              name="scrapValue"
              type="number"
              label="Scrap Value"
            />
          </FormInputWrapper>
        </GridItem>
      </Grid>
      {/* <GridItem colSpan={4} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <CustomDatePicker name="purchaseDate" label="Purchase Date" />
            <Field
              as={FormTextInput}
              name="currentValue"
              type="number"
              label="Current Value"
            />
          </HStack>
        </GridItem> */}
    </Stack>
  );
};

export default PurchasePrice;
