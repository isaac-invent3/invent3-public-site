import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllEmployeesQuery,
  useSearchEmployeesMutation,
} from '~/lib/redux/services/employees.services';

interface EmployeeSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  selectName: string;
  selectTitle: string;
  defaultName?: string | null;
  showTitleAfterSelect?: boolean;
}

const EmployeeSelect = (props: EmployeeSelectProps) => {
  const {
    handleSelect,
    selectName,
    selectTitle,
    defaultName,
    showTitleAfterSelect = true,
  } = props;
  const [searchEmployee] = useSearchEmployeesMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllEmployeesQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName={selectName}
      selectTitle={selectTitle}
      data={data}
      labelKey="employeeName"
      valueKey="employeeId"
      defaultInputValue={defaultName}
      mutationFn={searchEmployee}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      showTitleAfterSelect={showTitleAfterSelect}
    />
  );
};

export default EmployeeSelect;
