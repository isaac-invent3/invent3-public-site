'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import ImageDescription from '../Common/ImageDescription';
import OurProcess from './OurProcess';

const content = [
  {
    title: ['Our Process - A Proven', ['Framework'], 'for Success'],
    description:
      'We follow a structured yet flexible process that ensures measurable impact',
    image: '/how-we-work-1.png',
    imageFirst: false,
    children: <OurProcess />,
  },
  {
    title: [
      ['AI-Driven'],
      '& Data-Powered – Smarter Decisions, Better Outcomes',
    ],
    description:
      "Our platform doesn't just digitize your operations—it enhances them. By leveraging AI and machine learning, we transform raw data into predictive insights, allowing you to stay ahead of risks, reduce downtime, and drive smarter investments.",
    image: '/how-we-work-2.png',
    imageFirst: true,
  },
  {
    title: [
      'Designed for Seamless Adoption - Easy',
      ['Integration'],
      ', Fast ROI',
    ],
    description:
      "Invent3Pro is built for rapid implementation. With minimal disruption and easy integrations, your teams can start seeing value immediately—whether it's reducing operational costs, streamlining asset tracking, or improving service delivery.",
    image: '/how-we-work-3.png',
    imageFirst: false,
  },
  {
    title: [['Continuous'], 'Improvement - Evolving with Your Needs'],
    description:
      "Your business is dynamic, and so is Invent3Pro. With ongoing updates, new AI models, and data-driven refinements, we ensure that our platform evolves alongside your organization's changing demands.",
    image: '/how-we-work-4.png',
    imageFirst: true,
  },
];

const HowWeWork = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Our Approach to Innovation"
        subtitle="At Invent3.ai, we redefine how businesses manage assets, operations, and infrastructure. Our intelligent, AI-powered platform adapts to your organization’s unique needs, enabling strategic decision-making, cost reduction, and operational efficiency."
        customHeading={{ maxW: '823px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/how-we-work-hero-desktop.png"
        bgMobile="/how-we-work-hero-mobile.png"
      />
      <Flex justifyContent="center" width="full">
        <Flex
          width="full"
          justifyContent="space-between"
          alignItems="flex-start"
          px={{ base: '16px', md: '40px', '2xl': '80px' }}
          py={{ base: '80px', lg: '120px' }}
          maxW="1440px"
          direction="column"
          gap={{ base: '80px', lg: '80px' }}
        >
          {content.map((item, index) => (
            <ImageDescription {...item} key={index} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HowWeWork;
