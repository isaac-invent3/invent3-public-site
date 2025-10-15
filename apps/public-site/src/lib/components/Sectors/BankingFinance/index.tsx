'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import KeyFeatures from './KeyFeatures';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const BankingFinance = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Optimizing Banking Operations with Smart Asset & Facilities Management"
        subtitle=" Financial institutions operate in a fast-paced environment where efficiency, security, and compliance are critical. Invent3Pro empowers banks, credit unions, and financial service providers with cutting-edge asset and facility management solutions to drive operational excellence."
        customHeading={{ maxW: '877px' }}
        subTitleStyle={{ maxW: { lg: '617px' } }}
        bgDesktop="/sector-banking-hero-desktop.png"
        bgMobile="/sector-banking-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <KeyFeatures />
      <Advantage />
      <CTA
        heading={['Power Up Your', ['Banking Operations!']]}
        description="Stay ahead in the financial sector with smarter asset and facility management. Schedule a demo today and discover how Invent3Pro can optimize your banking infrastructure."
      />
    </Flex>
  );
};

export default BankingFinance;
