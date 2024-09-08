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
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';

interface GeneralStepProps {
  setFormDetails: React.Dispatch<React.SetStateAction<AssetFormDetails>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  formDetails: AssetFormDetails;
}
const GeneralStep = (props: GeneralStepProps) => {
  const { setActiveStep, setFormDetails, formDetails } = props;

  const initialValues = {
    images: formDetails.images ?? [],
    name: formDetails.name ?? '',
    description: formDetails.description ?? '',
    assetCode: formDetails.assetCode ?? '',
    make: formDetails.make ?? '',
    model: formDetails.model ?? '',
    serialNo: formDetails.serialNo ?? '',
    codePrefix: formDetails.codePrefix ?? '',
    codeSuffix: formDetails.codeSuffix ?? '',
    category: formDetails.category ?? '',
    subCategory: formDetails.subCategory ?? '',
    weight: formDetails.weight ?? undefined,
    width: formDetails.width ?? undefined,
    height: formDetails.height ?? undefined,
    depth: formDetails.depth ?? undefined,
    owner: formDetails.owner ?? '',
    department: formDetails.department ?? '',
    assignedTo: formDetails.assignedTo ?? '',
    responsibleFor: formDetails.responsibleFor ?? '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: generalInfoSchema,
    onSubmit: async (values) => {
      setFormDetails((prev) => ({ ...prev, ...values }));
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
