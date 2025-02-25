'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import FormSection from './FormSection';
import SummarySection from './SummarySection';
import { SlideTransition } from '@repo/ui/components';
import withFormLeaveDialog from '~/lib/components/UI/FormLeaveDialogProvider';

interface ScheduleFormProps {
  type: 'create' | 'edit';
}
const ScheduleForm = (props: ScheduleFormProps) => {
  const { type } = props;
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <FormSection
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        type={type}
      />
      <SlideTransition trigger={activeStep === 2}>
        <SummarySection
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          type={type}
        />
      </SlideTransition>
    </Flex>
  );
};

export default withFormLeaveDialog(ScheduleForm);
