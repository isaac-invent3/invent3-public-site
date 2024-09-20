import React, { useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { Option, SearchCriterion } from '~/lib/interfaces/general.interfaces';
import {
  useGetAllDepartmentsQuery,
  useGetDepartmentsByFloorIdQuery,
  useSearchDepartmentsMutation,
} from '~/lib/redux/services/asset/location.services';
import { OPERATORS } from '~/lib/utils/constants';

interface DepartmentSelectProps {
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (options: Option) => void;
  type: 'general' | 'specificById';
  floorId?: number;
}

const DepartmentSelect = (props: DepartmentSelectProps) => {
  const { handleSelect, type, floorId } = props;
  const [searchDepartment] = useSearchDepartmentsMutation({});

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllDepartmentsQuery(
    {
      pageSize: 25,
      pageNumber,
    },
    { skip: type === 'specificById' }
  );
  const {
    data: departmentsByFloorIdData,
    isLoading: isLoadingDepartmentsByFloorIdData,
  } = useGetDepartmentsByFloorIdQuery(
    {
      id: floorId,
      pageSize: 25,
      pageNumber,
    },
    { skip: !floorId }
  );

  const departmentByFloorIdCriterion = (
    searchValue: string
  ): SearchCriterion[] => {
    const criterion = [
      {
        columnName: 'floorId',
        columnValue: floorId?.toString() as string,
        operation: OPERATORS.Equals,
      },
      {
        columnName: 'departmentName',
        columnValue: searchValue,
        operation: OPERATORS.Contains,
      },
    ];
    return criterion;
  };

  return (
    <GenericAsyncSelect
      selectName="departmentId"
      selectTitle="Department"
      data={type === 'general' ? data : floorId ? departmentsByFloorIdData : []}
      labelKey="departmentName"
      valueKey="departmentId"
      mutationFn={searchDepartment}
      isLoading={isLoading || isLoadingDepartmentsByFloorIdData}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      handleSelect={handleSelect}
      fetchKey={floorId}
      specialSearch={
        type === 'specificById' ? departmentByFloorIdCriterion : undefined
      }
    />
  );
};

export default DepartmentSelect;
