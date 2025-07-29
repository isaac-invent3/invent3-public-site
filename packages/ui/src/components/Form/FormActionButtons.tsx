import { HStack, Icon, Text as ChakraText, Stack } from '@chakra-ui/react';

import Button from '../Button';
import { ChevronLeftIcon } from '../CustomIcons';

interface FormActionButtonsProps {
  activeStep: number;
  totalStep: number;
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  handleContinue?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  cancelLink?: string;
  cancelAction?: () => void;
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
    cancelAction,
    disablePrimaryButton = false,
    disableBackButton = false,
    type,
    children,
  } = props;

  return (
    <Stack
      width="full"
      direction={{ base: 'row' }}
      justifyContent={{ base: 'space-between' }}
      alignItems={{ base: 'center', md: 'space-between' }}
    >
      <Button
        customStyles={{
          px: '16px',
          bgColor: '#F6F6F666',
          display: activeStep === 1 ? 'none' : 'flex',
          width: { base: 'full', md: '96px' },
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
        <ChakraText color="primary.500">Back</ChakraText>
      </Button>

      <HStack
        width="full"
        spacing="16px"
        flexWrap={{ base: 'wrap' }}
        justifyContent={{ md: 'flex-end' }}
      >
        {activeStep === 1 && (
          <Button
            type="button"
            customStyles={{
              width: { base: 'full', md: '96px' },
              bgColor: '#F6F6F6B2',
              color: 'primary.500',
            }}
            href={cancelLink}
            handleClick={cancelAction}
          >
            Cancel
          </Button>
        )}
        {children}
        <Button
          type={type ?? (activeStep < totalStep ? 'submit' : 'button')}
          handleClick={() => {
            handleContinue && handleContinue();
          }}
          customStyles={{ width: { base: 'full', md: '167px' } }}
          isLoading={isLoading}
          loadingText={loadingText}
          isDisabled={disablePrimaryButton}
        >
          {activeStep < totalStep ? 'Continue' : (finalText ?? 'Save')}
        </Button>
      </HStack>
    </Stack>
  );
};

export default FormActionButtons;
