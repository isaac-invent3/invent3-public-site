import {
  Box,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
  Stepper,
  Text,
  VStack,
  useSteps,
} from '@chakra-ui/react';
const steps = [
  { title: 'Ticket created', description: '23/10/2024', color: '#C4C4C4' },
  {
    title: (
      <p>
        <strong>George Clooney</strong> Created a schedule for the ticket
      </p>
    ),
    description: '23/10/2024',
    color: '#FF7A37',
  },
  {
    title: (
      <p>
        <strong>George Clooney</strong> assigned the ticket to{' '}
        <strong>George Clooney</strong>
      </p>
    ),
    description: '23/10/2024',
    color: '#7DAEF2',
  },
  {
    title: <strong>View more activity</strong>,
    color: '#C4C4C4',
  },
];

const TicketActivity = () => {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      spacing="10px"
      pt="24px"
      px="24px"
    >
      <Text>Ticket Activity</Text>

      <Stepper
        size={'md'}
        index={activeStep}
        orientation="vertical"
        height="230px"
        gap="0"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator border="none">
              <Box
                width="30px"
                height="30px"
                rounded="full"
                bgColor={step.color}
                border={'none'}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <Text>{step.title}</Text>
              <Text color="#656565" fontSize="11px" fontWeight={500}>{step.description}</Text>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </VStack>
  );
};

export default TicketActivity;
