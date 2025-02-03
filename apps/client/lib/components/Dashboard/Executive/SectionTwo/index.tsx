import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TicketResolutionTrends from './TicketResolutionTrends';
import ScheduledUnplannedMaintenance from './ScheduledUnplannedMaintenance';
import AssetDistribution from './AssetDistribution';
import AssetTrends from '../../ClientAdmin/SectionTwo/AssetTrends';

const SectionTwo = () => {
  return (
    <SimpleGrid width="full" columns={4} gap="16px" minH="343px">
      <AssetTrends />
      <ScheduledUnplannedMaintenance />
      <TicketResolutionTrends />
      <AssetDistribution />
    </SimpleGrid>
  );
};

export default SectionTwo;
