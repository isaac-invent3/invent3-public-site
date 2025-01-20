import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllTaskPrioritiesQuery,
  useSearchTaskPrioritiesMutation,
} from '~/lib/redux/services/task/priorities.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface TaskPrioritySelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultInputValue?: string | null;
}

const TaskPrioritySelect = (props: TaskPrioritySelectProps) => {
  const { handleSelect, selectName, selectTitle, defaultInputValue } = props;
  const [searchTaskPriority] = useSearchTaskPrioritiesMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllTaskPrioritiesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="priority"
      valueKey="taskPriorityId"
      mutationFn={searchTaskPriority}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      defaultInputValue={defaultInputValue}
    />
  );
};

export default TaskPrioritySelect;
