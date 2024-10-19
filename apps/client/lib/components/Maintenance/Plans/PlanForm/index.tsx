'use client';

import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import FormStepper from '~/lib/components/UI/Form/FormStepper';
import SlideTransition from '~/lib/components/UI/SlideTransition';
import PlanInfoStep from './PlanInfoStep';
import ScheduleStep from './ScheduleStep';
import SummarySection from './SummaryStep';

const STEPS = ['Plan Info', 'Schedules', 'Summary'];

interface PlanFormProps {
  type: 'create' | 'edit';
}
const PlanForm = (props: PlanFormProps) => {
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
      <Header
        headingText={
          type === 'create'
            ? 'Add New Maintenance Plan'
            : 'Edit Maintenance Plan'
        }
      />
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <PlanInfoStep
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          type={type}
        />
        <SlideTransition trigger={activeStep === 1}>
          <ScheduleStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 2}>
          <SummarySection
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
          />
        </SlideTransition>
      </Flex>
    </Flex>
  );
};

export default PlanForm;
