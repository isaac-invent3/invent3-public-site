import { Flex } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { OPERATORS } from '@repo/constants';
import { useSearchRolesMutation } from '~/lib/redux/services/role.services';
import { ListResponse } from '@repo/interfaces';
import { useGetUserGroupsQuery } from '~/lib/redux/services/user.services';
// import { UserGroup } from '~/lib/interfaces/user.interfaces';
import { Role } from '~/lib/interfaces/role.interfaces';
import UserGroupTable from './GroupTable';

interface UserGroupProps {
  search: string;
}
const UserGroups = ({ search }: UserGroupProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetUserGroupsQuery({
    pageNumber,
    pageSize,
    userId: 25,
  });

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

  return (
    <Flex width="full" mt="8px">
      <UserGroupTable
        data={data?.data?.items ?? []}
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

export default UserGroups;
