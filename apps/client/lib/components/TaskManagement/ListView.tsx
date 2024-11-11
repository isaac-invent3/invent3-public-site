import React, { useState } from 'react';
import TaskTable from './TaskTable';
import { useGetAllTasksQuery } from '~/lib/redux/services/task/general.services';
import { Flex } from '@chakra-ui/react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

const ListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
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
        emptyLines={10}
        type="page"
      />
    </Flex>
  );
};

export default ListView;
