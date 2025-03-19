import { Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SingleFeature from './SingleFeature';

const featureData = [
  {
    title: 'Seamless Asset Tracking',
    description:
      'Gain complete visibility into asset locations, statuses, and lifecycles with real-time monitoring and smart tracking tools.',
    image: '/asset-management.png',
    imageFirst: false,
  },
  {
    title: 'Automated Maintenance Scheduling',
    description:
      'Keep assets in peak condition with automated maintenance workflows that prevent unexpected breakdowns and costly repairs.',
    image: '/asset-management.png',
    imageFirst: true,
  },
  {
    title: 'Compliance & Audit Management',
    description:
      'Stay audit-ready with automated compliance checks, real-time documentation tracking, and alerts for policy adherence.',
    image: '/asset-management.png',
    imageFirst: false,
  },
  {
    title: 'Powerful Reporting & Analytics',
    description:
      'Make informed decisions with customizable reports on asset performance, maintenance history, and overall operational efficiency.',
    image: '/asset-management.png',
    imageFirst: true,
  },
];

const FeatureItems = () => {
  return (
    <VStack width="full" spacing="40px">
      <VStack width="full">
        <Heading
          fontWeight={800}
          size={{ base: 'lg', lg: '2xl' }}
          color="primary.500"
          maxW="707px"
          textAlign="center"
        >
          Powerful Features for Seamless Asset Management
        </Heading>
        <Text
          fontSize={{ base: '14px', md: '16px' }}
          lineHeight={{ base: '20px', md: '24px' }}
          color="neutral.600"
          fontWeight={400}
          maxW="606px"
          textAlign="center"
        >
          Invent3 is designed to streamline asset management, ensuring
          efficiency, accuracy, and cost-effectiveness at every stage.
        </Text>
      </VStack>
      <VStack width="full" spacing={{ base: '60px', lg: '80px' }}>
        {featureData.map((item, index) => (
          <SingleFeature key={index} {...item} />
        ))}
      </VStack>
    </VStack>
  );
};

export default FeatureItems;
