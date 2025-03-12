import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

interface ButtonProps {
  children?: React.ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  loadingText?: string;
  customStyles?: ChakraButtonProps;
  isDisabled?: boolean;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button = (props: ButtonProps) => {
  const {
    children,
    handleClick,
    customStyles,
    type,
    isLoading,
    loadingText = 'Submitting...',
    variant = 'primary',
    isDisabled,
    href,
  } = props;

  const buttonElement = (
    <ChakraButton
      type={type || 'button'}
      isDisabled={isLoading || isDisabled}
      borderWidth={variant === 'outline' ? '1px' : 'none'}
      borderColor="primary.500"
      bgColor={
        variant === 'outline'
          ? 'transparent'
          : variant === 'primary'
            ? 'primary.500'
            : '#F6F6F6'
      }
      color={variant === 'primary' ? 'secondary.pale.500' : ''}
      rounded="8px"
      fontSize="14px"
      lineHeight="16.63px"
      fontWeight={500}
      p="16px"
      height="full"
      maxH={{ base: '50px' }}
      width="full"
      isLoading={isLoading}
      as={href ? 'a' : 'button'}
      {...(href ? { href } : {})}
      loadingText={loadingText}
      _focus={{ outline: 'none' }}
      _hover={{
        bgColor:
          variant === 'outline'
            ? 'neutral.200'
            : variant === 'primary'
              ? 'primary.accent'
              : 'none',
      }}
      _active={{
        bgColor:
          variant === 'primary' || variant === 'outline'
            ? 'primary.accent'
            : 'none',
      }}
      onClick={handleClick}
      {...customStyles}
    >
      {children}
    </ChakraButton>
  );

  return buttonElement;
};

export default Button;
