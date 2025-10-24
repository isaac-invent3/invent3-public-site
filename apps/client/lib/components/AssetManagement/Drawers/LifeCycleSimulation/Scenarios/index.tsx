import { Box, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ScenarioTable from './ScenarioTable';
import Graphs from './Graphs';
import { InfoIcon } from '@chakra-ui/icons';
import { BackButton, Button } from '@repo/ui/components';
import InfoCard from '~/lib/components/UI/InfoCard';

interface ScenariosProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const labels = [
  {
    color: '#8D35F1',
    label: 'Normal Plan',
    description: 'How things will go if you keep current settings',
  },
  {
    color: '#07CC3B',
    label: 'Smart Plan',
    description: 'Best plan suggested by AI to save cost and reduce risk',
  },
  {
    color: '#EABC30',
    label: 'Late Plan',
    description:
      'What happens if you wait too long to fix or replace the asset.',
  },
];
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
        <Stack
          width="full"
          direction={{ base: 'column', lg: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <InfoCard
            infoText="AI uses predictive lifecycle patterns to estimate cost and residual value over time."
            customStyle={{ width: 'max-content', maxHeight: 'max-content' }}
          />
          <VStack alignItems="flex-start">
            {labels?.map((item, index) => (
              <HStack key={index} spacing={4} justifyContent="flex-start">
                <Box width="30px" height="2px" bgColor={item.color} />
                <Text
                  fontWeight={400}
                  color="neutral.800"
                  fontSize="10px"
                  width="60px"
                  whiteSpace="nowrap"
                >
                  {item.label}
                </Text>
                <Text fontWeight={400} color="neutral.800" fontSize="10px">
                  {item.description}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Stack>
        <Graphs />
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
