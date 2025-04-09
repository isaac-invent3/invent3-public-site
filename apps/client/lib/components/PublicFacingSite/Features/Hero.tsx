import { Button, Flex } from '@chakra-ui/react';
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
        bgImage="/hero-bg.png"
        opacity={0.1}
      />
      <Flex
        width="full"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        py={{ base: '118px', lg: '72px' }}
        position="relative"
        direction="column"
        gap="24px"
        alignItems="center"
      >
        <HeroHeader
          title="Revolutionizing Asset Management for Smarter Business Operations"
          subtitle="From acquisition to retirement, Invent3 simplifies asset tracking, maintenance scheduling, cost optimization, and compliance—giving you total control over your business assets."
          bgDesktop=""
        />
        <Button
          bgColor="white"
          height="50px"
          color="primary.500"
          rounded="8px"
          width="151px"
          _hover={{ opacity: 0.8 }}
          _active={{ opacity: 0.8 }}
        >
          Talk to Sales
        </Button>
      </Flex>
    </Flex>
  );
};

export default Hero;
