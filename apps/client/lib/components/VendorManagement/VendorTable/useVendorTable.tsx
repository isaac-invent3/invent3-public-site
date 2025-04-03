import { Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { OPERATORS } from '@repo/constants';
import VendorTable from '.';
import {
  useGetAllVendorsQuery,
  useSearchVendorsMutation,
} from '~/lib/redux/services/vendor.services';
import { Vendor, VendorFilter } from '~/lib/interfaces/vendor.interfaces';
import { generateSearchCriterion } from '@repo/utils';

interface useVendorTable {
  search?: string;
  showFooter?: boolean;
  filterData?: VendorFilter;
  customPageSize?: number;
}

const useVendorTable = (props: useVendorTable) => {
  const { search, showFooter = true, filterData, customPageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllVendorsQuery({
    pageNumber: pageNumber,
    pageSize: customPageSize ?? pageSize,
  });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<Vendor>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchVendor, { isLoading: searchLoading }] = useSearchVendorsMutation(
    {}
  );

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(filterData, (value) => _.isEmpty(value));

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'vendorName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
      ...(!isFilterEmpty && {
        orCriterion: [
          ...[filterData?.startDate]
            .filter(Boolean)
            .map((item) => [
              ...generateSearchCriterion(
                'createdDate',
                [item as string],
                OPERATORS.Contains
              ),
            ]),
          ...[filterData?.endDate]
            .filter(Boolean)
            .map((item) => [
              ...generateSearchCriterion(
                'createdDate',
                [item as string],
                OPERATORS.Contains
              ),
            ]),
        ],
      }),
    }),
    pageNumber,
    pageSize,
  };

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

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchVendor, searchCriterion, '');
    setSearchData(response?.data);
  }, [searchVendor, searchCriterion]);

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

  const VendorInfoTable = (
    <Flex width="full" direction="column">
      <VendorTable
        data={
          search && searchData
            ? searchData?.data?.items
            : (data?.data?.items ?? [])
        }
        isFetching={isFetching || searchLoading}
        isLoading={isLoading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        showFooter={showFooter}
        emptyLines={25}
      />
    </Flex>
  );
  //   const Filter = (
  //     <Flex width="full" pb="16px">
  //       <GeneralFilter handleApplyFilter={handleSearch} />
  //     </Flex>
  //   );
  return {
    handleSearch,
    VendorInfoTable,
    totalPages:
      search && searchData
        ? searchData.data?.totalPages
        : (data?.data?.totalPages ?? 0),
    pageSize,
    pageNumber,
    setPageNumber,
    setPageSize,
    // Filter,
  };
};

export default useVendorTable;
