import { Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';

const AssetCode = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Asset Code"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Grid width="full" gap="8px" templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1}>
          <Field
            as={TextInput}
            name="codePrefix"
            type="text"
            label="Code Prefix"
            placeholder="Code Prefix"
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Field
            as={TextInput}
            name="assetCode"
            type="text"
            label="Asset Code"
            placeholder="Asset Code"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Field
            as={TextInput}
            name="codeSuffix"
            type="text"
            label="Code Suffix"
            placeholder="Code Suffix"
          />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AssetCode;
