import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';

const AssetName = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Asset Name"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={TextInput}
        name="assetName"
        type="text"
        label="Name"
        placeholder="Name"
      />
    </HStack>
  );
};

export default AssetName;
