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

const STEPS = ['General', 'Acquisition', 'Document', 'Summary'];

interface AssetFormProps {
  type: 'create' | 'edit';
}
const AssetForm = (props: AssetFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header type={type} />
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <GeneralStep activeStep={activeStep} setActiveStep={setActiveStep} />
        <SlideTransition trigger={activeStep === 2}>
          <AcquisitionStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 3}>
          <DocumentStep activeStep={activeStep} setActiveStep={setActiveStep} />
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

export default withFormLeaveDialog(AssetForm);
