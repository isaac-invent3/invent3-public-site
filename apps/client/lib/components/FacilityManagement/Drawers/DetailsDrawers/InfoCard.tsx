import { Flex, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  count: number;
  locationTitle: string;
}
const InfoCard = (props: InfoCardProps) => {
  const { title, subtitle, count, locationTitle } = props;
  return (
    <Stack
      py="16px"
      px={{ base: '16px', lg: '32px' }}
      bgColor="#B4BFCA4D"
      spacing="24px"
      direction={{ base: 'column', lg: 'row' }}
      width="full"
      alignItems="flex-start"
    >
      <Flex
        width="147px"
        position="relative"
        height="80px"
        bgColor="neutral.100"
        rounded="4px"
        overflow="hidden"
        flexShrink={0}
      >
        <Image fill src="/bms-location-1.png" alt="location image" />
      </Flex>
      <HStack spacing="40px" width="full" justifyContent="space-between">
        <VStack alignItems="flex-start" spacing="8px">
          <Heading
            color="neutral.800"
            fontSize={{ base: '16px', lg: '24px' }}
            lineHeight="100%"
          >
            {title}
          </Heading>
          <Text size="md" color="black">
            {subtitle}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Heading
            color="neutral.800"
            fontSize={{ base: '24px', lg: '40px' }}
            lineHeight="100%"
          >
            {count ?? '-'}
          </Heading>
          <Text size="md" color="primary.500" fontWeight={800}>
            {locationTitle}
          </Text>
        </VStack>
      </HStack>
    </Stack>
  );
};

export default InfoCard;
