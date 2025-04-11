'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import ImageDescription from '../Common/ImageDescription';

const content = [
  {
    title: ['More Than Just', ['Software'], '- A True Business Partner'],
    description:
      'We don’t just sell technology—we empower businesses. Our hands-on approach ensures that our solutions align with your objectives, providing real-world value beyond just automation and analytics.',
    image: '/invent3-advantage-1.png',
    imageFirst: true,
  },
  {
    title: [['Innovation'], 'at the Core – AI & Automation That Works for You'],
    description:
      'With cutting-edge AI and machine learning capabilities, Invent3Pro turns complex data into actionable intelligence, helping you make proactive decisions that drive growth.',
    image: '/invent3-advantage-2.png',
    imageFirst: false,
  },
  {
    title: ['Scalable & Flexible – Future-Proof Your', ['Business']],
    description:
      "Our platform grows with you. Whether you're a small enterprise or a multinational organization, Invent3Pro adapts to your needs, ensuring scalability, customization, and resilience.",
    image: '/invent3-advantage-3.png',
    imageFirst: true,
  },
  {
    title: [['Unmatched Support'], '– Your Success is Our Success'],
    description:
      'Our dedicated support team is with you at every step. From onboarding to continuous optimization, we ensure that your team gets the most out of Invent3Pro.',
    image: '/invent3-advantage-4.png',
    imageFirst: false,
  },
];

const Invent3Advantage = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="Why Leading Companies Trust Us"
        subtitle="Invent3.ai is more than just a software provider—we're your long-term strategic partner. Our platform is designed to enhance efficiency, reduce costs, and unlock new opportunities through AI-powered automation."
        customHeading={{ maxW: '823px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/invent3-advantage-hero-desktop.png"
        bgMobile="/invent3-advantage-hero-mobile.png"
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

export default Invent3Advantage;
