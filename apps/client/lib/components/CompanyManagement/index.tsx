'use client';

import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { AssetManagementIcon } from '../CustomIcons/layout';
import Filters from './Filters';
import Header from './Header';
import SummaryCard from './SummaryCard';
import CompanyTable from './Table/CompanyTable';
import { dummyCompanies } from './dummyData';

const CompanyManagement = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

  const dummyResponse = {
    data: {
      items: dummyCompanies,
      hasNextPage: false,
      hasPreviousPage: false,
      pageNumber: 1,
      totalItems: 20,
      totalPages: 1,
    },
    message: 'Companies Retrieved Succesfully',
    responseId: '',
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />

      <SimpleGrid
        px={{ base: '16px', md: 0 }}
        mt="2em"
        width="full"
        gap="16px"
        columns={{ base: 1, md: 2, lg: 4 }}
      >
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

      <Filters
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <CompanyTable data={dummyResponse} isFetching={false} isLoading={false} />
    </Flex>
  );
};

export default CompanyManagement;
