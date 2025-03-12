import { Heading, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { InfoIcon } from '../CustomIcons';

interface GenericErrorStateProps {
  title?: string;
  subtitle?: string;
}
const GenericErrorState = (props: GenericErrorStateProps) => {
  const { title, subtitle } = props;

  return (
    <VStack
      width="full"
      spacing="16px"
      height="full"
      minH="inherit"
      justifyContent="center"
    >
      <Icon as={InfoIcon} color="error.500" boxSize="40px" />
      <VStack width="full" spacing="8px">
        <Heading size={{ base: 'lg', md: 'xl' }}>{title ?? 'Error'}</Heading>
        <Text color="neutral.700">{subtitle ?? 'Not Found'}</Text>
      </VStack>
    </VStack>
  );
};

export default GenericErrorState;
