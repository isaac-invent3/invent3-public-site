import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import WeatherReading from '../WeatherReading';
import Image from 'next/image';

const Info = () => {
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing="16px"
    >
      <Stack
        minH="179px"
        height="full"
        bgColor="primary.500"
        width={{ base: 'full', lg: 'calc(100% - 361px)' }}
        rounded="8px"
        spacing={0}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Flex p="6px">
          <Flex
            position="relative"
            overflow="hidden"
            width={{ base: 'full', lg: '194px' }}
            height={{ base: '170.46px', lg: 'full' }}
            borderTopRadius={{ base: '8px', lg: 'none' }}
            borderLeftRadius={{ base: 'none', lg: '8px' }}
          >
            <Image src="/bms-location-1.png" fill alt="location" />
          </Flex>
        </Flex>
        <Stack
          spacing={{ base: '55px', lg: '46px' }}
          pt={{ base: '23px', lg: '16px' }}
          pb={{ base: '32px', lg: '23px' }}
          pr={{ base: '9px', lg: '13px' }}
          pl={{ base: '11px', lg: '22px' }}
          direction={{ base: 'column', lg: 'row' }}
        >
          <VStack
            alignItems="flex-start"
            spacing="8px"
            width={{ base: 'full', lg: '40%' }}
          >
            <Text size="xl" fontWeight={800} color="white">
              Awolowo Road Branch
            </Text>
            <Text size="md" color="neutral.200">
              123 Marina Rd, Lagos, NG
            </Text>
          </VStack>
          <VStack spacing="40px" width={{ base: 'full', lg: '60%' }}>
            <HStack width="full" justifyContent="space-between" spacing="24px">
              <VStack alignItems="flex-start">
                <Text
                  fontWeight={800}
                  fontSize="20px"
                  lineHeight="100%"
                  color="white"
                >
                  35,000 kWh
                </Text>
                <Text color="neutral.250">Energy Consumption</Text>
              </VStack>
              <VStack alignItems="flex-start">
                <Text
                  fontWeight={800}
                  fontSize="20px"
                  lineHeight="100%"
                  color="white"
                >
                  90%
                </Text>
                <Text color="neutral.250">Occupancy Rate:</Text>
              </VStack>
            </HStack>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              alignItems="flex-start"
              justifyContent="space-between"
              gap={{ base: '40px', lg: '24px' }}
              width="full"
            >
              <VStack alignItems="flex-start">
                <Text
                  fontWeight={800}
                  fontSize="20px"
                  lineHeight="100%"
                  color="white"
                >
                  HVAC Efficiency Low
                </Text>
                <Text color="neutral.250">System Health</Text>
              </VStack>
              <VStack alignItems="flex-start">
                <Text
                  fontWeight={800}
                  fontSize="20px"
                  lineHeight="100%"
                  color="white"
                >
                  2 Open issues
                </Text>
                <Text color="neutral.250">Maintenance Alerts</Text>
              </VStack>
            </Stack>
          </VStack>
        </Stack>
      </Stack>
      <WeatherReading />
    </Stack>
  );
};

export default Info;
