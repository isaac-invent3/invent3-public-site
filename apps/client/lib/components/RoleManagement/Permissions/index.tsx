import { Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import ModuleItem from './Module';
import { useGetAllModulesQuery } from '~/lib/redux/services/modules.services';

const Permissions = () => {
  const { data, isLoading } = useGetAllModulesQuery({});
  return (
    <VStack width="full" spacing={0}>
      <Header />
      <VStack
        width="full"
        justifyContent="space-between"
        bgColor="white"
        spacing={0}
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

export default Permissions;
