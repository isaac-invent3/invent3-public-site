'use client';

import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { CompanyIcon, UserManagementIcon } from '../CustomIcons/layout';
import Filters from './Filters';
import Header from './Header';
import SummaryCard from './SummaryCard';
import CompanyTable from './Table/CompanyTable';
import {
  useGetAllCompaniesQuery,
  useGetCompaniesSummaryQuery,
  useSearchCompaniesMutation,
} from '~/lib/redux/services/company.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Company } from '~/lib/interfaces/company.interfaces';
import { CardIcon, EditIcon } from '../CustomIcons/Dashboard';

const CompanyManagement = () => {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllCompaniesQuery({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });
  const { data: companiesSummary, isLoading: loadingSummary } =
    useGetCompaniesSummaryQuery();
  const [activeFilter, setActiveFilter] = useState<'bulk' | 'general' | null>(
    null
  );

  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Company>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchLog, { isLoading: searchLoading }] = useSearchCompaniesMutation(
    {}
  );

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'companyName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchLog, searchCriterion, '');
    setSearchData(response?.data);
  }, [searchLog, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

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

      <CompanyTable
        data={search ? searchData : data}
        isFetching={isFetching || searchLoading}
        isLoading={isLoading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </Flex>
  );
};

export default CompanyManagement;
