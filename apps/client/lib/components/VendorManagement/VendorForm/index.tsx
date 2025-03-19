'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FormStepper, SlideTransition } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import VendorInfo from './VendorInfo';
import ContactInformation from './ContactInformation';
import ContractDetails from './ContractDetails';
import SummaryStep from './Summary';
import withFormLeaveDialog from '../../UI/FormLeaveDialogProvider';
const STEPS = [
  'Vendor Info',
  'Contact Information',
  'Contract Details',
  'Summary',
];

interface VendorFormProps {
  type: 'create' | 'edit';
}
const VendorForm = (props: VendorFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>
        {type === 'create' ? 'Add New Vendor' : 'Edit Vendor'}
      </PageHeader>
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <VendorInfo
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          type={type}
        />
        <SlideTransition trigger={activeStep === 2}>
          <ContactInformation
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 3}>
          <ContractDetails
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 4}>
          <SummaryStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
          />
        </SlideTransition>
      </Flex>
    </Flex>
  );
};

export default withFormLeaveDialog(VendorForm);
