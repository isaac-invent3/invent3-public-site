import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
import CustomDatePicker from './DatePicker';

const PurchasePrice = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Purchase"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="16px" width="full">
        <GridItem colSpan={4} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <CustomDatePicker name="purchaseDate" label="Purchase Date" />
            <Field
              as={TextInput}
              name="initialValue"
              type="number"
              label="Purchase Price"
            />
            <Field
              as={TextInput}
              name="lifeExpectancy"
              type="number"
              label="Life Expectancy"
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={4} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={TextInput}
              name="currentValue"
              type="number"
              label="Current Value"
            />
            <Field
              as={TextInput}
              name="resaleValue"
              type="number"
              label="Resale Value"
            />
            <Field
              as={TextInput}
              name="scrapValue"
              type="number"
              label="Scrap Value"
            />
          </HStack>
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default PurchasePrice;
