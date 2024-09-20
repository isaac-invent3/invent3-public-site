import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { acquisitionInfoSchema } from '~/lib/schemas/asset/main.schema';
import FormActionButtons from '../FormActionButtons';
import AcquisitionDateConditon from './AcquisitionDateCondition';
import PurchasePrice from './PurchasePrice';
import WarrantyDetails from './WarrantyDetails';
import DepreciationDetails from './DepreciationDetails';
import VendorDetails from './VendorDetails';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/assetSlice';

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
    conditionId: formDetails.conditionId ?? '',
    initialValue: formDetails.initialValue ?? undefined,
    warrantyStartDate: formDetails.warrantyStartDate ?? '',
    warrantyEndDate: formDetails.warrantyEndDate ?? '',
    warrantyTerms: formDetails.warrantyTerms ?? '',
    paymentTerms: formDetails.paymentTerms ?? '',
    depreciationStartDate: formDetails.depreciationStartDate ?? '',
    depreciationMethod: formDetails.depreciationMethod ?? '',
    depreciationRate: formDetails.depreciationRate ?? undefined,
    vendorId: formDetails.vendorId ?? '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: acquisitionInfoSchema,
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
            width="full"
            alignItems="flex-start"
            position="relative"
            bgColor="white"
            pt="26px"
            pl="16px"
            pb="24px"
            pr="29px"
            rounded="6px"
          >
            <VStack
              width="full"
              alignItems="flex-start"
              maxW="92%"
              spacing="24px"
            >
              <AcquisitionDateConditon />
              <PurchasePrice />
              <WarrantyDetails />
              <DepreciationDetails />
              <VendorDetails />
            </VStack>
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons activeStep={1} setActiveStep={setActiveStep} />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default AcquisitionStep;
