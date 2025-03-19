import {
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const summaryInfo = [
  {
    title: '300+',
    subtitle: 'Companies across Nigeria',
  },
  {
    title: '900,000',
    subtitle: 'Assets Being Managed',
  },
  {
    title: '92%',
    subtitle: 'Improving client’s operations',
  },
];

const Hero = () => {
  return (
    <Flex
      bgColor="primary.500"
      justifyContent="center"
      width="full"
      height="full"
    >
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '43px', lg: '56px' }}
        pb={{ base: '68px', lg: '140px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack
          width={{ base: 'full', md: '50%' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          spacing={{ base: '40px', md: '80px' }}
        >
          <VStack
            width="full"
            alignItems={{ base: 'center', md: 'flex-start' }}
            spacing={{ base: '16px', md: '32px' }}
          >
            <VStack
              width="full"
              alignItems={{ base: 'center', md: 'flex-start' }}
              spacing="16px"
            >
              <Heading
                color="white"
                fontWeight={800}
                fontSize={{ base: '24px', lg: '48px' }}
                lineHeight={{ base: '32px', lg: '62.4px' }}
                textAlign={{ base: 'center', md: 'left' }}
              >
                Revolutionize and Transform Your Asset Management with
                Cutting-Edge AI Tech
              </Heading>
              <Text
                fontSize={{ base: '12px', lg: '16px' }}
                fontWeight={400}
                lineHeight={{ base: '16px', lg: '22.4px' }}
                textAlign={{ base: 'center', md: 'left' }}
                color="white"
                maxW="552px"
              >
                Discover the ultimate solution for efficient and effective asset
                management by Leverage the Power of Artificial Intelligence for
                Unparalleled Efficiency.
              </Text>
            </VStack>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '16px', md: '32px' }}
              width="full"
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
                width={{ base: 'full', md: '170px' }}
                _hover={{ bgColor: 'white', color: 'primary.500' }}
                _active={{ bgColor: 'white', color: 'primary.500' }}
              >
                Request a Demo
              </Button>
            </Stack>
          </VStack>
          <HStack
            spacing="8px"
            divider={<StackDivider borderColor="white" />}
            alignItems="flex-start"
          >
            {summaryInfo.map((item, index) => (
              <VStack
                spacing={{ base: '8px', lg: '19px' }}
                key={index}
                color="secondary.pale.500"
              >
                <Text size={{ base: 'md', lg: '2xl' }}>{item.title}</Text>
                <Text
                  width={{ base: 'full', md: '141px' }}
                  textAlign="center"
                  size={{ base: 'base', md: 'md' }}
                  fontWeight={700}
                >
                  {item.subtitle}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <Flex
          position="relative"
          height="auto"
          minH={{ base: '350px', lg: '565px' }}
          width={{ base: 'full', lg: '50%' }}
          flex={1}
        >
          <Image src="/hero-img.svg" alt="logo" fill />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
