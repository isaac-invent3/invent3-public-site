import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { CheckIcon } from '../../CustomIcons/PublicFacingSite';

interface CheckIconKeyPointsProps {
  items: { title: string; subtitle?: string }[];
}

const CheckIconKeyPoints = (props: CheckIconKeyPointsProps) => {
  const { items } = props;
  return (
    <VStack spacing="32px" alignItems="flex-start">
      {items.map((item, index) => (
        <HStack
          spacing={{ base: '8px', md: '10.89px' }}
          alignItems="flex-start"
          key={index}
        >
          <Icon as={CheckIcon} boxSize="24px" />
          <VStack spacing="8px" alignItems="flex-start">
            <Text
              fontSize={{ base: '16px', lg: '20px' }}
              lineHeight="24px"
              color="primary.500"
              fontWeight={700}
            >
              {item.title}
            </Text>
            {item.subtitle && (
              <Text
                fontSize={{ base: '14px', lg: '16px' }}
                lineHeight={{ base: '18px', lg: '24px' }}
                color="primary.accent"
                fontWeight={400}
              >
                {item.subtitle}
              </Text>
            )}
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default CheckIconKeyPoints;
