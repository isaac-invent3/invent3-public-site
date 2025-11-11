import { HStack } from '@chakra-ui/react';
import { CheckBox, FormSectionInfo } from '@repo/ui/components';
import { useFormikContext } from 'formik';
import React from 'react';
import { AssetFormDetails } from '~/lib/interfaces/asset/general.interface';

const IsAssetReusable = () => {
  const { setFieldValue, values } = useFormikContext<AssetFormDetails>();
  return (
    <HStack alignItems="flex-start" spacing="24px">
      <CheckBox
        isChecked={values?.isReusable ?? false}
        handleChange={() => setFieldValue('isReusable', !values.isReusable)}
        customStyle={{
          width: '20px',
          height: '20px',
          borderColor: 'neutral.300',
        }}
      />
      <FormSectionInfo
        title="Asset is Re-usable"
        info="Select if asset is a component asset and can used multiple times"
        isRequired={false}
      />
    </HStack>
  );
};

export default IsAssetReusable;
