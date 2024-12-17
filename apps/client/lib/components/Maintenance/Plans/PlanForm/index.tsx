'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from './Header';
import PlanInfoStep from './PlanInfoStep';
import ScheduleStep from './ScheduleStep';
import SummarySection from './SummaryStep';
import {
  FormStepper,
  withFormLeaveDialog,
  SlideTransition,
} from '@repo/ui/components';

const STEPS = ['Plan Info', 'Schedules', 'Summary'];

interface PlanFormProps {
  type: 'create' | 'edit';
}
const PlanForm = (props: PlanFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header
        headingText={
          type === 'create'
            ? 'Add New Maintenance Plan'
            : 'Edit Maintenance Plan'
        }
      />
      <Flex width="full" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <PlanInfoStep
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          type={type}
        />
        <SlideTransition trigger={activeStep === 2}>
          <ScheduleStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 3}>
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

export default withFormLeaveDialog(PlanForm);
