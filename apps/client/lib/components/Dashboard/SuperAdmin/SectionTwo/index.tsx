import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SubscriptionTrends from './SubscriptionTrends';
import UserDemographics from './UserDemographics';
import TrafficAnalytics from './TrafficAnalytics';
import CompanyDistribution from './CompanyDistribution';

const SectionTwo = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, md: 2, xl: 4 }}
      gap="16px"
      minH="343px"
    >
      <SubscriptionTrends />
      <UserDemographics />
      <TrafficAnalytics />
      <CompanyDistribution />
    </SimpleGrid>
  );
};

export default SectionTwo;
