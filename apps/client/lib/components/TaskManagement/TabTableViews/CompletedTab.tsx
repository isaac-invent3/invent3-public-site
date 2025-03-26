import { useState } from 'react';
import { useGetAllCompletedTaskInstancesQuery } from '~/lib/redux/services/task/instance.services';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import TabTableView from '.';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

interface CompletedTabProps {
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
}

const CompletedTab = (props: CompletedTabProps) => {
  const { search, openFilter, activeFilter } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { updateSearchParam } = useCustomSearchParams();
  const { data, isLoading, isFetching } = useGetAllCompletedTaskInstancesQuery({
    pageSize,
    pageNumber: currentPage,
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
      activeFilter={activeFilter}
      isLoading={isLoading}
      isFetching={isFetching}
      pageSize={pageSize}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      data={data?.data}
      specificSearchCriterion={searchCriterion}
      handleSelectRow={(row) =>
        updateSearchParam(
          SYSTEM_CONTEXT_DETAILS.TASKS.slug,
          row?.taskInstanceId
        )
      }
    />
  );
};

export default CompletedTab;
