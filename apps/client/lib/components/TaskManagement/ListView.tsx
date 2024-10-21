import React, { useState } from 'react';
import TaskTable from './TaskTable';
import { useGetAllTasksQuery } from '~/lib/redux/services/task/general.services';
import { Flex } from '@chakra-ui/react';

const ListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllTasksQuery({
    pageSize,
    pageNumber: currentPage,
  });
  return (
    <Flex width="full" mt="24px">
      <TaskTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isSortable={true}
      />
    </Flex>
  );
};

export default ListView;
