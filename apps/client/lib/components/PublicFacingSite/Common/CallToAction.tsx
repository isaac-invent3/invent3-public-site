import { Button, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const CTA = () => {
  return (
    <Flex
      bgColor="primary.500"
      justifyContent="center"
      width="full"
      height="full"
      position="relative"
    >
      <Flex
        top={0}
        bottom={0}
        right={0}
        left={0}
        position="absolute"
        bgImage="/cta-bg.png"
        bgRepeat="no-repeat"
        bgPosition="bottom right"
        opacity={0.1}
      />
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems={{ md: 'flex-end' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '39px', lg: '106px' }}
        pb={{ base: '49px', lg: '106px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        gap="24px"
      >
        <VStack alignItems="flex-start" maxW="613px">
          <Text fontSize="16px" lineHeight="24px" color="white">
            TRY IT NOW
          </Text>
          <Heading
            fontWeight={{ base: 700, lg: 800 }}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="white"
          >
            Revolutionize your Asset Management Today!
          </Heading>
          <Text
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="white"
            fontWeight={400}
          >
            Take control of your assets with AI-driven automation, real-time
            insights, and seamless workflows. Boost efficiency, reduce downtime,
            and ensure compliance effortlessly—experience smarter asset
            management with Invent3 now!
          </Text>
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '16px', md: '32px' }}
          width={{ base: 'full', md: 'max-content' }}
        >
          <Button
            bgColor="white"
            height="50px"
            color="primary.500"
            rounded="8px"
            width={{ base: 'full', md: '175px' }}
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.8 }}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            borderColor="white"
            height="50px"
            color="white"
            rounded="8px"
            width={{ base: 'full', md: '160px' }}
            _hover={{ bgColor: 'white', color: 'primary.500' }}
            _active={{ bgColor: 'white', color: 'primary.500' }}
          >
            Talk to Sales
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default CTA;
