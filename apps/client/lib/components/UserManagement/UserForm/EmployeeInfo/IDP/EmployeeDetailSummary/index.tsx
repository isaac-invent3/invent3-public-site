import { Flex, Text, VStack } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import {
  useGetUserByIdQuery,
  useGetUserProfileByGuidQuery,
} from '~/lib/redux/services/user.services';
import EmployeeDetail from './EmployeeDetail';

const EmployeeDetailSummary = () => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('employeeId');
  const { data: user, isLoading: loadingUser } = useGetUserByIdQuery(
    { userId: meta.value! },
    { skip: !meta.value }
  );
  const { data, isLoading } = useGetUserProfileByGuidQuery(
    { guid: user?.data?.guid! },
    { skip: !user }
  );
  return (
    <VStack width="full" spacing="25px" alignItems="flex-start" mt="15px">
      <Text size="md" color="black" fontWeight={700}>
        Employee Info
      </Text>

      {(isLoading || loadingUser) && <PageLoadingSkeleton />}
      {!isLoading && !loadingUser && !data?.data && (
        <Flex
          width="full"
          justifyContent="center"
          mt={{ base: '24px', lg: '75px' }}
        >
          <Text
            color="neutral.600"
            size={{ base: 'base', md: 'md' }}
            maxW="219px"
            textAlign="center"
          >
            Retrieve the employee info by searching from the active directory
          </Text>
        </Flex>
      )}
      {!isLoading && !loadingUser && data?.data && (
        <EmployeeDetail data={data?.data} />
      )}
    </VStack>
  );
};

export default EmployeeDetailSummary;
