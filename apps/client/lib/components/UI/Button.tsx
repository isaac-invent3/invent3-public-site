import { Button } from '@chakra-ui/react';

interface ButtonProps {
  children?: React.ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  loadingText?: string;
  customStyles?: { [key: string]: unknown };
  isDisabled?: boolean;
}
const PrimaryButton = (props: ButtonProps) => {
  const {
    children,
    handleClick,
    customStyles,
    type,
    isLoading,
    loadingText = 'Submitting...',
    isDisabled,
  } = props;

  return (
    <Button
      type={type || 'button'}
      isDisabled={isLoading || isDisabled}
      bgColor="primary.500"
      color="secondary.pale.500"
      rounded="8px"
      fontSize="14px"
      lineHeight="16.63px"
      fontWeight={500}
      p="16px"
      height="50px"
      width="full"
      isLoading={isLoading}
      loadingText={loadingText}
      _focus={{
        outline: 'none',
      }}
      _hover={{
        bgColor: 'primary.accent',
      }}
      _active={{
        bgColor: 'primary.accent',
      }}
      onClick={handleClick}
      {...customStyles}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
