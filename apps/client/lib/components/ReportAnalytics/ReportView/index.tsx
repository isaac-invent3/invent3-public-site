'use client';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useGetallAssetQuery } from '~/lib/redux/services/asset/general.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import AssetTable from '../../AssetManagement/Common/AssetTable';
import GenericBreadCrumb from '../../UI/BreadCrumb';
import PageHeader from '../../UI/PageHeader';
import ReportViewFilters from '../Filters/ReportViewFilters';

const ReportView = () => {
  const { data, isLoading, isFetching } = useGetallAssetQuery({
    pageNumber: 1,
    pageSize: 30,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [activeFilter, setActiveFilter] = useState<'general' | null>(null);

  const breadCrumbData = [
    {
      label: 'Dashboard',
      route: '/',
    },
    {
      label: 'Report & Analytics',
      route: '#',
    },
  ];

  return (
    <Flex width="full" direction="column" pb="24px" pt="12px">
      <VStack
        spacing="58px"
        alignItems="flex-start"
        width="full"
        pt="12px"
        borderBottom="1px solid #BBBBBB"
        paddingBottom="16px"
        marginBottom="16px"
      >
        <GenericBreadCrumb routes={breadCrumbData} />
        <HStack width="full" justifyContent="space-between" alignItems="center">
          <VStack alignItems="start">
            <HStack spacing="16px">
              <PageHeader>Maintenance History Report</PageHeader>

              <Text
                bg="#BBBBBB"
                borderRadius="24px"
                padding="6px 12px"
                color="#0E2642"
              >
                Default
              </Text>
            </HStack>

            <HStack>
              <Text
                color="#838383"
                fontSize="14px"
                fontWeight="700"
                lineHeight="16.63px"
              >
                Created by: Admin
              </Text>

              <Text
                color="#838383"
                fontSize="12px"
                lineHeight="14.26px"
                fontWeight="500"
              >
                | 12th Nov 2024
              </Text>
            </HStack>
          </VStack>

          <Text
            color="#0E2642"
            fontSize="14px"
            fontWeight="500"
            lineHeight="16.63px"
          >
            Total Record: 106
          </Text>

          <ReportViewFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </HStack>
      </VStack>

      <AssetTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={data?.data?.totalPages}
        showFooter={true}
        emptyLines={25}
        isSelectable={true}
      />
    </Flex>
  );
};

export default ReportView;
