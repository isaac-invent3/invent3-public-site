import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface ModalHeadingProps {
  heading: string;
  subheading: string;
}
const ModalHeading = (props: ModalHeadingProps) => {
  const { heading, subheading } = props;

  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Heading
        fontWeight={800}
        fontSize="32px"
        lineHeight="38.02px"
        color="primary"
      >
        {heading}
      </Heading>
      <Text size="md" fontWeight={400} color="neutral.600">
        {subheading}
      </Text>
    </VStack>
  );
};

export default ModalHeading;
