import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { generalInfoSchema } from '~/lib/schemas/asset/main.schema';
import AssetImages from './AssetImages';
import AssetDetail from './AssetDetails';
import AssetDimension from './AssetDimension';
import AssetOwner from './AssetOwner';
import AssetNameCodeDescription from './AssetNameCodeDescription';
import FormActionButtons from '../FormActionButtons';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import AssetLocation from './AssetLocation';
import AssetCategory from './AssetCategory';

interface GeneralStepProps {
  setFormDetails: React.Dispatch<React.SetStateAction<AssetFormDetails>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  formDetails: AssetFormDetails;
}
const GeneralStep = (props: GeneralStepProps) => {
  const { setActiveStep, setFormDetails, formDetails } = props;

  const formik = useFormik({
    initialValues: {
      images: formDetails.images ?? [],
      assetName: formDetails.assetName ?? '',
      description: formDetails.description ?? '',
      assetCode: formDetails.assetCode ?? '',
      brandName: formDetails.brandName ?? '',
      modelRef: formDetails.modelRef ?? '',
      serialNo: formDetails.serialNo ?? '',
      codePrefix: formDetails.codePrefix ?? '',
      codeSuffix: formDetails.codeSuffix ?? '',
      categoryId: formDetails.categoryId ?? '',
      subCategoryId: formDetails.subCategoryId ?? '',
      weightKg: formDetails.weightKg ?? undefined,
      widthCm: formDetails.widthCm ?? undefined,
      heightCm: formDetails.heightCm ?? undefined,
      depthCm: formDetails.depthCm ?? undefined,
      currentOwner: formDetails.currentOwner ?? '',
      department: formDetails.department ?? '',
      assignedTo: formDetails.assignedTo ?? '',
      responsibleFor: formDetails.responsibleFor ?? '',
      facilityId: formDetails.facilityId ?? null,
      floorId: formDetails.floorId ?? null,
      departmentId: formDetails.departmentId ?? null,
      roomId: formDetails.roomId ?? null,
      aisleId: formDetails.aisleId ?? null,
      shelfId: formDetails.shelfId ?? null,
    },
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
            <AssetLocation
              errors={formik.errors}
              setFieldValue={formik.setFieldValue}
            />
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
