'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const CorporateOffice = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Streamline Office Operations & Asset Management with Invent3Pro"
        subtitle="Managing corporate facilities and office assets requires efficiency, security, and seamless operations. Invent3Pro enables businesses to optimize workspace utilization, automate maintenance, and ensure smooth daily operations."
        customHeading={{ maxW: '823px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-cooperate-hero-desktop.png"
        bgMobile="/sector-cooperate-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <Advantage />
      <CTA
        heading={['Upgrade Your', ['Office Operations'], 'with Invent3Pro']}
        description="Stay ahead in the financial sector with smarter asset and facility management. Schedule a demo today and discover how Invent3Pro can optimize your banking infrastructure."
      />
    </Flex>
  );
};

export default CorporateOffice;
