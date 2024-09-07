import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { acquisitionInfoSchema } from '~/lib/schemas/asset.schema';
import FormActionButtons from '../FormActionButtons';
import AcquisitionDateConditon from './AcquisitionDateCondition';
import PurchasePrice from './PurchasePrice';
import WarrantyDetails from './WarrantyDetails';
import DepreciationDetails from './DepreciationDetails';
import VendorDetails from './VendorDetails';

interface AcquisitionStepProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const AcquisitionStep = (props: AcquisitionStepProps) => {
  const { setActiveStep } = props;

  const initialValues = {
    acquisitionDate: '',
    assetCondition: '',
    purchasePrice: '',
    warrantyStartDate: '',
    warrantyEndDate: '',
    warrantyTerms: '',
    paymentTerms: '',
    depreciationStartDate: '',
    depreciationMethod: '',
    depreciationRate: '',
    vendorId: '',
    vendorDetail: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: acquisitionInfoSchema,
    onSubmit: async () => {
      setActiveStep(1);
    },
  });

  return (
    <Flex width="full" height="full" direction="column">
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
