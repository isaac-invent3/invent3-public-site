'use client';

import { Flex } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { OPERATORS } from '@repo/constants';
import { useSearchRolesMutation } from '~/lib/redux/services/role.services';
import { ListResponse } from '@repo/interfaces';
import { useGetAllUserGroupsInfoHeaderQuery } from '~/lib/redux/services/user.services';
import { Role } from '~/lib/interfaces/role.interfaces';
import UserGroupTable from './GroupTable';

interface UserGroupProps {
  search: string;
}
const UserGroups = ({ search }: UserGroupProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllUserGroupsInfoHeaderQuery({
    pageNumber,
    pageSize,
    searchParam: search,
  });

  // Reset pagination when clearing the search
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  return (
    <Flex width="full" mt="8px">
      <UserGroupTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
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

export default UserGroups;
