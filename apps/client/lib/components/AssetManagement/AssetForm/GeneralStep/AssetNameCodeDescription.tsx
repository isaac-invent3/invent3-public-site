import { Flex, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Field } from 'formik';

import TextareaInput from '~/lib/components/UI/TextArea';
import AssetCategory from './AssetCategory';
import TextInput from '~/lib/components/UI/TextInput';
import SectionInfo from '../../../UI/Form/FormSectionInfo';

const AssetNameCodeDescription = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px" direction="column" gap="14px">
        <SectionInfo
          title="Asset Name"
          info="Add name that users can likely search with"
          isRequired
        />
        <SectionInfo
          title="Category"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="11px" width="full">
        <GridItem colSpan={2}>
          <VStack
            width="full"
            spacing="32px"
            alignItems="flex-start"
            height="full"
          >
            <Field
              as={TextInput}
              name="assetName"
              type="text"
              label="Name"
              placeholder="Name"
            />
            <AssetCategory />
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <Field
            as={TextareaInput}
            name="description"
            type="text"
            label="Description"
            placeholder="Description"
            customStyle={{ height: '133px' }}
          />
        </GridItem>
      </Grid>
    </HStack>
  );
};

export default AssetNameCodeDescription;
