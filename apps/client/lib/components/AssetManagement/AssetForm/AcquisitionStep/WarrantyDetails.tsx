import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import CustomDatePicker from '../../../UI/Form/FormDatePicker';

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
        <GridItem colSpan={1}>
          <CustomDatePicker
            name="warrantyStartDate"
            label="Select Start & End Date"
          />
          {/* <CustomDatePicker name="warrantyEndDate" label="End Date" /> */}
        </GridItem>
        <GridItem colSpan={2}>
          <HStack width="full" alignItems="flex-start" spacing="0px">
            <Flex width="full" maxW="130px">
              <SectionInfo
                title="Life Expectancy"
                info="Add name that users can likely search with"
                isRequired
              />
            </Flex>
            <Field
              as={TextInput}
              name="lifeExpectancy"
              type="number"
              label="Life Expectancy"
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={1}>
          <Field
            as={TextInput}
            name="warrantyDetails"
            type="text"
            label="Warranty Terms"
          />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default WarrantyDetails;
