import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';
import KeyPoints from './KeyPoints';

const About = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '41px', lg: '88px' }}
        pb={{ base: '37px', lg: '88px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '32px', lg: '87px' }}
      >
        <VStack
          width={{ base: 'full', lg: '45%' }}
          spacing="32px"
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
              About Invent3Pro
            </Text>
            <VStack width="full" alignItems="flex-start" spacing="24px">
              <Heading
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
                color="black"
                maxW="537px"
              >
                Smarter Way to Manage Physical{' '}
                <Heading
                  as="span"
                  color="#B279A2"
                  fontWeight={800}
                  fontSize={{ base: '24px', md: '40px' }}
                  lineHeight={{ base: '28.51px', md: '47.52px' }}
                >
                  Assets & Facilities
                </Heading>
              </Heading>
              <Text
                fontSize={{ base: '14px', md: '16px' }}
                lineHeight={{ base: '20px', md: '24px' }}
                color="primary.accent"
                fontWeight={400}
              >
                Invent3Pro is our AI-powered physical asset and facility
                management platform, designed to help businesses track,
                optimize, and maintain their assets with ease. From real-time
                monitoring to automated workflows, we are revolutionizing the
                CAFM industry.
              </Text>
            </VStack>
          </VStack>
          <Flex width="full" justifyContent="center">
            <Flex
              position="relative"
              height="382px"
              width="full"
              maxW={{ base: '400px', lg: '565px' }}
              display={{ base: 'flex', lg: 'none' }}
            >
              <Image
                src="/about-illustration.svg"
                alt="about-illustration"
                fill
              />
            </Flex>
          </Flex>
          <KeyPoints />
        </VStack>
        <Flex
          position="relative"
          flex={1}
          mt={{ base: '27px', lg: '50px' }}
          ml={{ base: '43px', lg: '77px' }}
          height={{ base: '382px', md: '500px', lg: '490px' }}
          width={{ base: 'full', lg: '55%' }}
          maxW={{ base: 'full', lg: '565px' }}
        >
          <Image src="/about-illustration.svg" alt="about-illustration" fill />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;
