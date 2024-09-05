import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { DetailContent } from './DetailContent';
import DetailHeader from './DetailHeader';

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
      {header && <DetailHeader>{header}</DetailHeader>}
      <VStack alignItems="flex-start" spacing="8px" width="full">
        {details.map((item) => (
          <HStack spacing="8px" alignItems="flex-start">
            <DetailContent
              customStyles={{
                minW: minWidth,
                color: 'neutral.600',
              }}
            >
              {item.label}
            </DetailContent>
            <DetailContent>{item.value}</DetailContent>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default DetailSection;
