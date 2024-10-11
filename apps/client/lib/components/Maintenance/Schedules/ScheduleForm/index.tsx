'use client';

import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FormSection from './FormSection';
import SummarySection from './SummarySection';
import SlideTransition from '~/lib/components/UI/SlideTransition';

interface ScheduleFormProps {
  type: 'create' | 'edit';
}
const ScheduleForm = (props: ScheduleFormProps) => {
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
      <FormSection
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        type={type}
      />
      <SlideTransition trigger={activeStep === 1}>
        <SummarySection
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          type={type}
        />
      </SlideTransition>
    </Flex>
  );
};

export default ScheduleForm;
