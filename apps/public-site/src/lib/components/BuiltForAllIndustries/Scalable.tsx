import React from 'react';
import SectionInfo from '../Common/SectionInfo';
import { Flex, Image, SimpleGrid } from '@chakra-ui/react';

const Scalable = () => {
  return (
    <Flex
      justifyContent="center"
      width="full"
      background="linear-gradient(180deg, rgba(255, 211, 97, 0.2) -31.16%, rgba(255, 211, 97, 0) 79.48%)"
      position="relative"
      overflow="hidden"
    >
      <Image
        src="/why-us-1.svg"
        alt="bg-vector-1"
        position="absolute"
        top={{ base: 10, lg: -20 }}
        right={{ base: -30, lg: -10 }}
      />
      <Image
        src="/why-us-1.svg"
        alt="bg-vector-3"
        position="absolute"
        bottom={-30}
        left={{ base: -2, lg: -10 }}
      />
      <Image
        src="/why-us-3.svg"
        alt="bg-vector-3"
        position="absolute"
        bottom={60}
        right={{ base: -2, lg: -1 }}
      />
      <SimpleGrid
        width="full"
        pt={{ base: '65px', lg: '201px' }}
        pb="110px"
        px={{ base: '16px', md: '40px', '2xl': '80px' }}
        maxW="1440px"
        position="relative"
        gap={{ base: '78px', lg: '88px' }}
        columns={{ base: 1, lg: 2 }}
      >
        <SectionInfo
          badgeText="Why Invent3.ai"
          heading={['Scalable Across', ['Businesses'], 'of Any Size']}
          description=" Whether you're managing a single facility or overseeing a global enterprise, Invent3Pro scales effortlessly, providing visibility, automation, and control at every level."
          headingStyles={{ maxW: '524px' }}
          descriptionStyles={{ maxW: '524px', color: 'primary.accent' }}
        />
        <Flex width="full" height="341px" position="relative">
          <Image src="/scalable.png" alt="technician" />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default Scalable;
