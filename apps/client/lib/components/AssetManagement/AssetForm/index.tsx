'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import FormStepper from './FormStepper';
import GeneralStep from './GeneralStep';
import AcquisitionStep from './AcquisitionStep';
import DocumentStep from './DocumentStep';

const AssetForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} />
        {activeStep === 0 && <GeneralStep setActiveStep={setActiveStep} />}
        {activeStep === 1 && <AcquisitionStep setActiveStep={setActiveStep} />}
        {activeStep === 2 && <DocumentStep setActiveStep={setActiveStep} />}
      </Flex>
    </Flex>
  );
};

export default AssetForm;
