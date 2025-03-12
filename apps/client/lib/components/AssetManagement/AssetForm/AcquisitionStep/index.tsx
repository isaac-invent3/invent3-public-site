import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { acquisitionInfoSchema } from '~/lib/schemas/asset/main.schema';
import AcquisitionDateConditon from './AcquisitionDateCondition';
import Purchase from './Purchase';
import WarrantyDetails from './WarrantyDetails';
import DepreciationDetails from './DepreciationDetails';
import VendorDetails from './Vendor/VendorDetails';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { FormActionButtons } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';

interface AcquisitionStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const AcquisitionStep = (props: AcquisitionStepProps) => {
  const { activeStep, setActiveStep } = props;
  const formDetails = useAppSelector((state) => state.asset.assetForm);
  const dispatch = useAppDispatch();

  const initialValues = {
    acquisitionDate: formDetails.acquisitionDate ?? '',
    conditionId: formDetails.conditionId ?? null,
    statusId: formDetails.statusId ?? null,
    assetTypeId: formDetails.assetTypeId ?? null,
    initialValue: formDetails.initialValue ?? undefined,
    purchaseDate: formDetails.purchaseDate ?? '',
    warrantyStartDate: formDetails.warrantyStartDate ?? '',
    warrantyEndDate: formDetails.warrantyEndDate ?? '',
    warrantyDetails: formDetails.warrantyDetails ?? '',
    depreciationStartDate: formDetails.depreciationStartDate ?? '',
    depreciationMethod: formDetails.depreciationMethod ?? '',
    depreciationRate: formDetails.depreciationRate ?? undefined,
    vendorId: formDetails.vendorId ?? null,
    resaleValue: formDetails.resaleValue ?? null,
    scrapValue: formDetails.scrapValue ?? null,
    currentValue: formDetails.currentValue ?? null,
    lifeExpectancy: formDetails.lifeExpectancy ?? null,
    accumulatedDepreciation: formDetails.accumulatedDepreciation ?? null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: acquisitionInfoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateAssetForm(values));
      setActiveStep(3);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 2 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt={{ base: '16px', lg: '26px' }}
            pl={{ md: '24px', lg: '16px' }}
            pb={{ base: '16px', lg: '24px' }}
            pr={{ md: '24px', lg: '29px' }}
            rounded="6px"
            minH={{ lg: '60vh' }}
          >
            <VStack width="full" alignItems="flex-start" spacing="40px">
              <AcquisitionDateConditon />
              <Purchase />
              <WarrantyDetails />
              <DepreciationDetails />
              <VendorDetails />
            </VStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink={`/${ROUTES.ASSETS}`}
              totalStep={5}
              activeStep={2}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default AcquisitionStep;
