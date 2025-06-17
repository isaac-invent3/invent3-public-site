import { Flex, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  count: number;
  locationTitle: string;
  imageUrl?: string;
  dividerText?: string;
}
const InfoCard = (props: InfoCardProps) => {
  const { title, subtitle, count, locationTitle, imageUrl, dividerText } =
    props;
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
      {imageUrl && (
        <Flex
          width="147px"
          position="relative"
          height="80px"
          bgColor="neutral.100"
          rounded="4px"
          overflow="hidden"
          flexShrink={0}
        >
          <Image fill src={imageUrl} alt="facility image" />
        </Flex>
      )}
      <HStack spacing="40px" width="full" justifyContent="space-between">
        <VStack alignItems="flex-start" spacing="8px">
          <Heading
            color="neutral.800"
            fontSize={{ base: '16px', lg: '24px' }}
            lineHeight="100%"
            fontWeight={800}
          >
            {title}
          </Heading>
          {dividerText && (
            <Text size="md" color="neutral.600" lineHeight="100%">
              {dividerText}
            </Text>
          )}
          {subtitle && (
            <Text size="md" color="neutral.800" lineHeight="100%">
              {subtitle}
            </Text>
          )}
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
