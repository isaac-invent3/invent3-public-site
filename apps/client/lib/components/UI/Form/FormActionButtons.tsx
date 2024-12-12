import { HStack, Icon, Text } from '@chakra-ui/react';

import { Button } from '@repo/ui/components';
import { ChevronLeftIcon } from '../../CustomIcons';
import Link from 'next/link';

interface FormActionButtonsProps {
  activeStep: number;
  totalStep: number;
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  handleContinue?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  cancelLink: string;
  finalText?: string;
  disablePrimaryButton?: boolean;
  disableBackButton?: boolean;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
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
    disableBackButton = false,
    type,
    children,
  } = props;

  return (
    <HStack width="full" justifyContent="space-between" maxH="50px">
      <Button
        customStyles={{
          px: '16px',
          spacing: '8px',
          bgColor: '#F6F6F666',
          visibility: activeStep === 1 ? 'hidden' : 'visible',
          width: '96px',
          minH: '50px',
          _disabled: {
            bgColor: '#F6F6F666',
            cursor: 'not-allowed',
          },
          _hover: {
            bgColor: '#F6F6F666',
          },
          _focus: {
            bgColor: '#F6F6F666',
          },
          _active: {
            bgColor: '#F6F6F666',
          },
        }}
        isDisabled={disableBackButton}
        handleClick={() => {
          activeStep > 1 && setActiveStep && setActiveStep((prev) => prev - 1);
        }}
      >
        <Icon
          as={ChevronLeftIcon}
          boxSize="16px"
          mb="7px"
          mr="8px"
          color="black"
        />
        <Text color="primary.500">Back</Text>
      </Button>

      <HStack spacing="16px" justifySelf="flex-end">
        {activeStep === 1 && (
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
        {children}
        <Button
          type={(type ?? activeStep < totalStep) ? 'submit' : 'button'}
          handleClick={() => {
            handleContinue && handleContinue();
          }}
          customStyles={{ minW: '167px' }}
          isLoading={isLoading}
          loadingText={loadingText}
          isDisabled={disablePrimaryButton}
        >
          {activeStep < totalStep ? 'Continue' : (finalText ?? 'Save')}
        </Button>
      </HStack>
    </HStack>
  );
};

export default FormActionButtons;
