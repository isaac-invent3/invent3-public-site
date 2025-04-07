import { Flex } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import RoleTable from './RoleTable';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { OPERATORS } from '@repo/constants';
import {
  rolesApi,
  useGetAllRolesQuery,
  useSearchRolesMutation,
} from '~/lib/redux/services/role.services';
import { ListResponse } from '@repo/interfaces';
import { Role } from '~/lib/interfaces/role.interfaces';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch } from '~/lib/redux/hooks';

interface UserRoleProps {
  search: string;
}
const UserRole = ({ search }: UserRoleProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllRolesQuery({
    pageNumber,
    pageSize,
  });
  const dispatch = useAppDispatch();

  const [searchData, setSearchData] = useState<ListResponse<Role> | undefined>(
    undefined
  );
  const { handleSubmit } = useCustomMutation();
  const [searchRole, { isLoading: searchLoading }] = useSearchRolesMutation({});

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'roleName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  const handleSearch = useCallback(async () => {
    const response = await handleSubmit(searchRole, searchCriterion, '');
    setSearchData(response?.data?.data);
  }, [searchRole, searchCriterion]);

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
  const connectionState = useSignalR('userRole-hub');

  useSignalREventHandler({
    eventName: 'CreateUserRole',
    connectionState,
    callback: (newRole) => {
      // Update the query cache when a new user is received
      const parsedRole = JSON.parse(newRole);
      dispatch(
        rolesApi.util.updateQueryData(
          'getAllRoles',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedRole); // Add new user to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateUserRole',
    connectionState,
    callback: (updatedRole) => {
      // Update the query cache when a user is updated
      const parsedRole = JSON.parse(updatedRole);
      dispatch(
        rolesApi.util.updateQueryData(
          'getAllRoles',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.roleId === parsedRole.roleId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedRole;
              }
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'DeleteUserRole',
    connectionState,
    callback: (deleteUser) => {
      // Update the query cache when a role is deleted
      const parsedRole = JSON.parse(deleteUser);
      dispatch(
        rolesApi.util.updateQueryData(
          'getAllRoles',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) => item.roleId !== parsedRole.roleId
              ); // Remove the deleted role
            }
          }
        )
      );
    },
  });

  return (
    <Flex width="full" mt="8px">
      <RoleTable
        data={
          search && searchData ? searchData.items : (data?.data?.items ?? [])
        }
        isLoading={isLoading}
        isFetching={isFetching || searchLoading}
        totalPages={
          search && searchData ? searchData?.totalPages : data?.data?.totalPages
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
  );
};

export default UserRole;
