import { Button as ChakraButton, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

interface ButtonProps {
  children?: React.ReactNode;
  handleClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
  isLoading?: boolean;
  loadingText?: string;
  customStyles?: { [key: string]: unknown };
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
          ? 'white'
          : variant === 'primary'
            ? 'primary.500'
            : '#F6F6F6'
      }
      color={variant === 'primary' ? 'secondary.pale.500' : 'primary.main'}
      rounded="8px"
      fontSize="14px"
      lineHeight="16.63px"
      fontWeight={500}
      p="16px"
      minH="50px"
      width="full"
      isLoading={isLoading}
      loadingText={loadingText}
      _focus={{ outline: 'none' }}
      _hover={{
        bgColor:
          variant === 'outline'
            ? 'primary.500'
            : variant === 'primary'
              ? 'primary.accent'
              : 'none',
        color: variant === 'outline' ? 'secondary.pale.500' : 'initial',
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

  // If href is provided, render the button as a link
  if (href) {
    return (
      <NextLink href={href} passHref>
        <ChakraLink _hover={{ textDecoration: 'none' }}>
          {buttonElement}
        </ChakraLink>
      </NextLink>
    );
  }

  return buttonElement;
};

export default Button;
