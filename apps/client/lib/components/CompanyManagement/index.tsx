'use client';

import { Flex, SimpleGrid } from '@chakra-ui/react';
import { AssetManagementIcon } from '../CustomIcons/layout';
import Header from './Header';
import SummaryCard from './SummaryCard';

const CompanyManagement = () => {
  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <SimpleGrid mt='2em' width="full" gap="16px" columns={{ base: 2, md: 4 }}>
        <SummaryCard
          title="Total Asset Managed Under Management"
          icon={AssetManagementIcon}
          value={3}
          isLoading={false}
        />
        <SummaryCard
          title="Total Asset Managed Under Management"
          icon={AssetManagementIcon}
          value={3}
          isLoading={false}
        />
        <SummaryCard
          title="Total Asset Managed Under Management"
          icon={AssetManagementIcon}
          value={3}
          isLoading={false}
        />
        <SummaryCard
          title="Total Asset Managed Under Management"
          icon={AssetManagementIcon}
          value={3}
          isLoading={false}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default CompanyManagement;
