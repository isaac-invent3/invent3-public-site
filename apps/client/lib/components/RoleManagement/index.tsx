'use client';

import { Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ListResponse } from '@repo/interfaces';
import { OPERATORS } from '@repo/constants';
import { SearchInput } from '@repo/ui/components';
import RoleTable from './RoleTable';
import Header from './Header';
import {
  useGetAllRolesQuery,
  useSearchRolesMutation,
} from '~/lib/redux/services/role.services';
import { Role } from '~/lib/interfaces/role.interfaces';

const RoleManagement = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllRolesQuery({
    pageNumber,
    pageSize,
  });
  const [search, setSearch] = useState('');

  const [searchData, setSearchData] = useState<ListResponse<Role> | undefined>(
    undefined
  );
  const { handleSubmit } = useCustomMutation();
  const [searchRole, { isLoading: searchLoading }] = useSearchRolesMutation({});

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'templateName',
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
    <Flex width="full" direction="column" pb="24px">
      <VStack width="full" spacing="40px">
        <Header />
        <HStack
          width="full"
          justifyContent="flex-end"
          borderBottom="1px"
          borderColor="neutral.300"
          pb="8px"
        >
          <SearchInput
            setSearch={setSearch}
            placeholderText="Search by role..."
          />
        </HStack>
      </VStack>
      <Flex width="full" mt="8px">
        <RoleTable
          data={
            search && searchData ? searchData.items : (data?.data?.items ?? [])
          }
          isLoading={isLoading}
          isFetching={isFetching || searchLoading}
          totalPages={
            search && searchData
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
  );
};

export default RoleManagement;
