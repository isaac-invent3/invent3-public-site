'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const HealthCare = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Ensuring Reliability & Compliance in Healthcare Facility Management"
        subtitle="Medical facilities rely on seamless operations, strict compliance, and reliable asset management to deliver quality patient care. Invent3Pro empowers hospitals, clinics, and laboratories with intelligent facility management and predictive maintenance solutions."
        customHeading={{ maxW: '823px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-healthcare-hero-desktop.png"
        bgMobile="/sector-healthcare-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <Advantage />
      <CTA
        heading={[
          'Powering',
          ['Healthcare'],
          'Facilities with Smarter Management',
        ]}
        description="Ensure efficiency, safety, and compliance with Invent3Pro."
      />
    </Flex>
  );
};

export default HealthCare;
