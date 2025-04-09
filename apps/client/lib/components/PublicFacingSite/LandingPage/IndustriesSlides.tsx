import { Flex, Text, Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const industries = [
  'Transportation & Public Infrastructure',
  'Corporate & Office Spaces',
  'Retail & Warehousing',
  'Industrial and Manufacturing',
  'Banking and Finance',
  'Healthcare & Medical Facilities',
];

const MotionFlex = motion(Flex);

const IndustriesSlides = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2; // only animate one set of items

    gsap.to(el, {
      x: `-${totalWidth}px`,
      duration: 25,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <Flex bgColor="primary.500" justifyContent="center" width="full">
      <Flex
        width="full"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        pt={{ base: '24px', lg: '44px' }}
        pb={{ base: '24px', lg: '57px' }}
        maxW="1440px"
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '22px', lg: '60px' }}
      >
        <Text
          fontWeight={700}
          size={{ md: 'lg' }}
          lineHeight="24px"
          maxW={{ lg: '194px' }}
          color="white"
          flexShrink={0}
        >
          Trusted by Industry Leaders Worldwide
        </Text>
        <Flex
          width={{ base: 'full', lg: 'calc(100vw - 194px)' }}
          alignItems="flex-start"
          gap="16px"
          sx={{
            scrollbarWidth: '0px',
            scrollbarColor: 'transparent transparent',
            '&::-webkit-scrollbar': {
              width: '0px',
              height: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
            },
          }}
          overflow="hidden"
        >
          <Flex
            ref={scrollRef}
            gap="16px"
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {[...industries, ...industries].map((industry, index) => (
              <Text
                fontWeight={800}
                fontSize={{ base: '12px', lg: '20px' }}
                lineHeight="100%"
                color="neutral.600"
                key={index}
                minW={{ base: '120px', lg: '208px' }}
                alignSelf="flex-start"
              >
                {industry}
              </Text>
            ))}

            {/* <Flex
          width={{ base: 'full', lg: 'calc(100vw - 194px)' }}
          bgColor="red"
          position="relative"
        >
          <MotionFlex
            overflow="hidden"
            whiteSpace="nowrap"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: 'linear',
            }}
            position={{ base: 'absolute', md: 'static' }}
            bottom={{ base: '0', md: 'auto' }}
            justifyContent="center"
            bgColor="primary.500"
          >
            {industries.concat(industries).map((industry, index) => (
              // <Box
              //   key={index}
              //   flexShrink={0}
              //   maxW="208px"
              //   mx="10px"
              //   textAlign="center"
              // >
              <Text
                fontWeight={800}
                fontSize={{ base: '12px', lg: '20px' }}
                lineHeight="20px"
                color="white"
              >
                {industry}
              </Text>
              // </Box>
            ))}
          </MotionFlex>
        </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IndustriesSlides;
