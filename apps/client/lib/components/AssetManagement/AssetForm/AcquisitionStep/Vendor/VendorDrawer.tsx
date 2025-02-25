import { DrawerBody, DrawerHeader, Flex } from '@chakra-ui/react';
import {
  BackButton,
  FormStepper,
  GenericDrawer,
  SlideTransition,
} from '@repo/ui/components';
import React, { useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import ContactInformation from '~/lib/components/VendorManagement/VendorForm/ContactInformation';
import ContractDetails from '~/lib/components/VendorManagement/VendorForm/ContractDetails';
import SummaryStep from '~/lib/components/VendorManagement/VendorForm/Summary';
import VendorInfo from '~/lib/components/VendorManagement/VendorForm/VendorInfo';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';

const STEPS = [
  'Vendor Info',
  'Contact Information',
  'Contract Details',
  'Summary',
];

interface VendorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
const VendorDrawer = (props: VendorDrawerProps) => {
  const { isOpen, onClose } = props;
  const [activeStep, setActiveStep] = useState(1);
  const dispatch = useAppDispatch();
  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader m={0} px={{ base: '16px', md: '24px' }}>
        <BackButton handleClick={onClose} />
      </DrawerHeader>
      <DrawerBody m={0} p={0} px={{ base: '16px', md: '24px' }}>
        <Flex width="full" direction="column" pb="24px" p={0}>
          <PageHeader>Add New Vendor</PageHeader>
          <Flex width="full" gap="8px" mt="32px" direction="column">
            <FormStepper currentStep={activeStep} steps={STEPS} />
            <VendorInfo
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              type="create"
              cancelAction={onClose}
            />
            <SlideTransition trigger={activeStep === 2}>
              <ContactInformation
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                type="create"
                cancelAction={onClose}
              />
            </SlideTransition>
            <SlideTransition trigger={activeStep === 3}>
              <ContractDetails
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                type="create"
                cancelAction={onClose}
              />
            </SlideTransition>
            <SlideTransition trigger={activeStep === 4}>
              <SummaryStep
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                type="create"
                cancelAction={onClose}
                handleCreateVendor={(vendor) => {
                  dispatch(
                    updateAssetForm({
                      vendorFormDetails: vendor,
                      vendorId: null,
                      vendorDetails: {
                        vendorName: vendor.createVendor.vendorName!,
                        emailAddress: vendor.createVendor.emailAddress!,
                        address: vendor.createVendor.address!,
                        phoneNumber: vendor.createVendor.phoneNumber!,
                      },
                    })
                  );
                  setActiveStep(1);
                  onClose();
                }}
              />
            </SlideTransition>
          </Flex>
        </Flex>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default VendorDrawer;
