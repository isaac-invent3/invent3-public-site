import { SimpleGrid } from '@chakra-ui/react';

import { Field } from 'formik';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';

const AssetDetail = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="118px"
      customSpacing="104px"
      description="Provide essential information about the asset being added."
      title="Details"
      isRequired
      direction={{ base: 'column', md: 'row' }}
    >
      <SimpleGrid width="full" columns={{ base: 1, md: 3, lg: 4 }} gap="11px">
        <Field as={FormTextInput} name="brandName" type="text" label="Make" />
        <Field as={FormTextInput} name="modelRef" type="text" label="Model" />
        <Field
          as={FormTextInput}
          name="serialNo"
          type="text"
          label="Serial No."
        />
      </SimpleGrid>
    </FormInputWrapper>
  );
};

export default AssetDetail;
