import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ScenarioTable from './ScenarioTable';
import Graphs from './Graphs';
import { InfoIcon } from '@chakra-ui/icons';
import { BackButton, Button } from '@repo/ui/components';

interface ScenariosProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Scenarios = (props: ScenariosProps) => {
  const { activeStep, setActiveStep } = props;
  return (
    <VStack
      width="full"
      height="full"
      alignItems="flex-start"
      justifyContent="space-between"
      display={activeStep === 3 ? 'flex' : 'none'}
      px={{ lg: 8 }}
    >
      <VStack width="full" spacing={{ base: 4, lg: 8 }} alignItems="flex-start">
        <ScenarioTable />
        <Graphs />
        <HStack
          spacing={2}
          rounded="8px"
          justifyContent="center"
          flexShrink={0}
          bgColor="#0366EF0D"
          p={2}
        >
          <Icon as={InfoIcon} boxSize="16px" color="blue.500" />
          <Text color="blue.500" fontSize="10px">
            AI uses predictive lifecycle patterns to estimate cost and residual
            value over time.
          </Text>
        </HStack>
      </VStack>
      <HStack width="full" justifyContent="space-between">
        <BackButton
          handleClick={() => setActiveStep(2)}
          variant="secondary"
          customStyles={{
            height: '50px',
            width: '96px',
            justifyContent: 'center',
          }}
        />
        <Button
          customStyles={{ width: '161px' }}
          handleClick={() => setActiveStep(4)}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export default Scenarios;
