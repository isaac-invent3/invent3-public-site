'use client';

import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { CompanyIcon, UserManagementIcon } from '../CustomIcons/layout';
import Filters from './Filters';
import Header from './Header';
import SummaryCard from './SummaryCard';
import { useGetCompaniesSummaryQuery } from '~/lib/redux/services/company.services';
import { CardIcon, EditIcon } from '../CustomIcons/Dashboard';
import useCompanyTable from './Table/useCompanyTable';

const CompanyManagement = () => {
  const [search, setSearch] = useState('');

  const { data: companiesSummary, isLoading: loadingSummary } =
    useGetCompaniesSummaryQuery();
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );
  const { CompanyInfoTable } = useCompanyTable({
    search,
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />

      <SimpleGrid
        px={{ base: '16px', md: 0 }}
        mt="2em"
        width="full"
        gap="16px"
        columns={{ base: 2, lg: 4 }}
      >
        <SummaryCard
          title="Total Registered Companies"
          icon={CompanyIcon}
          value={companiesSummary?.data.totalRegisteredCompanies}
          isLoading={loadingSummary}
        />
        <SummaryCard
          title="Active Subscriptions"
          icon={CardIcon}
          value={companiesSummary?.data.activeSubscriptions}
          isLoading={loadingSummary}
        />
        <SummaryCard
          title="Trial Accounts"
          icon={UserManagementIcon}
          value={companiesSummary?.data.trialAccounts}
          isLoading={loadingSummary}
        />
        <SummaryCard
          title="Expiring soon"
          icon={EditIcon}
          value={companiesSummary?.data.expiringSoon}
          isLoading={loadingSummary}
        />
      </SimpleGrid>

      <Filters
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {CompanyInfoTable}
    </Flex>
  );
};

export default CompanyManagement;
