import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { InfoIcon } from '../CustomIcons';

interface ErrorMessageProps {
  children: React.ReactNode;
}
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Flex width="full" gap="8px" alignItems="center">
      <Icon as={InfoIcon} color="error.500" />
      <Text color="error.500">{children}</Text>
    </Flex>
  );
};

export default ErrorMessage;
