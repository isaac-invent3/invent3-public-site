import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import StrategyPoints from './Points';

const OurStrategy = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="primary.500"
      mt={{ base: '65px', lg: '76px' }}
    >
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '55px', lg: '187px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap="40px"
      >
        <VStack
          width={{ base: 'full', lg: '55%' }}
          spacing={{ base: '56px', lg: '77px' }}
          alignItems="flex-start"
        >
          <VStack
            width="full"
            spacing={{ base: '16px', lg: '32px' }}
            alignItems="flex-start"
          >
            <Text
              py="12px"
              px="16px"
              color="primary.500"
              bgColor="#E6E6E6"
              rounded="full"
            >
              Our Strategy
            </Text>
            <VStack width="full" alignItems="flex-start" spacing="24px">
              <Heading
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
                maxW="537px"
                color="#B279A2"
              >
                Innvovation-
                <Heading
                  as="span"
                  color="white"
                  fontWeight={800}
                  fontSize={{ base: '24px', md: '40px' }}
                  lineHeight={{ base: '28.51px', md: '47.52px' }}
                >
                  Driven Growth
                </Heading>
              </Heading>
              <Text
                fontSize={{ base: '14px', md: '16px' }}
                lineHeight={{ base: '20px', md: '24px' }}
                color="primary.accent"
                fontWeight={400}
                width="full"
                maxW="527px"
              >
                We leverage AI, IoT, and data analytics to optimize asset
                management, enhance efficiency, and drive sustainable business
                success.
              </Text>
            </VStack>
          </VStack>
          <Flex
            width="full"
            justifyContent={{ base: 'center', md: 'flex-start' }}
          >
            <Flex
              position="relative"
              height="301px"
              width="full"
              maxW="351px"
              display={{ base: 'flex', lg: 'none' }}
            >
              <Image src="/strategy.svg" alt="strategy" fill />
            </Flex>
          </Flex>
          <StrategyPoints />
        </VStack>
        <Flex
          position="relative"
          flex={1}
          height="369px"
          width="45%"
          maxW="505px"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Image src="/strategy.svg" alt="strategy" fill />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OurStrategy;
