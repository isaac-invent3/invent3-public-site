import React, { useState } from 'react';
import { useGetAllTaskInstancesQuery } from '~/lib/redux/services/task/instance.services';
import { DEFAULT_PAGE_SIZE, OPERATORS } from '~/lib/utils/constants';
import TabTableView from '.';

interface PendingAndInProgressTabProps {
  statusCategoryId: number;
  search: string;
  openFilter: boolean;
}

const PendingAndInProgressTab = (props: PendingAndInProgressTabProps) => {
  const { statusCategoryId, search, openFilter } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTaskInstancesQuery({
    pageSize,
    pageNumber: currentPage,
    statusCategoryId: statusCategoryId,
  });

  const searchCriterion = {
    columnName: 'statusCategoryId',
    columnValue: search,
    operation: OPERATORS.Equals,
  };

  return (
    <TabTableView
      search={search}
      openFilter={openFilter}
      isLoading={isLoading}
      isFetching={isFetching}
      pageSize={pageSize}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      data={data?.data}
      specificSearchCriterion={searchCriterion}
    />
  );
};

export default PendingAndInProgressTab;
