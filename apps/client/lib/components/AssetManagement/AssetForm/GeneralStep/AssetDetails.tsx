import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';

import { Field } from 'formik';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';

const AssetDetail = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <FormSectionInfo
          title="Details"
          info="Provide essential information about the asset being added."
          isRequired
        />
      </Flex>
      <SimpleGrid width="full" columns={4} gap="11px">
        <Field as={FormTextInput} name="brandName" type="text" label="Make" />
        <Field as={FormTextInput} name="modelRef" type="text" label="Model" />
        <Field
          as={FormTextInput}
          name="serialNo"
          type="text"
          label="Serial No."
        />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetDetail;
