'use client';

import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../Common/HeroHeader';
import Team from './Team';

const LeadershipTeam = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="The Visionaries"
        subtitle="Get to know the minds shaping the future of intelligent operations."
        customHeading={{ maxW: '617px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '381px' } }}
        bgDesktop="/leadership-hero-desktop.png"
        bgMobile="/leadership-hero-mobile.png"
      />
      <Flex justifyContent="center" width="full">
        <Flex
          width="full"
          justifyContent="space-between"
          alignItems="flex-start"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          pt={{ base: '80px', lg: '77px' }}
          pb={{ base: '0px', lg: '146px' }}
          maxW="1440px"
          position="relative"
          direction="column"
          gap={{ base: '24px', lg: '40px' }}
        >
          <VStack width="full" spacing="24px">
            <Text
              py="12px"
              px="16px"
              color="primary.500"
              bgColor="neutral.250"
              rounded="full"
            >
              Team
            </Text>
            <Heading
              fontWeight={800}
              fontSize={{ base: '24px', md: '40px' }}
              lineHeight={{ base: '28.51px', md: '47.52px' }}
              color="black"
              maxW="537px"
              textAlign="center"
            >
              Meet The{' '}
              <Heading
                as="span"
                color="#B279A2"
                fontWeight={800}
                fontSize={{ base: '24px', md: '40px' }}
                lineHeight={{ base: '28.51px', md: '47.52px' }}
              >
                Team
              </Heading>
            </Heading>
            <Text
              fontSize={{ base: '14px', md: '16px' }}
              lineHeight={{ base: '20px', md: '24px' }}
              color="primary.accent"
              fontWeight={400}
              maxW="714px"
              textAlign="center"
            >
              Our dedicated team of experts is committed to revolutionizing
              asset management with innovation, automation, and smart solutions
              that help businesses optimize efficiency, reduce costs, and stay
              compliant effortlessly.
            </Text>
          </VStack>
          <Team />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeadershipTeam;
