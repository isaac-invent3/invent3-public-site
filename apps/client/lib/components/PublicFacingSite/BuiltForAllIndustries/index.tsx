'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import HeroHeader from '../Common/HeroHeader';
import ImageDescription from '../Common/ImageDescription';
import UseCases from './UseCases';

const content = [
  {
    title: [['Custom-Tailored'], 'for Your Industry'],
    description:
      'From healthcare to finance, logistics to real estate, our platform is equipped with specialized tools to meet sector-specific challenges, ensuring maximum efficiency and compliance.',
    image: '/built-for-all-industries-1.png',
    imageFirst: true,
  },
  {
    title: ['Scalable Across', ['Businesses'], 'of Any Size'],
    description:
      "Whether you're managing a single facility or overseeing a global enterprise, Invent3Pro scales effortlessly, providing visibility, automation, and control at every level.",
    image: '/built-for-all-industries-2.png',
    imageFirst: false,
  },
  {
    title: ['Real-World Success -', ['Industry'], 'Use Cases'],
    description: 'Companies worldwide rely on Invent3Pro to',
    image: '/built-for-all-industries-3.png',
    imageFirst: true,
    children: <UseCases />,
  },
  {
    title: [
      'The ',
      ['Invent3.ai'],
      'Promise – Reliable, Secure, and Intelligent',
    ],
    description:
      'We provide more than software—we deliver confidence. Invent3Pro ensures top-tier security, regulatory compliance, and AI-driven efficiency, making it the trusted choice for industry leaders.',
    image: '/built-for-all-industries-4.png',
    imageFirst: false,
  },
];

const BuiltForAllIndustries = () => {
  return (
    <Flex direction="column">
      <HeroHeader
        title="A Platform That Adapts to Any Sector"
        subtitle="No matter your industry, Invent3Pro is designed to streamline your operations, optimize asset management, and drive long-term profitability."
        customHeading={{ maxW: '823px' }}
        containerStyle={{ spacing: { base: '16px', lg: '24px' } }}
        subTitleStyle={{ maxW: { lg: '705px' } }}
        bgDesktop="/built-for-all-industries-hero-desktop.png"
        bgMobile="/built-for-all-industries-hero-mobile.png"
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

export default BuiltForAllIndustries;
