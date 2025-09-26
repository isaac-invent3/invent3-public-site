import { Skeleton, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from '~/lib/components/RoleManagement/Permissions/Header';
import { useGetAllModulesQuery } from '~/lib/redux/services/modules.services';
import ModuleItem from './Module';

const AllEventTypes = () => {
  const { data, isLoading } = useGetAllModulesQuery({ pageSize: 50 });
  return (
    <VStack width="full" spacing={0}>
      <Header />
      <VStack
        width="full"
        justifyContent="space-between"
        bgColor="white"
        spacing={0}
        divider={<StackDivider borderColor="#BBBBBB" />}
      >
        {isLoading
          ? Array(5)
              .fill('')
              .map((_, index) => (
                <Skeleton key={index} width="full" height="48px" />
              ))
          : data?.data?.items?.map((item, index) => (
              <ModuleItem key={index} data={item} />
            ))}
      </VStack>
    </VStack>
  );
};

export default AllEventTypes;
