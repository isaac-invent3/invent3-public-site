import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import KeyPoints from './KeyPoints';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({
  image,
  animate = true,
}: {
  image?: string;
  animate?: boolean;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sectionHeadingRef = useRef<HTMLDivElement | null>(null);
  const keyPointRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const sectionHeadingElement = sectionHeadingRef.current;
    const keyPointElement = keyPointRef.current;
    const imageElement = imageRef.current;
    if (animate) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          toggleActions: 'restart none none none',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

      tl.from(sectionHeadingElement, { opacity: 0, x: -100, duration: 0.5 });
      tl.to(sectionHeadingElement, { opacity: 1, x: 0, duration: 0.5 });

      tl.from(keyPointElement, { opacity: 0, y: 100, duration: 0.5 });
      tl.to(keyPointElement, { opacity: 1, y: 0, duration: 0.5 });

      tl.from(imageElement, { opacity: 0, x: 100, duration: 0.5 });
      tl.to(imageElement, { opacity: 1, x: 0, duration: 0.5 });
    }
  }, []);

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
        ref={sectionRef}
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
            ref={sectionHeadingRef}
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
                src={image ?? '/about-illustration.svg'}
                alt="about-illustration"
                fill
              />
            </Flex>
          </Flex>
          <Flex width="full" ref={keyPointRef}>
            <KeyPoints />
          </Flex>
        </VStack>
        <Flex
          position="relative"
          flex={1}
          mt={{ base: '27px', lg: '50px' }}
          ml={{ base: '43px', lg: '77px' }}
          height={{ base: '382px', md: '500px', lg: '490px' }}
          width={{ base: 'full', lg: '55%' }}
          maxW={{ base: 'full', lg: '565px' }}
          ref={imageRef}
        >
          <Image
            src={image ?? '/about-illustration.svg'}
            alt="about-illustration"
            fill
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;
