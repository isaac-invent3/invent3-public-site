'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import FormStepper from './FormStepper';
import GeneralStep from './GeneralStep';

const AssetForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} />
        <GeneralStep />
      </Flex>
    </Flex>
  );
};

export default AssetForm;
