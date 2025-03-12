import { Flex } from '@chakra-ui/react';
import React from 'react';
import ManualInsertion from './ManualInsertion';
import IDP from './IDP';

interface EmployeeInfoProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  isManual: boolean;
}
const EmployeeInfo = (props: EmployeeInfoProps) => {
  const { activeStep, setActiveStep, isManual } = props;
  return (
    <Flex>
      {isManual && (
        <ManualInsertion
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {!isManual && (
        <IDP activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
    </Flex>
  );
};

export default EmployeeInfo;
