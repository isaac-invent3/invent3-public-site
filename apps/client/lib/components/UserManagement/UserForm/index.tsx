'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  FormStepper,
  SlideTransition,
  withFormLeaveDialog,
} from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import EmployeeInfo from './EmployeeInfo';
import OccupationInfo from './OccupationInfo';
import DocumentStep from './Document';
import SummaryStep from './Summary';

const STEPS = ['Employee Info', 'Occupation Info', 'Document', 'Summary'];

interface UserFormProps {
  type: 'create' | 'edit';
}
const UserForm = (props: UserFormProps) => {
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
        {type === 'create' ? 'Add New User' : 'Edit User'}
      </PageHeader>
      <Flex width="full" gap="8px" mt="32px" direction="column">
        <FormStepper currentStep={activeStep} steps={STEPS} />
        <EmployeeInfo activeStep={activeStep} setActiveStep={setActiveStep} />
        <SlideTransition trigger={activeStep === 2}>
          <OccupationInfo
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

export default withFormLeaveDialog(UserForm);
