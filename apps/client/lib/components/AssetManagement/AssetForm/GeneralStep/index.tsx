import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { generalInfoSchema } from '~/lib/schemas/asset/main.schema';
import AssetImages from './AssetImages';
import AssetDetail from './AssetDetails';
import AssetDimension from './AssetDimension';
import AssetOwner from './AssetOwner';
import AssetNameCodeDescription from './AssetNameCodeDescription';
import AssetLocation from './AssetLocation';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import ParentAsset from './ParentAsset';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface GeneralStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const GeneralStep = (props: GeneralStepProps) => {
  const { activeStep, setActiveStep } = props;
  const asset = useAppSelector((state) => state.asset.asset);
  const formDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      images: formDetails.images ?? [],
      assetName: formDetails.assetName ?? '',
      description: formDetails.description ?? '',
      brandName: formDetails.brandName ?? '',
      parentId: formDetails.parentId ?? null,
      modelRef: formDetails.modelRef ?? '',
      serialNo: formDetails.serialNo ?? '',
      categoryId: formDetails.categoryId ?? null,
      subCategoryId: formDetails.subCategoryId ?? null,
      weightKg: formDetails.weightKg ?? null,
      widthCm: formDetails.widthCm ?? null,
      heightCm: formDetails.heightCm ?? null,
      lengthCm: formDetails.lengthCm ?? null,
      currentOwner: formDetails.currentOwner ?? null,
      assignedTo: formDetails.assignedTo ?? null,
      responsibleFor: formDetails.responsibleFor ?? null,
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
      setActiveStep(2);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing={{ base: '24px', lg: '43px' }}
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '33px' }}
            pr={{ md: '24px', lg: '44px' }}
            rounded="6px"
            minH="60vh"
          >
            <AssetImages />
            <AssetNameCodeDescription />
            <AssetDetail />
            {asset === null && <ParentAsset />}
            <AssetDimension />
            <AssetLocation setFieldValue={formik.setFieldValue} />
            <AssetOwner />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.ASSETS}`}
              totalStep={5}
              activeStep={1}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default GeneralStep;
