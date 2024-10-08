import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface SectionInfoProps {
  title: string;
  info: string;
  isRequired: boolean;
}

const SectionInfo = (props: SectionInfoProps) => {
  const { title, info, isRequired } = props;
  return (
    <VStack alignItems="flex-start" spacing="8px" width="full">
      <HStack alignItems="flex-start" spacing={0}>
        <Text size="md" fontWeight={700} color="primary">
          {title}
        </Text>
        {isRequired && (
          <Text size="md" color="#FF3B30">
            *
          </Text>
        )}
      </HStack>
      <Text color="neutral.600" maxW="90%">
        {info}
      </Text>
    </VStack>
  );
};

export default SectionInfo;
