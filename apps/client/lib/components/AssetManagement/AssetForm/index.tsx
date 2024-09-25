'use client';

import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FormStepper from './FormStepper';
import GeneralStep from './GeneralStep';
import AcquisitionStep from './AcquisitionStep';
import DocumentStep from './DocumentStep';
import SummaryStep from './SummaryStep';
import SlideTransition from '../../UI/SlideTransition';
import Header from './Header';

interface AssetFormProps {
  type: 'create' | 'edit';
}
const AssetForm = (props: AssetFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header type={type} />
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} />
        <GeneralStep activeStep={activeStep} setActiveStep={setActiveStep} />
        <SlideTransition trigger={activeStep === 1}>
          <AcquisitionStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 2}>
          <DocumentStep activeStep={activeStep} setActiveStep={setActiveStep} />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 3}>
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

export default AssetForm;
