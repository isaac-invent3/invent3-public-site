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
import AssetLocation from './AssetLocation';
import AssetCategory from './AssetCategory';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

interface GeneralStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const GeneralStep = (props: GeneralStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      images: formDetails.images ?? [],
      assetName: formDetails.assetName ?? '',
      description: formDetails.description ?? '',
      brandName: formDetails.brandName ?? '',
      modelRef: formDetails.modelRef ?? '',
      serialNo: formDetails.serialNo ?? '',
      categoryId: formDetails.categoryId ?? null,
      subCategoryId: formDetails.subCategoryId ?? null,
      statusId: formDetails.statusId ?? null,
      assetTypeId: formDetails.assetTypeId ?? null,
      weightKg: formDetails.weightKg ?? null,
      widthCm: formDetails.widthCm ?? null,
      heightCm: formDetails.heightCm ?? null,
      lengthCm: formDetails.lengthCm ?? null,
      currentOwner: formDetails.currentOwner ?? '',
      assignedTo: formDetails.assignedTo ?? '',
      responsibleFor: formDetails.responsibleFor ?? '',
      countryId: formDetails.countryId ?? null,
      stateId: formDetails.stateId ?? null,
      lgaId: formDetails.lgaId ?? null,
      facilityId: formDetails.facilityId ?? null,
      floorId: formDetails.floorId ?? null,
      departmentId: formDetails.departmentId ?? null,
      roomId: formDetails.roomId ?? null,
      aisleId: formDetails.aisleId ?? null,
      shelfId: formDetails.shelfId ?? null,
    },
    validationSchema: generalInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateAssetForm(values));
      setActiveStep(1);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 0 ? 'flex' : 'none'}
    >
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
            minH="60vh"
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
