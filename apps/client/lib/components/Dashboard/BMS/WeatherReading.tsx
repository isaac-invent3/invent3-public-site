import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const WeatherReading = () => {
  return (
    <HStack
      //   height="full"
      minH="121px"
      width="full"
      maxW={{ lg: '361px' }}
      bgColor="#E5F1FF"
      rounded="8px"
      spacing="43px"
      py="16px"
      px="12px"
    >
      <VStack alignItems="flex-start" spacing="40px" width="60%">
        <VStack alignItems="flex-start" spacing="2px">
          <Text size="md" color="neutral.600" fontWeight={700}>
            Oniru, VI
          </Text>
          <Text color="neutral.600" fontSize="10px" lineHeight="16px">
            Mon, 24 Aug
          </Text>
        </VStack>
        <HStack spacing="27px">
          <Text
            fontSize="48px"
            lineHeight="0.12em"
            fontWeight={800}
            color="neutral.800"
            position="relative"
          >
            34
            <Text
              as="span"
              fontSize="30px"
              lineHeight="0.12em"
              fontWeight={800}
              color="neutral.800"
              position="absolute"
              top={-3}
            >
              o
            </Text>
          </Text>
          <VStack
            alignItems="flex-start"
            spacing="2px"
            color="neutral.600"
            fontSize="10px"
            lineHeight="16px"
          >
            <Text>Partly Cloudy</Text>
            <Text>H: 34o | L: 30o</Text>
          </VStack>
        </HStack>
      </VStack>
      <Flex position="relative" width="121.73px" height="70.66px">
        <Image src="/cloud.png" fill alt="cloud" />
      </Flex>
    </HStack>
  );
};

export default WeatherReading;
