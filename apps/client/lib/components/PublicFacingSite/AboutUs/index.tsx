'use client';

import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import CTA from '../Common/CallToAction';
import CEOMessage from './CEOMessage';
import AboutInfo from './AboutInfo';
import Team from './Team';
import { VideoPlayIcon } from '../../CustomIcons/PublicFacingSite';

const AboutUs = () => {
  return (
    <Flex direction="column" gap={{ base: '40px', lg: '120px' }}>
      <Hero />
      <Flex
        justifyContent="center"
        width="full"
        height="full"
        position="relative"
      >
        <Flex
          width="full"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          maxW="1440px"
          position="relative"
          direction="column"
          gap={{ base: '40px', lg: '120px' }}
        >
          <Flex
            width="full"
            height={{ base: '382px', lg: '649px' }}
            rounded={{ base: '8px', lg: '20px' }}
            bgColor="black"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={VideoPlayIcon} boxSize="80px" />
          </Flex>
          <CEOMessage />
          <AboutInfo />
          <Team />
        </Flex>
      </Flex>
      <CTA />
    </Flex>
  );
};

export default AboutUs;
