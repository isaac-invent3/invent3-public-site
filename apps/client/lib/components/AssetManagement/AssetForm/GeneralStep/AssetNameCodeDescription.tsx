import { Flex, HStack, VStack } from '@chakra-ui/react';
import AssetName from './AssetName';
import AssetCode from './AssetCode';
import TextareaInput from '~/lib/components/UI/TextArea';
import { Field } from 'formik';

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
        <AssetCode />
      </VStack>
      <Flex width="44%" height="full">
        <Field
          as={TextareaInput}
          name="description"
          type="text"
          label="Description"
          placeholder="Description"
          customStyle={{ height: '133px' }}
        />
      </Flex>
    </HStack>
  );
};

export default AssetNameCodeDescription;
