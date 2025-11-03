import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import Image from 'next/image';
import React from 'react';

const theThreeSteps = [
  {
    title: 'Schedule a call',
    subtitle:
      'Schedule a call with a member of our experienced FM team to discuss your requirements.',
  },
  {
    title: 'Demo',
    subtitle:
      'We can walk you through a demo of the solutions to suit your needs, and to adapt with you.',
  },
  {
    title: 'Get a subscription',
    subtitle:
      'We will create a plan for implementing an CAFM solution from our suite that is as innovative and forward thinking as you.',
  },
];

const ThreeSteps = () => {
  return (
    <Flex justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        pt={{ base: '62px', lg: '120px' }}
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        direction="column"
        gap={{ base: '64px', lg: '78px' }}
      >
        <VStack width="full" spacing={{ base: '8px', lg: '16px' }}>
          <Heading
            fontWeight={800}
            fontSize={{ base: '24px', md: '40px' }}
            lineHeight={{ base: '28.51px', md: '47.52px' }}
            color="black"
            textAlign="center"
          >
            3 Steps to{' '}
            <Heading
              as="span"
              color="#B279A2"
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
            >
              Revoluntionise{' '}
            </Heading>
            your Business
          </Heading>
          <Text
            fontWeight={700}
            fontSize={{ base: '14px', md: '16px' }}
            lineHeight={{ base: '20px', md: '24px' }}
            color="primary.accent"
            textAlign="center"
          >
            Lead your team into tommorow with future-proof CAFM Software
          </Text>
        </VStack>
        <VStack spacing={{ base: '32px', lg: '40px' }} width="full">
          <SimpleGrid width="full" columns={{ base: 1, md: 3 }} gap="40px">
            {theThreeSteps.map((item, index) => (
              <VStack
                width="full"
                alignItems={{ base: 'center', md: 'flex-start' }}
                key={index}
                spacing="24px"
              >
                <Heading
                  fontWeight={800}
                  fontSize="20px"
                  lineHeight="100%"
                  color="black"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  {item.title}
                </Heading>
                <Text
                  color="neutral.600"
                  fontSize="16px"
                  fontWeight={400}
                  lineHeight="100%"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  {item.subtitle}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
          <Flex
            position="relative"
            width="full"
            maxW={{ base: '350px', lg: '542px' }}
            height={{ base: '233px', lg: '361px' }}
          >
            <Image src="/threesteps.svg" alt="three step illustration" fill />
          </Flex>
          <Button
            customStyles={{
              width: { base: 'full', lg: '203px' },
            }}
            href="/contact-us"
          >
            Get a Free Demo
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default ThreeSteps;
