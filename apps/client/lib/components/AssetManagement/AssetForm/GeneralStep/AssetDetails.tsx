import { Flex, HStack, SimpleGrid } from '@chakra-ui/react';

import SectionInfo from '../../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextInput from '~/lib/components/UI/TextInput';

const AssetDetail = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="104px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Details"
          info="Choose the category and the sub-category"
          isRequired
        />
      </Flex>
      <SimpleGrid width="full" columns={4} gap="11px">
        <Field as={TextInput} name="brandName" type="text" label="Make" />
        <Field as={TextInput} name="modelRef" type="text" label="Model" />
        <Field as={TextInput} name="serialNo" type="text" label="Serial No." />
      </SimpleGrid>
    </HStack>
  );
};

export default AssetDetail;
