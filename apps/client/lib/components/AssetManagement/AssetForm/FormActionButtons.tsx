import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import Button from '../../UI/Button';
import { ChevronLeftIcon } from '../../CustomIcons';

interface FormActionButtonsProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleContinue?: () => void;
  isLoading?: boolean;
  loadingText?: string;
}
const FormActionButtons = (props: FormActionButtonsProps) => {
  const { activeStep, setActiveStep, handleContinue, isLoading, loadingText } =
    props;

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
        )}
        <Button
          type={activeStep < 3 ? 'submit' : 'button'}
          handleClick={() => {
            handleContinue && handleContinue();
          }}
          customStyles={{ minW: '167px' }}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          {activeStep < 3 ? 'Continue' : 'Complete'}
        </Button>
      </HStack>
    </HStack>
  );
};

export default FormActionButtons;
