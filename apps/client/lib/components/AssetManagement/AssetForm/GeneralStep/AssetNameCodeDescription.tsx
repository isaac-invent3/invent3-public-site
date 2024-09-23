import { Flex, HStack, VStack } from '@chakra-ui/react';
import { Field } from 'formik';

import AssetName from './AssetName';
import TextareaInput from '~/lib/components/UI/TextArea';
import AssetTypeStatus from './AssetTypeStatus';

const AssetNameCodeDescription = () => {
  return (
    <HStack width="full" spacing="16px" alignItems="flex-start" height="full">
      <VStack
        width="full"
        maxW="56%"
        spacing="32px"
        alignItems="flex-start"
        height="full"
      >
        <AssetName />
        <AssetTypeStatus />
      </VStack>
      <Flex width="44%" height="full">
        <Field
          as={TextareaInput}
          name="description"
          type="text"
          label="Description"
          placeholder="Description"
          customStyle={{ height: '150px' }}
        />
      </Flex>
    </HStack>
  );
};

export default AssetNameCodeDescription;
