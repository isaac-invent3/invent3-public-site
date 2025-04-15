import {
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
// import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const summaryInfo = [
  {
    value: 300,
    suffix: '+',
    subtitle: 'Companies across Nigeria',
    className: 'companies',
  },
  {
    value: 900000,
    suffix: '',
    subtitle: 'Assets Being Managed',
    className: 'asset',
  },
  {
    value: 92,
    suffix: '%',
    subtitle: 'Improving client’s operations',
    className: 'client',
  },
];

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    summaryInfo.forEach((item) => {
      const elements = document.getElementsByClassName(item.className);
      if (elements.length >= 1 && elements[0]) {
        const element = elements[0];

        // Create a dummy object to animate the number
        const obj = { val: 0 };

        tl.to(
          obj,
          {
            duration: 3,
            val: item.value,
            roundProps: 'val',
            ease: 'power1.inOut',
            onUpdate: () => {
              element.textContent = `${Math.floor(obj.val).toLocaleString()}${item.suffix}`;
            },
          },
          0
        );
      }
    });
  }, []);
  return (
    <Flex bgColor="#000000" justifyContent="center" width="full" height="full">
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
          width={{ base: 'full', md: '53%' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          spacing={{ base: '40px', md: '80px', xl: '147px' }}
          order={{ base: 1, lg: 0 }}
          position="relative"
          zIndex={99}
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
                AI & IoT-Powered Physical Asset & Facility Management for
                Smarter Operations
              </Heading>
              <Text
                fontSize={{ base: '12px', lg: '16px' }}
                fontWeight={400}
                lineHeight={{ base: '16px', lg: '22.4px' }}
                textAlign={{ base: 'center', md: 'left' }}
                color="neutral.300"
              >
                Optimize asset performance, reduce downtime, and stay
                compliant—effortlessly. Invent3.ai transforms how businesses
                manage their physical assets with automation and intelligence.
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
                Get a free Demo
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
                See how it works
              </Button>
            </Stack>
          </VStack>
          <VStack
            spacing={{ base: '24px', md: '31px' }}
            width="full"
            alignItems="flex-start"
          >
            <Text color="neutral.600" ml="32px">
              Target for 2025:
            </Text>
            <HStack
              spacing="8px"
              divider={<StackDivider borderColor="white" />}
              alignItems="flex-start"
            >
              {summaryInfo.map((item, index) => (
                <VStack
                  spacing={{ base: '8px', lg: '19px' }}
                  key={index}
                  color="white"
                >
                  <Text
                    size={{ base: 'md', lg: '2xl' }}
                    color="white"
                    className={item.className}
                  >
                    {item.value}
                    {item.suffix}
                  </Text>
                  <Text
                    width={{ base: 'full', md: '141px' }}
                    textAlign="center"
                    size={{ base: 'base', md: 'md' }}
                    fontWeight={700}
                    color="neutral.600"
                  >
                    {item.subtitle}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </VStack>

        <Flex
          position={{ base: 'relative', md: 'absolute' }}
          height="auto"
          minH={{ base: '350px', lg: '565px' }}
          width="full"
          flex={1}
          order={{ base: 0, lg: 1 }}
          right={{ base: 0, md: -220, xl: -400 }}
          top={{ md: -50 }}
        >
          {/* <Image src="/hero-img.svg" alt="logo" fill /> */}
          <Image
            src="/hero-globe.gif"
            width="full"
            // minW="600px"
            minH="full"
            position="absolute"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
