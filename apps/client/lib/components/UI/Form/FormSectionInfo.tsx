import { Text, VStack } from '@chakra-ui/react';
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
      <Text size="md" fontWeight={700} color="primary">
        {title}
        {isRequired && (
          <Text size="md" color="#FF3B30" as="span">
            *
          </Text>
        )}
      </Text>
      <Text color="neutral.600" maxW="90%">
        {info}
      </Text>
    </VStack>
  );
};

export default SectionInfo;
