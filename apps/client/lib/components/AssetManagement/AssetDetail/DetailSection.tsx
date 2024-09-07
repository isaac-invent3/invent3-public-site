import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '../../UI/DetailHeader';

interface DetailSectionProps {
  details: {
    label: string;
    value: string;
  }[];
  minWidth: string;
  header?: string;
}

const DetailSection = (props: DetailSectionProps) => {
  const { details, minWidth, header } = props;
  return (
    <VStack alignItems="flex-start" spacing="16px" width="full">
      {header && <DetailHeader variant="secondary">{header}</DetailHeader>}
      <VStack alignItems="flex-start" spacing="8px" width="full">
        {details.map((item) => (
          <HStack spacing="8px" alignItems="flex-start">
            <Text size="md" minW={minWidth} color="neutral.600">
              {item.label}
            </Text>
            <Text size="md">{item.value}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default DetailSection;
