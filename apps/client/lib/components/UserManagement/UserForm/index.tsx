'use client';

import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FormStepper, SlideTransition } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import DocumentStep from './Document';
import SummaryStep from './Summary';
import OccupationInfo from './OccupationInfo';
import EmployeeInfo from './EmployeeInfo';
import withFormLeaveDialog from '../../UI/FormLeaveDialogProvider';

interface UserFormProps {
  type: 'create' | 'edit';
  formCreationType?: 'manual' | 'idp';
}
const UserForm = (props: UserFormProps) => {
  const { type, formCreationType = 'manual' } = props;
  const [activeStep, setActiveStep] = useState(1);
  const isManual = formCreationType === 'manual';
  const stepReduction = isManual ? 0 : 1;
  const STEPS = [
    isManual || type === 'edit' ? 'Employee Info' : 'Add Employee',
    ...(isManual || type === 'edit' ? ['Occupation Info'] : []),
    'Document',
    'Summary',
  ];
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
        <EmployeeInfo
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isManual={isManual}
        />
        {formCreationType === 'manual' && (
          <SlideTransition trigger={activeStep === 2}>
            <OccupationInfo
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </SlideTransition>
        )}
        <SlideTransition trigger={activeStep === 3 - stepReduction}>
          <DocumentStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            isManual={isManual}
          />
        </SlideTransition>
        <SlideTransition trigger={activeStep === 4 - stepReduction}>
          <SummaryStep
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type={type}
            isManual={isManual}
          />
        </SlideTransition>
      </Flex>
    </Flex>
  );
};

export default withFormLeaveDialog(UserForm);
