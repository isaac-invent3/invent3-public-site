import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllDepartmentsQuery,
  useSearchDepartmentsMutation,
} from '~/lib/redux/services/asset/location.services';

interface DepartmentSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
}

const DepartmentSelect = (props: DepartmentSelectProps) => {
  const { handleSelect } = props;
  const [searchDepartment] = useSearchDepartmentsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllDepartmentsQuery({
    pageSize: 25,
    pageNumber,
  });
  return (
    <GenericAsyncSelect
      selectName="departmentId"
      selectTitle="Department"
      data={data}
      labelKey="departmentName"
      valueKey="departmentId"
      mutationFn={searchDepartment}
      isLoading={isLoading}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
    />
  );
};

export default DepartmentSelect;
