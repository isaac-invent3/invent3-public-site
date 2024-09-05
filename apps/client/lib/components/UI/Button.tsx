import { Button, Link as ChakraLink } from '@chakra-ui/react';
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
    href,
  } = props;

  const buttonElement = (
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
      minH="50px"
      width="full"
      isLoading={isLoading}
      loadingText={loadingText}
      _focus={{ outline: 'none' }}
      _hover={{ bgColor: 'primary.accent' }}
      _active={{ bgColor: 'primary.accent' }}
      onClick={handleClick}
      {...customStyles}
    >
      {children}
    </Button>
  );

  // If href is provided, render the button as a link
  if (href) {
    // Internal link (using Next.js's Link for routing)
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

export default PrimaryButton;
