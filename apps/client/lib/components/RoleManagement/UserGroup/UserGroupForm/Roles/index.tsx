import { Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import { useGetAllRolesQuery } from '~/lib/redux/services/role.services';
import SingleRole from './SingleRole';

const Roles = () => {
  const { data, isLoading } = useGetAllRolesQuery({ pageSize: 50 });
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
              <SingleRole key={index} data={item} />
            ))}
      </VStack>
    </VStack>
  );
};

export default Roles;
