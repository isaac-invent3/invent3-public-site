import { Flex, HStack, VStack } from '@chakra-ui/react';
import { ListResponse } from '@repo/interfaces';
import { SearchInput } from '@repo/ui/components';
import { useCallback, useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useSearchAssetsMutation } from '~/lib/redux/services/asset/general.services';
import { useGetRecentAssetsQuery } from '~/lib/redux/services/dashboard.services';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  timeRangeOptions,
} from '~/lib/utils/constants';
import AssetTable from '../../../AssetManagement/Common/AssetTable';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';

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
  const [searchData, setSearchData] = useState<ListResponse<Asset> | null>(
    null
  );
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

    response?.data?.data && setSearchData(response?.data?.data);
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
      minH="300px"
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
      <HStack width="full" justifyContent="space-between" flexWrap="wrap">
        <CardHeader>Recent Assets</CardHeader>
        <HStack spacing="8px" flexWrap="wrap">
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
          showFooter={data?.data && data?.data?.totalPages > 1 ? true : false}
          emptyLines={10}
          isSelectable={false}
        />
      </Flex>
    </VStack>
  );
};

export default RecentAsset;
