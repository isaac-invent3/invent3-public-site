'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const Retail = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Smarter Retail & Warehouse Management with AI-Driven Efficiency"
        subtitle="  Retail and warehousing operations demand real-time asset tracking, inventory control, and seamless logistics. Invent3Pro empowers businesses with intelligent automation to optimize stock levels, reduce losses, and enhance operational efficiency."
        customHeading={{ maxW: '823px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-retail-hero-desktop.png"
        bgMobile="/sector-retail-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <Advantage />
      <CTA
        heading={['Future-Proof Your', ['Industrial'], 'Operations']}
        description="Ensure efficiency, safety, and compliance with Invent3Pro."
      />
    </Flex>
  );
};

export default Retail;
