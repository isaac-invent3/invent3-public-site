import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../Common/HeroHeader';

const Hero = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      bgColor="primary.500"
      position="relative"
      direction="column"
      alignItems="center"
    >
      <Flex
        width="full"
        height="full"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        bgImage="/about-us-bg.png"
        bgRepeat="no-repeat"
        bgPosition="center center"
        opacity={0.2}
      />
      <Flex
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '118px', lg: '72px' }}
        position="relative"
        direction="column"
        gap="16px"
        alignItems="center"
      >
        <Text
          color="white"
          fontSize={{ base: '14px', lg: '16px' }}
          lineHeight={{ base: '20px', lg: '24px' }}
          letterSpacing="0.04em"
          textAlign="center"
        >
          WE ARE INVENT3
        </Text>
        <HeroHeader
          title="Revolutionizing Asset Management for Businesses"
          subtitle="Invent3 simplifies asset tracking, automates maintenance, ensures compliance, and optimizes costs—empowering businesses to operate efficiently and scale seamlessly."
          customHeading={{ maxW: '739px' }}
        />
      </Flex>
    </Flex>
  );
};

export default Hero;
