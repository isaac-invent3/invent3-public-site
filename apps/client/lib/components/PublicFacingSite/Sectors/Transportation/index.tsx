'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const Transportation = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Maximizing Efficiency & Safety in Transportation & Public Infrastructure"
        subtitle=" Managing transportation networks and public infrastructure requires precision, reliability, and proactive maintenance. Invent3Pro streamlines asset oversight, ensures operational efficiency, and enhances safety for seamless service delivery."
        customHeading={{ maxW: '823px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-transportation-hero-desktop.png"
        bgMobile="/sector-transportation-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <Advantage />
      <CTA
        heading={['Keep Your', ['Transportation'], 'Network Running Smoothly']}
        description="Boost efficiency, reduce downtime, and improve safety with Invent3Pro."
      />
    </Flex>
  );
};

export default Transportation;
