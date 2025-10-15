import { Button, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
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
        left={0}
        width={{ base: '50px', lg: '300px' }}
        position="absolute"
        bgImage="/cta-image.png"
        bgRepeat={{ lg: 'no-repeat' }}
        ml={{ base: 0, md: '40px', '2xl': '80px' }}
      />
      <Flex
        top={0}
        bottom={0}
        right={0}
        position="absolute"
        width={{ base: '50px', lg: '260px' }}
        bgImage="/cta-image.png"
        bgRepeat={{ lg: 'no-repeat' }}
        mr={{ base: 0, md: '40px', '2xl': '50px' }}
      />
      <Flex
        width="full"
        justifyContent="center"
        alignItems={{ md: 'flex-end' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '178px', lg: '85px' }}
        pb={{ base: '177px', lg: '123px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        gap="24px"
      >
        <VStack width="full" maxW="630px" spacing="24px">
          <Text fontSize="16px" lineHeight="24px" color="white">
            TRY IT NOW
          </Text>
          <VStack spacing="32px" width="full">
            <Heading
              fontWeight={{ base: 700, lg: 800 }}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="white"
              textAlign="center"
            >
              Transform the Way You{' '}
              <Heading
                fontWeight={{ base: 700, lg: 800 }}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
                color="#B279A2"
                textAlign="center"
                as="span"
              >
                Manage Asset{' '}
              </Heading>
              Today
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="white"
              fontWeight={400}
              textAlign="center"
            >
              Join leading businesses that trust Invent3Pro for smarter asset
              management. Reduce downtime, improve efficiency, and stay ahead
              with AI-powered automation
            </Text>
            <Stack
              direction={{ base: 'row' }}
              spacing={{ base: '16px', md: '32px' }}
              width={{ base: 'full', md: 'max-content' }}
            >
              <Link href="/contact-us">
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
              </Link>
              <Link href="/contact-us">
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
              </Link>
            </Stack>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default CTA;
