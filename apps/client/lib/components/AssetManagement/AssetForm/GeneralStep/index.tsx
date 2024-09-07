import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { generalInfoSchema } from '~/lib/schemas/asset.schema';
import AssetImages from './AssetImages';
import AssetCategory from './AssetCategory';
import AssetDetail from './AssetDetails';
import AssetDimension from './AssetDimension';
import AssetOwner from './AssetOwner';
import AssetNameCodeDescription from './AssetNameCodeDescription';
import FormActionButtons from '../FormActionButtons';

interface GeneralStepProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const GeneralStep = (props: GeneralStepProps) => {
  const { setActiveStep } = props;

  const initialValues = {
    images: [],
    name: '',
    description: '',
    assetCode: '',
    make: '',
    model: '',
    serialNo: '',
    codePrefix: '',
    codeSuffix: '',
    category: '',
    subCategory: '',
    weight: '',
    width: '',
    height: '',
    depth: '',
    owner: '',
    department: '',
    assignedTo: '',
    responsibleFor: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: generalInfoSchema,
    onSubmit: async () => {
      setActiveStep(1);
    },
  });

  return (
    <Flex width="full" height="full" direction="column">
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="32px"
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="33px"
            pr="44px"
            rounded="6px"
          >
            <AssetImages />
            <AssetNameCodeDescription />
            <AssetCategory />
            <AssetDetail />
            <AssetDimension />
            <AssetOwner />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons activeStep={0} setActiveStep={setActiveStep} />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default GeneralStep;
