'use client';

import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { OPERATORS } from '@repo/constants';
import { ListResponse } from '@repo/interfaces';
import { SearchInput, SlideTransition } from '@repo/ui/components';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Vendor, VendorFilter } from '~/lib/interfaces/vendor.interfaces';
import {
  useGetAllVendorsQuery,
  useSearchVendorsMutation,
} from '~/lib/redux/services/vendor.services';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import ActionButton from './Actions';
import UserActionDisplay from './Actions/Display';
import Header from './Header';
import VendorDetail from './VendorDetail';
import VendorTable from './VendorTable';

export const initialFilterData = {
  startDate: undefined,
  endDate: undefined,
};

const VendorManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllVendorsQuery({
    pageNumber,
    pageSize,
  });
  const [search, setSearch] = useState('');
  const [activeAction, setActiveAction] = useState<'bulk' | 'filter' | null>(
    null
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenDetails,
    onClose: onCloseDetails,
    onOpen: onOpenDetails,
  } = useDisclosure();

  const [searchData, setSearchData] = useState<
    ListResponse<Vendor> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchVendor, { isLoading: searchLoading }] = useSearchVendorsMutation(
    {}
  );
  const [filterData, setFilterData] = useState<VendorFilter>(initialFilterData);
  const searchParams = useSearchParams();
  const VendorId = searchParams.get(SYSTEM_CONTEXT_DETAILS.VENDOR.slug);

  // Handles Toggling the  Filter
  useEffect(() => {
    if (activeAction && !isOpen) {
      onOpen();
    }
    if (!activeAction) {
      onClose();
    }
  }, [activeAction]);

  // Checks if all filterdata is empty
  const isFilterEmpty = _.every(filterData, (value) => _.isEmpty(value));

  const searchCriterion = {
    ...((!isFilterEmpty || search) && {
      orCriterion: [
        ...(search
          ? [
              [
                {
                  columnName: 'firstName',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
        ...(search
          ? [
              [
                {
                  columnName: 'lastName',
                  columnValue: search,
                  operation: OPERATORS.Contains,
                },
              ],
            ]
          : []),
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchVendor, searchCriterion, '');
    setSearchData(response?.data?.data);
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

  // Open Detail Modal if assetId exists
  useEffect(() => {
    if (VendorId) onOpenDetails();
  }, [VendorId]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <VStack width="full" spacing="40px">
          <Header />
          <HStack
            width="full"
            justifyContent="space-between"
            borderBottom="1px"
            borderColor="neutral.300"
            pb="8px"
            flexWrap="wrap"
            px={{ base: '16px', md: 0 }}

            // display={{ base: 'none', lg: 'flex' }}
          >
            <SearchInput
              width={{base:'full', md:'100px'}}
              setSearch={setSearch}
              placeholderText="Search by name..."
              customStyle={{
                minW: { md: '363px', base: undefined },
              }}
            />
            <ActionButton
              activeAction={activeAction}
              setActiveAction={setActiveAction}
            />
          </HStack>
        </VStack>
        {isOpen && (
          <SlideTransition trigger={isOpen} direction="bottom">
            {isOpen && (
              <Flex width="full" mt="8px">
                <UserActionDisplay
                  isOpen={isOpen}
                  activeAction={activeAction}
                  handleApplyFilter={handleSearch}
                  setFilterData={setFilterData}
                  filterData={filterData}
                />
              </Flex>
            )}
          </SlideTransition>
        )}
        {/* <Flex
            mt="16px"
            px={{ base: '16px', md: 0 }}
            display={{ base: 'flex', lg: 'none' }}
          >

        <HStack
          width="full"
          // justifyContent="space-between"
          // borderBottom="1px"
          // borderColor="neutral.300"
          // pb="8px"
          // display={{ base: 'flex', lg: 'none' }}
          flexWrap="wrap"
        >
          <SearchInput
            setSearch={setSearch}
            placeholderText="Search by name..."
            customStyle={{ minW: '363px' }}
          />
          <ActionButton
            activeAction={activeAction}
            setActiveAction={setActiveAction}
          />
        </HStack>
          </Flex> */}

        <Flex width="full" mt="8px">
          <VendorTable
            data={
              search && searchData
                ? searchData.items
                : (data?.data?.items ?? [])
            }
            isLoading={isLoading}
            isFetching={isFetching || searchLoading}
            totalPages={
              (search || !isFilterEmpty) && searchData
                ? searchData?.totalPages
                : data?.data?.totalPages
            }
            showFooter={true}
            emptyLines={25}
            isSelectable
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            showPopover
          />
        </Flex>
      </Flex>
      <VendorDetail onClose={onCloseDetails} isOpen={isOpenDetails} />
    </>
  );
};

export default VendorManagement;
