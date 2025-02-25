import { useState } from 'react';
import TaskInstanceTable from '~/lib/components/TaskManagement/Tables/TaskInstanceTable';
import { useGetAllCompletedTaskInstancesQuery } from '~/lib/redux/services/task/instance.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const TaskTableView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllCompletedTaskInstancesQuery({
    pageSize,
    pageNumber: currentPage,
  });

  return (
    <TaskInstanceTable
      data={data?.data?.items ?? []}
      totalPages={data?.data?.totalPages}
      isLoading={isLoading}
      isFetching={isFetching}
      setPageNumber={setCurrentPage}
      pageNumber={currentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      isSortable={true}
      emptyLines={25}
      type="page"
      isSelectable
    />
  );
};

export default TaskTableView;
