'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const RealEstate = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Revolutionizing Property & Facility Management with Smart Automation"
        subtitle="  Managing real estate assets and facilities requires seamless operations, maintenance oversight, and tenant satisfaction. Invent3Pro enables property managers and facility teams to streamline workflows, track assets, and ensure buildings run efficiently."
        customHeading={{ maxW: '823px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-real-estate-hero-desktop.png"
        bgMobile="/sector-real-estate-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <Advantage />
      <CTA
        heading={['Upgrade to Smarter', ['Property & Facilities Management']]}
        description="Leverage automation and data-driven insights for better operational efficiency."
      />
    </Flex>
  );
};

export default RealEstate;
