import { Text as ChakraText, HStack, Icon, Link } from '@chakra-ui/react';

import Button from '../Button';
import { ChevronLeftIcon } from '../CustomIcons';

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
          bgColor: '#F6F6F666',
          display: activeStep === 1 ? 'none' : 'flex',
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
        <ChakraText color="primary.500">Back</ChakraText>
      </Button>

      <HStack
        spacing="16px"
        w={activeStep === 1 ? 'full' : 'auto'}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
      >
        {activeStep === 1 && (
          <Link href={cancelLink} textDecoration="none">
            <HStack
              cursor="pointer"
              px="16px"
              rounded="8px"
              bgColor="#F6F6F6B2"
              minH="50px"
              minW="96px"
              justifyContent="center"
            >
              <ChakraText size="md" color="primary.500">
                Cancel
              </ChakraText>
            </HStack>
          </Link>
        )}
        {children}
        <Button
          type={(type ?? activeStep < totalStep) ? 'submit' : 'button'}
          handleClick={() => {
            handleContinue && handleContinue();
          }}
          customStyles={{ w: '167px' }}
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
