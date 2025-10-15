'use client';

import { Flex } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import Features from './Features';
import CTA from '../Common/CallToAction';
import FaqAccordion from '../FAQ/FaqAccordion';
import IndustriesSlides from './IndustriesSlides';
import AboutUs from './About';
import Solutions from './Solutions';
import Spreadsheet from './Spreadsheet';
import WhyUs from './WhyUs';
import Statistics from './Statistics';
import RoleSolution from './RoleSolution';
import OurIntegrations from './OurIntegrations';
import ThreeSteps from './ThreeSteps';
import DataSecurity from './DataSecurity';

const LandingPage = () => {
  return (
    <Flex direction="column" bgColor="#FFFFFF">
      <Hero />
      <IndustriesSlides />
      <AboutUs />
      <Features />
      <Solutions />
      <Spreadsheet />
      <WhyUs />
      <Statistics />
      <RoleSolution />
      <OurIntegrations />
      <ThreeSteps />
      <DataSecurity />
      <FaqAccordion />
      <CTA />
    </Flex>
  );
};

export default LandingPage;
