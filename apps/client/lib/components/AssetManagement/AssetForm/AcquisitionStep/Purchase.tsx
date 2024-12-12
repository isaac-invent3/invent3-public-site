import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';

import SectionInfo from '../../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';
// import CustomDatePicker from './DatePicker';

const PurchasePrice = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="78px">
      <Flex width="full" maxW="144px">
        <SectionInfo
          title="Purchase Price"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" width="full">
        <GridItem colSpan={3} width="full">
          <HStack width="full" alignItems="flex-start" spacing="16px">
            <Field
              as={TextInput}
              name="initialValue"
              type="number"
              label="Purchase Price"
            />
            <HStack width="full" alignItems="flex-start" spacing="0px">
              <Flex width="full" maxW="130px">
                <SectionInfo
                  title="Resale Value"
                  info="Add name that users can likely search with"
                  isRequired
                />
              </Flex>
              <Field
                as={TextInput}
                name="resaleValue"
                type="number"
                label="Resale Value"
              />
            </HStack>
            <HStack width="full" alignItems="flex-start" spacing="0px">
              <Flex width="full" maxW="130px">
                <SectionInfo
                  title="Scrap Value"
                  info="Add name that users can likely search with"
                  isRequired
                />
              </Flex>
              <Field
                as={TextInput}
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
              as={TextInput}
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
