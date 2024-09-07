import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';

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
      <SimpleGrid columns={3} width="full" gap="20px">
        <Field
          as={TextInput}
          name="purchasePrice"
          type="number"
          label="Purchase Price"
        />
      </SimpleGrid>
    </HStack>
  );
};

export default PurchasePrice;
