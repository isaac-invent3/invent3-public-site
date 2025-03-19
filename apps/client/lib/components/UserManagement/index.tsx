'use client';

import { Flex, Stack, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ListResponse } from '@repo/interfaces';
import { OPERATORS } from '@repo/constants';
import { SearchInput, SlideTransition } from '@repo/ui/components';
import _ from 'lodash';
// import { generateSearchCriterion } from '@repo/utils';
import UserTable from './UserTable';
import {
  useGetAllUsersQuery,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { User, UserFilter } from '~/lib/interfaces/user.interfaces';
import Header from './Header';
import ActionButton from './Actions';
import UserActionDisplay from './Actions/Display';
import { useSearchParams } from 'next/navigation';
import UserDetail from './UserDetail';

export const initialFilterData = {
  startDate: undefined,
  endDate: undefined,
};

const UserManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
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

  const [searchData, setSearchData] = useState<ListResponse<User> | undefined>(
    undefined
  );
  const { handleSubmit } = useCustomMutation();
  const [searchUser, { isLoading: searchLoading }] = useSearchUsersMutation({});
  const [filterData, setFilterData] = useState<UserFilter>(initialFilterData);
  const searchParams = useSearchParams();
  const userId = searchParams.get(SYSTEM_CONTEXT_DETAILS.USER.slug);

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
    const response = await handleSubmit(searchUser, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchUser, searchCriterion]);

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
    if (userId) onOpenDetails();
  }, [userId]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <VStack width="full" spacing="40px">
          <Header />
          <Stack
            spacing="16px"
            width="full"
            direction={{ base: 'column', lg: 'row' }}
            justifyContent="space-between"
            borderBottom={{ lg: '1px' }}
            borderColor="#BBBBBBB2 !important"
            pb="8px"
            px={{ base: '16px', md: 0 }}
          >
            <SearchInput
              setSearch={setSearch}
              placeholderText="Search by name..."
              containerStyle={{ minW: { base: 'full', lg: 'max-content' } }}
              customStyle={{ minW: { base: 'full', lg: '363px' } }}
            />
            <ActionButton
              activeAction={activeAction}
              setActiveAction={setActiveAction}
            />
          </Stack>
        </VStack>
        {isOpen && (
          <SlideTransition trigger={isOpen} direction="bottom">
            {isOpen && (
              <Flex
                width="full"
                mt="8px"
                px={{ base: '16px', md: 0 }}
                mb={{ base: '16px', lg: 0 }}
              >
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
        <Flex width="full" mt="8px">
          <UserTable
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
      <UserDetail onClose={onCloseDetails} isOpen={isOpenDetails} />
    </>
  );
};

export default UserManagement;
