'use client';

import { Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageHeader from '../UI/PageHeader';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import SummaryCards from './SummaryCards';
import ComplianceTable from './ComplianceTable';
import { useGetAllAssetComplianceQuery } from '~/lib/redux/services/asset/compliance.services';

const Compliance = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllAssetComplianceQuery({
    pageNumber,
    pageSize,
  });

  return (
    <>
      <Flex width="full" direction="column" pb="24px" gap="24px">
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="24px"
          px={{ base: '16px', md: 0 }}
        >
          <PageHeader>Compliance Overview</PageHeader>
          <SummaryCards />
        </VStack>

        <ComplianceTable
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          totalPages={data?.data?.totalPages}
          showFooter={true}
          emptyLines={25}
          isSelectable={false}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          showPopover
        />
      </Flex>
    </>
  );
};

export default Compliance;
