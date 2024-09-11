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
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';

interface AcquisitionStepProps {
  setFormDetails: React.Dispatch<React.SetStateAction<AssetFormDetails>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  formDetails: AssetFormDetails;
}
const AcquisitionStep = (props: AcquisitionStepProps) => {
  const { setActiveStep, setFormDetails, formDetails } = props;

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
    vendorDetail: formDetails.vendorDetail ?? '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: acquisitionInfoSchema,
    onSubmit: async (values) => {
      setFormDetails((prev) => ({ ...prev, ...values }));
      setActiveStep(2);
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
