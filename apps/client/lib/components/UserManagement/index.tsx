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
  userApi,
  useSearchUsersMutation,
} from '~/lib/redux/services/user.services';
import { User, UserFilter } from '~/lib/interfaces/user.interfaces';
import Header from './Header';
import ActionButton from './Actions';
import UserActionDisplay from './Actions/Display';
import { useSearchParams } from 'next/navigation';
import UserDetail from './UserDetail';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { updateSelectedTableIds } from '~/lib/redux/slices/CommonSlice';

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
  const dispatch = useAppDispatch();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { selectedTableIds } = useAppSelector((state) => state.common);

  const [searchData, setSearchData] = useState<ListResponse<User> | undefined>(
    undefined
  );
  const { handleSubmit } = useCustomMutation();
  const [searchUser, { isLoading: searchLoading }] = useSearchUsersMutation({});
  const [filterData, setFilterData] = useState<UserFilter>(initialFilterData);
  const searchParams = useSearchParams();
  const userId = searchParams?.get(SYSTEM_CONTEXT_DETAILS.USER.slug);
  const { updateSearchParam } = useCustomSearchParams();

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
    setPageSize(DEFAULT_PAGE_SIZE);
    setPageNumber(1);
  }, [search]);

  // Open Detail Modal if assetId exists
  useEffect(() => {
    if (userId) onOpenDetails();
  }, [userId]);

  // Reset Selected Row when SelectedIds array is emptied
  useEffect(() => {
    if (selectedTableIds.length === 0 && selectedRows.length > 0) {
      setSelectedRows([]);
    }
  }, [selectedTableIds]);

  // Update selectedTableIds array when selected row is greater than 1
  useEffect(() => {
    if (selectedRows.length > 0) {
      const sourceItems = searchData?.items || data?.data?.items || [];
      const userIds = selectedRows
        .map((rowId) => sourceItems[rowId]?.userId) // Access by index and get id
        .filter((id): id is number => id !== undefined); // Filter out undefined values
      dispatch(updateSelectedTableIds(userIds));
    }
    if (selectedRows.length === 0) {
      // Reset selectedTableIds when no rows are selected
      dispatch(updateSelectedTableIds([]));
    }
  }, [selectedRows]);

  //Handle apply Filter
  const handleApplyFilter = () => {
    setPageSize(1);
    setPageSize(DEFAULT_PAGE_SIZE);
    handleSearch();
  };

  // SignalR Connection
  const connectionState = useSignalR('users-hub');

  useSignalREventHandler({
    eventName: 'CreateUser',
    connectionState,
    callback: (newUser) => {
      // Update the query cache when a new user is received
      const parsedUser = JSON.parse(newUser);
      dispatch(
        userApi.util.updateQueryData(
          'getAllUsers',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedUser); // Add new user to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateUser',
    connectionState,
    callback: (updatedUser) => {
      // Update the query cache when a user is updated
      const parsedUser = JSON.parse(updatedUser);
      dispatch(
        userApi.util.updateQueryData(
          'getAllUsers',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.userId === parsedUser.userId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedUser;
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteUser',
    connectionState,
    callback: (deleteUser) => {
      // Update the query cache when a user is deleted
      const parsedUser = JSON.parse(deleteUser);
      dispatch(
        userApi.util.updateQueryData(
          'getAllUsers',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) => item.userId !== parsedUser.userId
              ); // Remove the deleted user
            }
          }
        )
      );
    },
  });

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
                  handleApplyFilter={handleApplyFilter}
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
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            showPopover
            handleSelectRow={(row) => {
              updateSearchParam(SYSTEM_CONTEXT_DETAILS.USER.slug, row.userId);
            }}
          />
        </Flex>
      </Flex>
      <UserDetail onClose={onCloseDetails} isOpen={isOpenDetails} />
    </>
  );
};

export default UserManagement;
