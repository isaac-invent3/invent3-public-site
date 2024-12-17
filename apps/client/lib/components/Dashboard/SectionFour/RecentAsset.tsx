import { Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import CardHeader from '../Common/CardHeader';
import { useSearchAssetsMutation } from '~/lib/redux/services/asset/general.services';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  timeRangeOptions,
} from '~/lib/utils/constants';
import { Option, SearchResponse } from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import DropDown from '../Common/DropDown';
import { SearchInput } from '@repo/ui/components';
import AssetTable from '../../AssetManagement/Common/AssetTable';
import { useGetRecentAssetsQuery } from '~/lib/redux/services/dashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';

const RecentAsset = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[0] as Option
  );
  const { handleSubmit } = useCustomMutation();
  const [searchAsset, { isLoading: searchLoading }] = useSearchAssetsMutation(
    {}
  );
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const { data, isLoading, isFetching } = useGetRecentAssetsQuery(
    {
      id: selectedCountry?.value,
      ...(selectedState?.value ? { regionId: selectedState?.value } : {}),
      pageSize,
      pageNumber: currentPage,
      datePeriod: selectedTimeRange?.value,
    },
    { skip: search !== '' }
  );

  const searchCriterion = {
    criterion: [
      {
        columnName: 'assetName',
        columnValue: search,
        operation: OPERATORS.Contains,
      },
    ],
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchAsset, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchAsset, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, currentPage, pageSize]);

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setCurrentPage(1);
    }
  }, [search]);

  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      spacing="18px"
      bgColor="white"
      rounded="8px"
      maxH="375px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Recent Assets</CardHeader>
        <HStack spacing="8px">
          <SearchInput
            setSearch={setSearch}
            width="200px"
            iconSize="20px"
            containerStyle={{ maxHeight: '28px' }}
            leftElementStyle={{ pb: '12px' }}
            customStyle={{
              minHeight: '28px',
              maxHeight: '28px',
              bgColor: 'neutral.200',
              rounded: '5px',
              border: 'none',
            }}
          />
          <DropDown
            options={timeRangeOptions}
            label="Timeline"
            handleClick={(option) => setSelectedTimeRange(option)}
            selectedOptions={selectedTimeRange}
            width="110px"
          />
        </HStack>
      </HStack>
      <Flex width="full" height="full" maxH="280px" overflowY="auto">
        <AssetTable
          data={
            search && searchData ? searchData.items : (data?.data?.items ?? [])
          }
          isLoading={isLoading}
          isFetching={isFetching || searchLoading}
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={
            search && searchData
              ? searchData?.totalPages
              : data?.data?.totalPages
          }
          showFooter={true}
          emptyLines={10}
          isSelectable={false}
        />
      </Flex>
    </VStack>
  );
};

export default RecentAsset;
