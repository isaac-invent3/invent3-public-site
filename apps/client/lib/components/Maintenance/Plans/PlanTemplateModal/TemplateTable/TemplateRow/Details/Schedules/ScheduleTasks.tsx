import { Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import TaskTable from '~/lib/components/TaskManagement/TaskTable';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface ScheduleTasksProps {
  scheduleId: number;
}
const ScheduleTasks = (props: ScheduleTasksProps) => {
  const { scheduleId } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTasksByScheduleIdQuery({
    id: scheduleId,
    pageSize,
    pageNumber,
  });

  return (
    <VStack width="full" spacing="24px" alignItems="flex-start">
      <Text fontWeight={700} color="neutral.600">
        Tasks
      </Text>
      <TaskTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isSortable={false}
        type="page"
        showFooter
        showPopover={false}
        showScheduleId={false}
        emptyLines={3}
        showTableBgColor={false}
      />
    </VStack>
  );
};

export default ScheduleTasks;
