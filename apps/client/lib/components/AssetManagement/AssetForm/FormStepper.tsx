import { Divider, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { CheckIcon } from '../../CustomIcons';

const steps = [
  { title: 'STEP 1', description: 'General' },
  { title: 'STEP 2', description: 'Acquisition' },
  { title: 'STEP 3', description: 'Document' },
  { title: 'STEP 4', description: 'Summary' },
];

const CompletedIcon = () => {
  return (
    <HStack
      width="24px"
      height="24px"
      bgColor="#34C759"
      rounded="4px"
      justifyContent="center"
    >
      <Icon as={CheckIcon} boxSize="11px" color="white" />
    </HStack>
  );
};

interface ActiveInactiveIconProps {
  active: boolean;
  boxIndex: number;
}
const ActiveInactiveIcon = (props: ActiveInactiveIconProps) => {
  const { active, boxIndex } = props;
  return (
    <HStack
      width="24px"
      height="24px"
      bgColor="primary.500"
      rounded="4px"
      opacity={active ? 1 : 0.5}
      justifyContent="center"
    >
      <Text size="md" color="white" fontWeight={800}>
        {boxIndex + 1}
      </Text>
    </HStack>
  );
};

interface FormStepperProps {
  currentStep: number;
}

const FormStepper = (props: FormStepperProps) => {
  const { currentStep } = props;
  return (
    <Flex
      width="full"
      pt="19px"
      pb="18px"
      px="16px"
      bgColor="#B4BFCA80"
      rounded="4px"
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        maxW="85%"
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <HStack spacing="12px" mr="32px">
              {currentStep > index && <CompletedIcon />}
              {currentStep <= index && (
                <ActiveInactiveIcon
                  boxIndex={index}
                  active={index === currentStep}
                />
              )}
              <VStack spacing="4px" alignItems="flex-start">
                <Text
                  color="neutral.600"
                  letterSpacing="0.2em"
                  fontSize="10px"
                  fontWeight={700}
                  lineHeight="11.88px"
                >
                  {step.title}
                </Text>
                <Text fontSize="md" color="black" fontWeight={700}>
                  {step.description}
                </Text>
              </VStack>
            </HStack>
            {index !== steps.length - 1 && (
              <Divider
                orientation="horizontal"
                borderWidth="2px"
                borderColor="neutral.600"
                w="full"
                mr="29px"
                rounded="full"
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default FormStepper;
