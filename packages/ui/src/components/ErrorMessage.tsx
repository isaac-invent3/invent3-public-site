import { Flex, Icon, Text as ChakraText, FlexProps } from '@chakra-ui/react';
import { InfoIcon } from './CustomIcons';

interface ErrorMessageProps extends FlexProps {
  children: React.ReactNode | string;
}
const ErrorMessage = ({ children, ...rest }: ErrorMessageProps) => {
  return (
    <Flex width="full" gap="8px" alignItems="center" {...rest}>
      <Icon as={InfoIcon} color="error.500" boxSize="12px" />
      <ChakraText color="error.500">{children}</ChakraText>
    </Flex>
  );
};

export default ErrorMessage;
