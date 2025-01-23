import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import TaskInstanceTable from '~/lib/components/TaskManagement/Tables/TaskInstanceTable';
import { useGetAllTaskInstancesQuery } from '~/lib/redux/services/task/instance.services';

const Tasks = () => {
  const { data, isLoading, isFetching } = useGetAllTaskInstancesQuery({
    pageNumber: 1,
    pageSize: 5,
  });

  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <HStack width="full" alignItems="center">
          <CardHeader>Tasks</CardHeader>
          <Text
            color="neutral.800"
            py="6px"
            px="8px"
            rounded="4px"
            bgColor="neutral.200"
          >
            Today
          </Text>
        </HStack>
        <Button
          href={`/${ROUTES.TASKS}`}
          customStyles={{
            py: 0,
            height: '28px',
            width: '68px',
            fontSize: '12px',
            lineHeight: '14.26px',
          }}
        >
          View All
        </Button>
      </HStack>
      <TaskInstanceTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        isSelectable={false}
        emptyLines={4}
        type="page"
        showFooter={false}
      />
    </VStack>
  );
};

export default Tasks;
