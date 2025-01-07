import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';

import { Field } from 'formik';

const PurchasePrice = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <FormSectionInfo
          title="Purchase Price"
          info="Enter the initial cost of the asset."
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={3} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={FormTextInput}
              name="initialValue"
              type="number"
              label="Purchase Price"
            />
            <HStack width="full" alignItems="flex-start" spacing="0px">
              <Flex width="full" maxW="130px">
                <FormSectionInfo
                  title="Resale Value"
                  info="Specify the estimated value for resale."
                  isRequired
                />
              </Flex>
              <Field
                as={FormTextInput}
                name="resaleValue"
                type="number"
                label="Resale Value"
              />
            </HStack>
            <HStack width="full" alignItems="flex-start" spacing="0px">
              <Flex width="full" maxW="130px">
                <FormSectionInfo
                  title="Scrap Value"
                  info="Enter the value if disposed as scrap"
                  isRequired
                />
              </Flex>
              <Field
                as={FormTextInput}
                name="scrapValue"
                type="number"
                label="Scrap Value"
              />
            </HStack>
          </HStack>
        </GridItem>
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
      </Grid>
    </HStack>
  );
};

export default PurchasePrice;
