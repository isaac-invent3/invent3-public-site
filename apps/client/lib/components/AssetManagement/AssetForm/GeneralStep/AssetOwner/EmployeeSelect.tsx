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
}

const EmployeeSelect = (props: EmployeeSelectProps) => {
  const { handleSelect, selectName, selectTitle } = props;
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
      mutationFn={searchEmployee}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default EmployeeSelect;
