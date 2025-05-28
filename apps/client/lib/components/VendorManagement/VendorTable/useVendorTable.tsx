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
  vendorApi,
} from '~/lib/redux/services/vendor.services';
import { Vendor, VendorFilter } from '~/lib/interfaces/vendor.interfaces';
import { generateSearchCriterion } from '@repo/utils';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useSignalR from '~/lib/hooks/useSignalR';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateSelectedTableIds } from '~/lib/redux/slices/CommonSlice';

interface useVendorTable {
  search?: string;
  showFooter?: boolean;
  filterData?: VendorFilter;
  customPageSize?: number;
  isSelectable?: boolean;
}

const useVendorTable = (props: useVendorTable) => {
  const {
    search,
    showFooter = true,
    filterData,
    customPageSize,
    isSelectable,
  } = props;
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
  const dispatch = useAppDispatch();
  const [searchVendor, { isLoading: searchLoading }] = useSearchVendorsMutation(
    {}
  );
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedTableIds } = useAppSelector((state) => state.common);

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

  // SignalR Connection
  const connectionState = useSignalR('vendors-hub');

  useSignalREventHandler({
    eventName: 'CreateVendor',
    connectionState,
    callback: (newVendor) => {
      // Update the query cache when a new vendor is received
      const parsedVendor = JSON.parse(newVendor);
      dispatch(
        vendorApi.util.updateQueryData(
          'getAllVendors',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedVendor); // Add new vendor to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateVendor',
    connectionState,
    callback: (updatedVendor) => {
      // Update the query cache when a vendor is updated
      const parsedVendor = JSON.parse(updatedVendor);
      dispatch(
        vendorApi.util.updateQueryData(
          'getAllVendors',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.vendorId === parsedVendor.vendorId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedVendor;
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteVendor',
    connectionState,
    callback: (deletedVendor) => {
      // Update the query cache when a vendor is deleted
      const parsedVendor = JSON.parse(deletedVendor);
      dispatch(
        vendorApi.util.updateQueryData(
          'getAllVendors',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) => item.vendorId !== parsedVendor.vendorId
              ); // Remove the deleted vendor
            }
          }
        )
      );
    },
  });

  // Reset Selected Row when SelectedIds array is emptied
  useEffect(() => {
    if (selectedTableIds.length === 0 && selectedRows.length > 0) {
      setSelectedRows([]);
    }
  }, [selectedTableIds]);

  // Update selectedTableIds array when selected row is greater than 1
  useEffect(() => {
    if (selectedRows.length > 0) {
      const sourceItems = searchData?.data?.items || data?.data?.items || [];
      const vendorIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.vendorId) // Access by index and get id
        .filter((id): id is number => id !== undefined); // Filter out undefined values
      dispatch(updateSelectedTableIds(vendorIds));
    }
    if (selectedRows.length === 0) {
      // Reset selectedTableIds when no rows are selected
      dispatch(updateSelectedTableIds([]));
    }
  }, [selectedRows]);

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
        isSelectable={isSelectable}
        setPageSize={setPageSize}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
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
