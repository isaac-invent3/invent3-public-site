import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { BackButton, Button } from '@repo/ui/components';
import Summary from './Summary';
import CostBreakdownTable from './CostBreakdownTable';

interface ReviewProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Review = (props: ReviewProps) => {
  const { activeStep, setActiveStep } = props;
  return (
    <VStack
      width="full"
      height="full"
      alignItems="flex-start"
      justifyContent="space-between"
      display={activeStep === 4 ? 'flex' : 'none'}
      px={{ lg: 8 }}
    >
      <VStack width="full" spacing={{ base: 4, lg: 8 }} alignItems="flex-start">
        <Summary />
        <CostBreakdownTable />
      </VStack>
      <HStack width="full" justifyContent="space-between">
        <BackButton
          handleClick={() => setActiveStep(3)}
          variant="secondary"
          customStyles={{
            height: '50px',
            width: '96px',
            justifyContent: 'center',
          }}
        />
        <HStack spacing={4}>
          <Button customStyles={{ width: '128px' }} variant="outline">
            Export Excel
          </Button>
          <Button customStyles={{ width: '177px' }}>
            Export Lifecycle Plan
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Review;
