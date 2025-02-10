'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import GeneralStep from './GeneralStep';
import AcquisitionStep from './AcquisitionStep';
import DocumentStep from './DocumentStep';
import SummaryStep from './SummaryStep';
import {
  SlideTransition,
  FormStepper,
  withFormLeaveDialog,
} from '@repo/ui/components';
import Header from './Header';
import MaintenancePlanStep from './MaintenancePlanStep';

const STEPS = [
  'General',
  'Acquisition',
  'Maintenance Plan',
  'Document',
  'Summary',
];

interface AssetFormProps {
  type: 'create' | 'edit';
}
const AssetForm = (props: AssetFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(2);
  return (
    <Flex width="full" direction="column" pb={{ md: '24px' }}>
      <Header type={type} />
      <Flex width="full" gap={{ md: '8px' }} mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <Flex
          width="full"
          px={{ base: '16px', md: 0 }}
          bgColor={{ base: 'white', md: 'transparent' }}
          direction="column"
          pb="24px"
        >
          <GeneralStep activeStep={activeStep} setActiveStep={setActiveStep} />
          <SlideTransition trigger={activeStep === 2}>
            <AcquisitionStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </SlideTransition>
          <SlideTransition trigger={activeStep === 3}>
            <MaintenancePlanStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </SlideTransition>
          <SlideTransition trigger={activeStep === 4}>
            <DocumentStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </SlideTransition>
          <SlideTransition trigger={activeStep === 5}>
            <SummaryStep
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              type={type}
            />
          </SlideTransition>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withFormLeaveDialog(AssetForm);
