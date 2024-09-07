import { Flex, Grid, GridItem, HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import SelectInput from '~/lib/components/UI/Select';
import { categoryData } from '~/lib/utils/MockData/asset';
import { CalendarIcon } from '~/lib/components/CustomIcons';

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
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={2} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={TextInput}
              name="warrantyStartDate"
              type="text"
              label="Start Date"
              customRightElement={
                <Icon as={CalendarIcon} boxSize="20px" color="#374957" />
              }
            />
            <Field
              as={TextInput}
              name="warrantyEndDate"
              type="text"
              label="End Date"
              customRightElement={
                <Icon as={CalendarIcon} boxSize="20px" color="#374957" />
              }
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={2} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={TextInput}
              name="warrantyTerms"
              type="text"
              label="Warranty Terms"
            />
            <SelectInput
              name="paymentTerms"
              title="Payment Terms"
              options={categoryData}
              isSearchable
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default WarrantyDetails;
