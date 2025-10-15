'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const IndustryManufacturing = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Optimizing Industrial Operations with Intelligent Asset Management"
        subtitle=" Manufacturing and industrial facilities require precision, efficiency, and minimal downtime to maintain productivity. Invent3Pro helps businesses streamline asset tracking, maintenance, and compliance, ensuring peak operational efficiency."
        customHeading={{ maxW: '877px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-industry-hero-desktop.png"
        bgMobile="/sector-industry-hero-mobile.png"
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

export default IndustryManufacturing;
