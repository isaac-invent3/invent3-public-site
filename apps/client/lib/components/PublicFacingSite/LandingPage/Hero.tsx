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
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const imagetl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

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
              element.textContent = `${Math.floor(obj.val)?.toLocaleString()}${item.suffix}`;
            },
          },
          0
        );
      }
    });

    imagetl
      .set([image1Ref.current, image2Ref.current, image3Ref.current], {
        opacity: 0,
      })
      .to(image1Ref.current, { opacity: 1, duration: 2 })
      .to(image2Ref.current, { opacity: 1, duration: 2 })
      .to(image3Ref.current, { opacity: 1, duration: 2 });
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
          zIndex={9}
          mt={{ sm: '20px', md: 0 }}
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
                maxW={{ md: '90%', lg: 'full' }}
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
                maxW={{ md: '85%', lg: 'full' }}
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
                as="a"
                href="/contact-us"
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
                as="a"
                href="/how-we-work"
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
          minW="600px"
          order={{ base: 0, lg: 1 }}
          right={{ base: 0, md: -220, lg: -300, xl: -350 }}
          top={{ md: -50 }}
          flexShrink={0}
        >
          <Image
            src="/hero-globe-image-1.png"
            width={{ base: '120px', lg: '186px' }}
            height={{ base: '60px', lg: '87px' }}
            position="absolute"
            zIndex={9}
            top={{ base: 50, md: 120, lg: 120, xl: 150 }}
            left={{ base: 170, sm: 170, md: 250, lg: 300, xl: 450 }}
            bottom={0}
            ref={image1Ref}
          />
          <Image
            src="/hero-globe-image-2.png"
            width={{ base: '150px', md: '120px', xl: '226.05px' }}
            height={{ base: '70px', xl: '114.75px' }}
            position="absolute"
            zIndex={9}
            top={{ base: 50, md: 120, lg: 120, xl: 150 }}
            right={{ base: 150, sm: 150, md: 250, lg: 350, xl: 400 }}
            // display={{ base: 'none', lg: 'flex' }}
            ref={image2Ref}
          />
          <Image
            src="/hero-globe-image-3.png"
            width={{ base: '150px', md: '180px', lg: '248.94px' }}
            height={{ base: '80px', md: '120px', lg: '199.55px' }}
            position="absolute"
            zIndex={9}
            left={{ base: 170, sm: 150, md: 300, xl: 400 }}
            bottom={{ base: 30, sm: 0, md: -140, lg: -50, xl: -200 }}
            ref={image3Ref}
          />
          <Image
            src="/hero-globe.gif"
            width="full"
            minH="full"
            position="absolute"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
