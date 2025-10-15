'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import HeroHeader from '../../Common/HeroHeader';
import Challenges from './TheChallenges';
import Solutions from './ChallengeSolutions';
import CTA from '../Common/CTA';
import Advantage from './Advantage';

const FleetLogistics = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Optimize Fleet & Logistics Operations with Smart Automation"
        subtitle="  Managing a fleet or logistics network requires real-time tracking, predictive maintenance, and cost-efficient operations. Invent3Pro empowers logistics providers and fleet managers with automation, data-driven insights, and seamless asset monitoring to improve operational efficiency and reduce downtime."
        customHeading={{ maxW: '823px' }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/sector-logistics-hero-desktop.png"
        bgMobile="/sector-logistics-hero-mobile.png"
      />
      <Challenges />
      <Solutions />
      <Advantage />
      <CTA
        heading={['Transform Your', ['Fleet & Logistics'], 'Operations Today']}
        description="Improve efficiency, reduce costs, and optimize logistics with AI-powered automation."
      />
    </Flex>
  );
};

export default FleetLogistics;
