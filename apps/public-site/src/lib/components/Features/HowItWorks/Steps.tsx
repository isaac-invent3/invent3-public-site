import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  VStack,
} from '@chakra-ui/react';

const steps = [
  {
    title: 'Register & Set Up',
    description:
      'Easily onboard your company, configure asset categories, and define roles.',
  },
  {
    title: 'Add & Track Assets',
    description:
      'Digitally log and track assets with barcode scanning, RFID, or manual entry.',
  },
  {
    title: 'Schedule & Manage Maintenance',
    description:
      'Automate maintenance workflows and track service history effortlessly.',
  },
  {
    title: 'Optimize Costs & Compliance',
    description:
      'Generate detailed reports, analyze cost trends, and ensure full compliance.',
  },
];

const Steps = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: steps.length,
    count: steps.length,
  });

  return (
    <Stepper
      size="sm"
      index={activeStep}
      orientation="vertical"
      minH="402px"
      gap={0}
    >
      {steps.map((step, index) => (
        <Step key={index} onClick={() => setActiveStep(index)}>
          <StepIndicator
            sx={{
              '&.chakra-step__indicator': {
                bgColor: '#0E2642',
              },
            }}
          >
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <VStack alignItems="flex-start" spacing="8px">
            <StepTitle
              fontWeight={800}
              m={0}
              p={0}
              fontSize="16px"
              lineHeight="19.01px"
            >
              {step.title}
            </StepTitle>
            <StepDescription
              m={0}
              p={0}
              fontSize="14px"
              lineHeight="20px"
              color="black"
              maxW={{ lg: '361px' }}
            >
              {step.description}
            </StepDescription>
          </VStack>

          <StepSeparator
            width="2px"
            sx={{
              '&.chakra-step__separator': {
                bgColor: '#0E2642',
              },
            }}
          />
        </Step>
      ))}
    </Stepper>
  );
};

export default Steps;
