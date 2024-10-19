import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import Button from '../Button';
import { ChevronLeftIcon } from '../../CustomIcons';
import Link from 'next/link';

interface FormActionButtonsProps {
  activeStep: number;
  totalStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleContinue?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  cancelLink: string;
  finalText?: string;
  disablePrimaryButton?: boolean;
}
const FormActionButtons = (props: FormActionButtonsProps) => {
  const {
    activeStep,
    totalStep,
    setActiveStep,
    handleContinue,
    isLoading,
    loadingText,
    finalText,
    cancelLink,
    disablePrimaryButton = false,
  } = props;

  return (
    <HStack width="full" justifyContent="space-between" maxH="50px">
      <HStack
        cursor="pointer"
        px="16px"
        rounded="8px"
        spacing="8px"
        bgColor="#F6F6F666"
        visibility={activeStep === 0 ? 'hidden' : 'visible'}
        minW="96px"
        minH="50px"
        onClick={() => {
          activeStep > 0 && setActiveStep((prev) => prev - 1);
        }}
      >
        <Icon as={ChevronLeftIcon} boxSize="16px" mb="7px" />
        <Text color="primary.500">Back</Text>
      </HStack>

      <HStack spacing="16px" justifySelf="flex-end">
        {activeStep === 0 && (
          <Link href={cancelLink}>
            <HStack
              cursor="pointer"
              px="16px"
              rounded="8px"
              bgColor="#F6F6F6B2"
              minH="50px"
              minW="96px"
              justifyContent="center"
            >
              <Text size="md" color="primary.500">
                Cancel
              </Text>
            </HStack>
          </Link>
        )}
        <Button
          type={activeStep < totalStep ? 'submit' : 'button'}
          handleClick={() => {
            handleContinue && handleContinue();
          }}
          customStyles={{ minW: '167px' }}
          isLoading={isLoading}
          loadingText={loadingText}
          isDisabled={disablePrimaryButton}
        >
          {activeStep < totalStep ? 'Continue' : (finalText ?? 'Finish')}
        </Button>
      </HStack>
    </HStack>
  );
};

export default FormActionButtons;
